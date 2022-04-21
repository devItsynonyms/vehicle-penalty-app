import {  FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, Select, Tooltip, Typography } from '@material-ui/core'
import { Add, CheckBox, Print,  Refresh } from '@material-ui/icons';
import React, { useState } from 'react'
import { useStyles,BootstrapInput } from './style';
import { pageType } from '../../../utils/constants'
import { useNavigate } from 'react-router-dom';
import ColumnSelectionModal from '../columnSelectionModal';
import SearchBar from "material-ui-search-bar";
import SearchIcon from '@material-ui/icons/Search';
import { formatUrlName } from '../../../utils/functions'
import { excelFileType } from '../../../utils/constants'
import ImportExcelData from '../ImportExcelData'
import AllExcelFiles from '../ExcelFilePreviewModal'
import MoreVert from '@material-ui/icons/MoreVert';



export default function MainActionContainer(props) {

    const { 
        data, 
        dataSet, 
        dataSetHeaders,
        sortingValues,
        handleSearching, 
        handleRefreshPage, 
        handleSortByChange,
        handleLimitEntriesChange,
        toggleCheckingAllCheckboxes
    } = props;
    const classes = useStyles();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [columnSelectionOpen, setColumnSelectionOpen] = useState(false);
    const [searchQueryValue, setSearchQueryValue] = useState('')
    const limitEntriesData = ["10", "25", "50", "100"];
    const sortByData = data.sortByOptions;
    const isMenuOpen = Boolean(anchorEl);


    const handleFormOpen = () => {

        //data

        if(data === pageType.vehicle ) {
            navigate('/arac-ekle');
        }else if(data === pageType.users ) {
            navigate('/personel-ekle');
        }else if(data === pageType.penalty ) {
            navigate('/ceza-ekle');
        }else {

            localStorage.setItem("menu_id", data.menu_id)
            navigate('/otomatik/form/'+formatUrlName(data.type.toLowerCase()))
        }
    }

    const handleSearchBarChange = (value)=> {
        setSearchQueryValue(value)
    }

    const handleSearchButtonClick = ()=> {
        handleSearching({query: searchQueryValue})
    }
  

    const handleColumnSelectionOpen = () => {
        setColumnSelectionOpen(true);
    };

    const handleColumnSelectionClose = () => {
        setColumnSelectionOpen(false);
    };

    const getExcelFileType = () => {

        //data

        if(data === pageType.vehicle ) {
            return excelFileType.vehicle
        }else if(data === pageType.penalty ) {
            return excelFileType.penalty
        }else {

            return data.type.toLowerCase()
        }
    }
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    const handleMenuClose = () => {
        setAnchorEl(null)
    }
    
  const menuId = 'more-menus';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      
      <ImportExcelData excelFileType={getExcelFileType()} />
      <AllExcelFiles excelFileType={getExcelFileType()} />
    </Menu>
  );


    return (

        <div className={classes.root}>


            <Grid container spacing={1}>
                <Grid item xs={2} md={1}>
                    
                    <Tooltip title="Yeni ekle" aria-label="add" placement="top">
                            
                        <IconButton 
                            variant="contained" 
                            color="primary"
                            onClick={handleFormOpen}
                        ><Add /> {/*data.type*/}</IconButton>
                    </Tooltip>
                </Grid>
                
                <Grid item xs={2} md={1}>
                     
                    <Tooltip title="Excel Yazdir" aria-label="export" placement="top">
                        <IconButton variant="contained" 
                            color="primary" 
                            onClick={handleColumnSelectionOpen}
                        >
                        <Print />
                        </IconButton>
                    </Tooltip> 
                
                </Grid>
                <Grid item xs={2} md={1}>
                    
                    <Tooltip title="Yenile" aria-label="refresh page" placement="top">   
                        <IconButton variant="contained" 
                            color="primary" 
                            onClick={handleRefreshPage}
                        >
                            <Refresh />
                        </IconButton>
                    </Tooltip>
                  
                </Grid>
                
                <Grid item xs={2} md={1}>
                    
                    <Tooltip title="Tümünü Seç" aria-label="select all rows" placement="top">  
                        <IconButton variant="contained" 
                            color="primary" 
                            onClick={toggleCheckingAllCheckboxes}
                        >
                            <CheckBox />
                        </IconButton>

                    </Tooltip>
                  
                  </Grid>
                <Grid item xs={2} md={1}>
                    
                    <Tooltip title="Upload Excel" aria-label="Import Excel Data" placement="top"> 
                        <IconButton
                            aria-label="show more"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleMenuOpen}
                            variant="contained" 
                            color="primary"
                            >
                            <MoreVert />
                        </IconButton>

                    </Tooltip>
                  
                  </Grid>
                <Grid item xs={12} md={3}>


                        <Grid container>

                            <Grid item xs={9}>
                                <SearchBar
                                    value={searchQueryValue}
                                    onChange={(newValue) => handleSearchBarChange(newValue)}
                                    onRequestSearch={handleSearchButtonClick}
                                    placeholder={"Arama... "}
                                />
                            </Grid>
                            
                            {

                                searchQueryValue !== ''?
                                    <Grid item xs={1}>
    
                                        <IconButton
                                            aria-label="show more"
                                            // aria-controls={mobileMenuId}
                                            aria-haspopup="true"
                                            onClick={handleSearchButtonClick}
                                            className={classes.iconButton}
                                            variant="contained" 
                                            color="primary"
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </Grid>
                                :<></>    
                            }

                        </Grid>

                    
                </Grid>
                <Grid item xs={12} md={2}>
                    <div className={classes.entries}>
                    
                        <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={sortingValues.limitEntries}
                            onChange={handleLimitEntriesChange}
                            input={<BootstrapInput />}
                            >

                                {
                                
                                    limitEntriesData.map((item, index)=><MenuItem key={index} value={item}>{item}</MenuItem>)
                                
                                }
                        </Select>
                        <Typography variant="small">Giriş Gösteriliyor</Typography> 
                    </div> 
                </Grid>
                <Grid item xs={12} md={2}>
                
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Göre Sırala:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sortingValues.sortBy}
                            onChange={handleSortByChange}
                        >


                            {

                                sortByData.map((item, index)=>(
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    
                </Grid>
            </Grid>

            <ColumnSelectionModal 
                open={columnSelectionOpen} 
                handleClose={handleColumnSelectionClose} 
                dataType={data} 
                dataSet={dataSet} 
                dataSetHeaders={dataSetHeaders}
            />
 
                            
            {renderMenu}

        </div>
    );
    
}
