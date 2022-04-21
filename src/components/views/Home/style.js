
import { makeStyles } from '@material-ui/core/styles';



export const useStyles = makeStyles((theme) => ({

    root: {
        width: '97%',
        padding: '10px',
        [theme.breakpoints.down('sm')]: {
            width: '93%',
            margin: '0',
            marginLeft: '3px',
        }
    }

}))