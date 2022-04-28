import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from 'react-router-dom';
import { Button, Grid, Box } from '@mui/material';

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <Grid container alignItems='center' justifyContent='center' direction="column">
            <Grid item xs={12}>
                <p>処理に失敗したようです</p>
            </Grid>
            <Grid item xs={12}>
                <p>何回も失敗するようでしたら、<br/>
                お手数ではございますが管理人に<br/>ご一報いただけますと幸いです</p>
            </Grid>
            <Grid item xs={12}>
                <Box pt={3}>
                    <Button variant="outlined" startIcon={<HomeIcon />} onClick={() => navigate('/')}>ホームへ戻る</Button>
                </Box>
            </Grid>
            
        </Grid>
    )
}

export default ErrorPage