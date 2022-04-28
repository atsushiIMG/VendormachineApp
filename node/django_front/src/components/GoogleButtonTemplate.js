import React from 'react';
import { Avatar, Button} from "@mui/material";
import makeStyles from '@emotion/styled'
// const useStyles = makeStyles((theme) => ({
//     button: {
//         backgroundColor: "#fff",
//         height: theme.spacing(5),
//         '&:hover': {
//             background: "#fff",
//             boxShadow: "0 0 6px #4285f4"
//         },
//     },
//     small: {
//         width: theme.spacing(2),
//         height: theme.spacing(2),
//     },
    
// }));
const GoogleButtonTemplate = (props) => {
    // const classes = useStyles();
    return (
        <Button
            variant="outlined"
            color="default"
            startIcon={<Avatar src={'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'} className={classes.small} />}
            style={{textTransform: 'capitalize'}}
            // className={classes.button}
            onClick={props.onGoogleButoonClick}
        >
        Sign in with Google
      </Button>
    )
}

export default GoogleButtonTemplate;