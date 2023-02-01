import { useState } from 'react'

import IpMap from './componets/IpMap'
import IpContent from './componets/IpContent'
import IpForm from './componets/IpForm'
function App() {

  const [map, setMap] = useState(()=>null)
  const [ipPlaceHolder, setIpPlaceHolder] = useState("Search for any IP address or domain")
  const [typedAddress, setTypedAddress] = useState("")
  const [ipAdress, setIpAdress] = useState( ()=> {
    return {
      ip: "8.8.8.8",
      isp: "Google LLC",
      latitude: 37.38605,
      location: "Mountain View",
      longitude: -122.08385,
      postalCode: "94035",
      region: "California",
      timeZone: "-08:00",
          }
  }
  )
  const { ip, isp, location, region, postalCode, timeZone, latitude, longitude } = ipAdress

function updateIpAddress(e) {
  e.preventDefault()
  fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_9EuNfN5MKmLWFLAw25PFyR3RiFCNA&ipAddress=${typedAddress}`)
  .then(res=>{
    if (res.ok) {
      setTypedAddress("")
      return res.json()
    }
    else {
      return Promise.reject(res)
    }
  })
  .then(data=>{
    setIpAdress({
      ip:data.ip,
      isp:data.isp,
      location:data.location.city,
      region:data.location.region,
      postalCode:data.location.postalCode,
      timeZone:data.location.timezone,
      latitude:data.location.lat,
      longitude:data.location.lng,
  })
}
    )
    .catch((res) => {
      console.log(res.status, res.statusText);
      setIpPlaceHolder(res.statusText)
      setTypedAddress("")
    });
}


function handleChange(e) {
  setIpPlaceHolder("Search for any IP address or domain")
  setTypedAddress(e.target.value)
}
  
const iconArrow = L.icon({
  iconUrl: "./images/icon-location.svg",
  iconSize: [46, 56],
  iconAnchor: [23, 56],
  popupAnchor: [0, -57],
})

  return (
  <div className="">
    <header className='fc-light text-center flex-column'>
      <h1 className='fw-500 fs-400'>IP Address Tracker</h1>
      <IpForm 
        ipPlaceHolder={ipPlaceHolder}
        handleChange={handleChange}
        typedAddress={typedAddress}
        updateIpAddress={updateIpAddress}
      />
      <IpContent 
        ip={ip}
        location={location}
        region={region}
        postalCode={postalCode}
        timeZone={timeZone}
        isp={isp}
      />
    </header>
    <main>
    <IpMap
      latitude={latitude}
      longitude={longitude}
      refs={setMap}
      region={region}
      postalCode={postalCode}
      ip={ip}
      icon={iconArrow}
      ipAdress={ipAdress}
      ipLatitude={ipAdress.latitude}
      ipLongitude={ipAdress.longitude}
    />
    </main>
  </div>               
  )
}
export default App

