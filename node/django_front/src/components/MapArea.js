import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { useFetchMapData } from './hooks/MapAreaOperations'
import { useNavigate } from "react-router-dom";
import { Grid, nativeSelectClasses, Box, Button } from '@mui/material';
import {useContext, useState} from 'react'
import MapAreaComponent from './hooks/MapAreaComponent'
import { LatLong } from '../App';
import SetCenterInContext from './SetCenterInContext';
import { SelectUnstyledContext } from '@mui/base';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ItemArea from './ItemArea'
import Loading from './Loading'

const MapArea = () => {

    // OpenStreetMapのスタイル
    const MapContainerStyle = {
        width: '600px',
        height: '300px',
        margin: '10px'
    }

    // APIから自販機の場所を配列で取得し
    // dataに格納
    const {
        data,
        loading
    } = useFetchMapData()

    // Markerをクリックしたときのイベント
    const markerClickEvent = (mpInfo) => {
        //2020413マーカークリック時にCoodinateをContextに保持する
        // で、編集時にその値を取得すれば楽かも
        SetCurrentPos(currentPos)
        SetCurrentZoom(currentZoom)
        navigate('/vendors/' + mpInfo.id)
    }

    // App.jsにて定義されているContextを取得する
    const {currentPos, SetCurrentPos, currentZoom, SetCurrentZoom} = useContext(LatLong)

    const navigate = useNavigate()

    return (
        <div>
            {loading && <Loading/>}
           {!loading && (
               <Grid container>
                    <MapContainer center={currentPos} zoom={currentZoom} style={MapContainerStyle}>
                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    {data.results.map(d => {
                        return (
                            <Marker 
                            position={[d.latitude, d.longitude]} 
                            key={d.id}
                            eventHandlers={{click: () => markerClickEvent(d)}}>
                            {/* eventHandlers={{click: () => navigate('/vendors/' + d.id)}}> */}
                                <Popup>
                                {d.address}
                                </Popup>
                            </Marker>
                        )
                        })}
                        <SetCenterInContext/>
                    </MapContainer>
                    <Grid item xs={12}>
                        <Box pt={3}>
                        <Button variant="outlined" startIcon={<AppRegistrationIcon />} onClick={() => navigate('/vendors/regist/')}>自販機を登録</Button>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

export default MapArea;