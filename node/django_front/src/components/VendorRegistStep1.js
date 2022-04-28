import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { Grid } from '@mui/material';
import { LatLong } from '../App';
import { useContext, useEffect, useState} from 'react'
import MapCenteringMarker from './MapCenteringMarker'


const VendorRegistStep1 = (props) => {

    const {currentPos, SetCurrentPos, currentZoom, SetCurrentZoom} = useContext(LatLong)
    
    // コンポーネントを終了するタイミングにてinfoSetterが起動する
    useEffect(() => {
        return props.latlongSetter(currentPos)
    },[currentPos])

    const MapContainerStyle = {
        width: '600px',
        height: '300px',
        margin: '10px'
    }

    return (
    <Grid container>
        <MapContainer center={currentPos} zoom={currentZoom} style={MapContainerStyle}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapCenteringMarker />
        </MapContainer>
    </Grid>
    )   
}

export default VendorRegistStep1