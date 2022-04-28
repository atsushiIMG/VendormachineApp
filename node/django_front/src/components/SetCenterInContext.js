/*
●SetCenterInContext
MapContainerの子コンポーネントとすることで
LatLongContextに現在のCenterを取得して保持することができる
他のコンポーネントからはuseContextを使用して取得できる
https://stackoverflow.com/questions/54738681/how-to-change-the-value-of-a-context-with-usecontext
*/
import { useMapEvents } from 'react-leaflet'
import {useContext, useState} from 'react'
import { LatLong } from '../App';

const SetCenterInContext = () => {
    const {currentPos, SetCurrentPos, currentZoom, SetCurrentZoom} = useContext(LatLong)

    const map = useMapEvents({
        dragend: () => {
            SetCurrentPos(map.getCenter())
        },
        zoomend: () => {
            SetCurrentZoom(map.getZoom())
        }
    })
    return null
}

export default SetCenterInContext