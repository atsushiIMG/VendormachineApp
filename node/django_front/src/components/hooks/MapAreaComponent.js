/*
現在の経度緯度を常に取得して、画面戻ってきたときに
保存された値になってくれればと思い、作成したコンポーネント
*/

import { useContext, useState } from "react";
import { useMapEvents} from "react-leaflet";
import { LatLong } from "../../App";

const MapAreaComponent = () => {
    const [currentPos, SetCurrentPos] = useState(LatLong)
    
    const map = useMapEvents({
        dragend: (e) => {
            SetCurrentPos(e.target.getCenter())
        }
      });
    return null;
}

export default MapAreaComponent
