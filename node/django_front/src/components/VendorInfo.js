import React, { useContext, useEffect } from 'react'
import { useFetchVendorInfo } from './hooks/VendorInfoOperations';
import { Button, Grid, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ItemArea from './ItemArea'
import { useNavigate } from 'react-router-dom';
import { LatLong } from '../App';

const VendorInfo = () => {
    const navigate = useNavigate()
    const {data, loading} = useFetchVendorInfo()
	  const {currentPos, SetCurrentPos, currentZoom, SetCurrentZoom} = useContext(LatLong)
    useEffect(() => {
      // dataが非同期が取得できたタイミングでlatlngを更新する
      SetCurrentPos({
        lat: data.latitude,
        lng: data.longitude
      })
      return 
    }, [data])
    return (
        <div>
            {loading && <div>loading!!!</div>}
            {!loading && 
                <Grid container rowSpacing={2}>
                  {data.Drinkings.map((res) => (
                    <Grid item xs={12} key={res.id}>
                      <ItemArea drinkinfo={res}></ItemArea>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Box pt={3}>
                      <Button variant="outlined" startIcon={<EditIcon />} onClick={() => navigate('/vendors/update/' + data.id)}>編集</Button>
                    </Box>
                  </Grid>
                </Grid>
            }
        </div>
    );
}

export default VendorInfo;