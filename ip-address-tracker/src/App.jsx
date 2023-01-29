import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet'
// import L from "leaflet"

function App() {
  // const mapRef = useRef();

  const [map, setMap] = useState(()=>null)
  const [position, setPosition] = useState({lat:51.505, long:-0.09})
  const [typed, setTyped] = useState({lat:"", long:""})
  // const [position, setPosition] = useState(()=>[51.505, -0.09])
  // const [ipAdress, setIpAdress] = useState(null)
  const [ipAdress, setIpAdress] = useState( ()=> {
    return {
      ip: "8.8.8.8",
      isp: "Google LLC",
      latitude: 37.38605,
      location: "Mountain View",
      longitude: -122.08385,
      postalCode: "94035",
      region: "California",
      timezone: "-08:00",
          }
  }
  )




function onClickk(e) {
  e.preventDefault()
  // setPosition({lat:typed.lat, long:typed.long})
  fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_9EuNfN5MKmLWFLAw25PFyR3RiFCNA&ipAddress=${typed.lat}`)
  // fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_9EuNfN5MKmLWFLAw25PFyR3RiFCNA&ipAddress=8.8.8.8")
  .then(res=>res.json())
  .then(data=>{
    console.log(data)
    setIpAdress({
      ip:data.ip,
      isp:data.isp,
      location:data.location.city,
      region:data.location.region,
      postalCode:data.location.postalCode,
      timezone:data.location.timezone,
      latitude:data.location.lat,
      longitude:data.location.lng,
  })
  // console.log(ipAdress)
  // setPosition({lat:ipAdress.latitude, long:ipAdress.longitude})
  // console.log(position)
}
    )

  
  // setTimeout(()=>{

  //   map.flyTo(position, 14,{
  //     duration: 2
  //   })

  // },1000)
  // console.log(map)



  // map.flyTo(position, 14,{
  //       duration: 2
  //     })
}

// function FlyToTarget() {
//   const map = useMap()
//   position ? map.flyTo([position.lat, position.long], 14,{
//     duration: 3
//   }
//   )
//   : null
// }

function FlyToTarget() {
  const map = useMap()
  ipAdress ? map.flyTo([ipAdress.latitude, ipAdress.longitude], 14,{
    duration: 3
  }
  )
  : null
}

function handleChange(e) {
  setTyped(prevFormData => {
      return {
          ...prevFormData,
          [e.target.name]: e.target.value
      }
  })
}


// useEffect(()=>{

// },[position])

// function LocationMarker(props) {

//   const map = useMapEvents({
//     click() {
//       map.flyTo([props.lat, props.lon], 14,{
//         duration: 2
//       })

//     },

//   })

//   return [props.lat, props.lon] === null ? null : (
//     <Marker position={[props.lat, props.lon]}>
//       <Popup>You are here</Popup>
//     </Marker>
//   )
// }
// function MyComponent() {
//   const map = useMap()
//   console.log('map center:', map.getCenter())
//   return null
// }

// setTimeout(()=>{
//   setPosition([Math.floor(Math.random()*30), Math.floor(Math.random()*30)])

// },5000)

const handleSubmit = (event) => {
  event.preventDefault();
};


// function FlyToButton() {
//   const onClick = () => map.flyTo([position.lat, position.long], 13);
//   console.log(Math.floor(Math.random()*30))
    
//   return <button onClick={onClick}>Add marker on click</button>;
// }
  return (
  <div className="">
      <MapContainer center={[ipAdress.latitude, ipAdress.longitude] || { lat: 50, lng: 30 }}  zoom={13} scrollWheelZoom={true} ref={setMap}>
      {/* <MyComponent /> */}
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[ipAdress.latitude, ipAdress.longitude]}>
      <Popup>
        
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
    {/* <Marker position={[11.505, -1.09]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker> */}
    {/* <LocationMarker 
    lat={position[0]}
    lon={position[1]}/> */}
    
  <FlyToTarget />
  </MapContainer>
  {/* <FlyToButton /> */}
  <form onSubmit={handleSubmit}>
  <input
      type="text"
      placeholder="First Name"
      onChange={handleChange}
      name="lat"
      value={typed.lat}
  />
    <input
      type="text"
      placeholder="First Name"
      onChange={handleChange}
      name="long"
      value={typed.long}
  />
  <button  onClick={onClickk} >Click</button>
  </form>
                    {/* <button onClick={handleOnFlyTo} >Click2</button> */}
  {/* <div id="map">


</div> */}
                  </div>               


  )

  }
export default App

