import Loader from 'react-loading'
import { Grid } from '@mui/material';

const Loading = () => {
    return (
        <Grid container alignItems='center' justifyContent='center' direction="column">
            <Grid item xs={12}>
                <Loader
                    type="spinningBubbles"
                    color="#00BFFF"
                    height={30}
                    width={30}
                    // timeout={3000} //3 secs 
                />
            </Grid>
        </Grid>
    )
}

export default Loading