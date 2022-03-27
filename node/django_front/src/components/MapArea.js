import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useFetchMapData } from './hooks/MapAreaOperations'

const MapArea = () => {
    const MapContainerStyle = {
        width: '600px',
        height: '300px',
        margin: '10px'
    }

    const {
        data,
        loading
    } = useFetchMapData()

    return (
        <div>
            {loading && <div>loading!!!</div>}
           {!loading && (
                <MapContainer center={[35.680, 139.767]} zoom={13} style={MapContainerStyle}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                 {data.results.map(d => {
                     return (
                        <Marker position={[d.latitude, d.longitude]} key={d.id}>
                            <Popup>
                            {d.address}
                            </Popup>
                        </Marker>
                     )
                 })}
                </MapContainer>
            )}
        </div>
    );
}

export default MapArea;