import { useState, useEffect } from 'react'
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
// import 
// import reactLogo from './assets/react.svg'
// import './App.css'
import L from "leaflet"
function App() {
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

  // console.log(L.version)

  // console.log(ipAdress)
  // useEffect(()=>{
  //   fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_9EuNfN5MKmLWFLAw25PFyR3RiFCNA&ipAddress=8.8.8.8")
  //     .then(res=>res.json())
  //     .then(data=>setIpAdress({
  //         ip:data.ip,
  //         isp:data.isp,
  //         location:data.location.city,
  //         region:data.location.region,
  //         postalCode:data.location.postalCode,
  //         timezone:data.location.timezone,
  //         latitude:data.location.lat,
  //         longitude:data.location.lng,
  //     })
  //       )
  // },[])


  // setIpAdress()

  // console.log(ipAdress)

//   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);
// function MyComponent() {
//   const map = useMap()
//   console.log('map center:', map.getCenter())
//   return null
// }

// latitude: 37.38605,
// location: "Mountain View",
// longitude: -122.08385,

useEffect(()=>{

  let map = L.map('map').setView([ipAdress.latitude, ipAdress.longitude], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  let marker = L.marker([ipAdress.latitude, ipAdress.longitude]).addTo(map);
  marker.bindPopup("<b>You are</b><br>HERE").closePopup();
})

// https://leafletjs.com/examples/quick-start/
// https://leafletjs.com/examples.html
  return (
                                 
  <div id="map">

  </div>

  )

}



// lokacja timeZone ISP


export default App

