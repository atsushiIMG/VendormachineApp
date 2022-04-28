/*
●MapCenteringAddress
MapContainerの子コンポーネントとして持つ
マップの中央の住所を取得して、親コンポのStateに保持する
*/
import { Marker, useMapEvents } from 'react-leaflet'
import {useContext} from 'react'
import { LatLong } from '../App';

const MapCenteringAddress = (props) => {

    const map = useMapEvents({
        dragend: () => {
            props.addressSetter("ff")
        },
    })
    return (
        null
    )
}

export default MapCenteringAddress