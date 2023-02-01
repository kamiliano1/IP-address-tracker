import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents, ZoomControl } from 'react-leaflet'
import { L } from "leaflet"


export default function IpMap(props) {

  
function FlyToTarget(props) {
  const map = useMap()
  props.ipAdress ? map.flyTo([props.ipLatitude, props.ipLongitude], 14,{
    duration: 3})
  : null
}

    return (
  <MapContainer 
    center={[props.latitude, props.longitude]}  
    zoom={10} 
    scrollWheelZoom={true} 
    zoomControl={false} 
    ref={props.refs}>
    <TileLayer
      attribution='&copy; 
      <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[props.latitude, props.longitude]} icon={props.icon}>
      <Popup>
        <div className='text-center'>
          {props.location}, {props.region} {props.postalCode} <br /> {props.ip}
        </div> 
      </Popup>
    </Marker>
    <FlyToTarget 
      ipAdress={props.ipAdress}
      ipLatitude={props.ipLatitude}
      ipLongitude={props.ipLongitude}
    />
  </MapContainer>
    )
  }