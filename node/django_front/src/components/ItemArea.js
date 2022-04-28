import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const ItemArea = (props) => {

    const ItemHot = styled(Paper)(({ theme }) => ({
        backgroundColor: '#ff7f50',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: '#f5f5f5',
      }));
    const ItemCold = styled(Paper)(({ theme }) => ({
        backgroundColor: '#1e90ff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: '#f5f5f5',
    }));
    return (
        <div>
            { props.drinkinfo.temperature_flg == 'L' &&
                <ItemCold>{props.drinkinfo.name}</ItemCold>
            }
            { props.drinkinfo.temperature_flg == 'H' && 
                <ItemHot>{props.drinkinfo.name}</ItemHot>
            }
    </div>
    )
}

export default ItemArea