/*
●MapCenteringMarker
MapContainerの子コンポーネントとして持つ
マップの中央にマーカを更新し続けることができる
*/
import { Marker, useMapEvents } from 'react-leaflet'
import {useContext} from 'react'
import { LatLong } from '../App';

const MapCenteringMarker = () => {
    const {currentPos, SetCurrentPos, currentZoom, SetCurrentZoom} = useContext(LatLong)

    const map = useMapEvents({
        dragend: () => {
            SetCurrentPos(map.getCenter())
        },
    })
    return (
        <div>
            <Marker position={currentPos}/>
        </div>
    )
}

export default MapCenteringMarker