import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents, ZoomControl } from 'react-leaflet'
// import L from "leaflet"

function App() {
  // const mapRef = useRef();

  const [map, setMap] = useState(()=>null)
  const [position, setPosition] = useState({lat:51.505, long:-0.09})
  const [typed, setTyped] = useState("")
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
      timeZone: "-08:00",
          }
  }
  )
  useEffect(()=>{
    setIpAdress("")

  },[])




function onClickk(e) {
  e.preventDefault()
  // setPosition({lat:typed.lat, long:typed.long})
  fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_9EuNfN5MKmLWFLAw25PFyR3RiFCNA&ipAddress=${typed}`)
  // fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_9EuNfN5MKmLWFLAw25PFyR3RiFCNA&ipAddress=8.8.8.8")
  .then(res=>{
    if (res.ok) {
      setTyped("")
      return res.json()
    }
    else {
      return Promise.reject(res)
    }
    // return res.ok ? res.json() : 
    
  })
  .then(data=>{
    console.log(data)
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
  // console.log(ipAdress)
  // setPosition({lat:ipAdress.latitude, long:ipAdress.longitude})
  // console.log(position)
}
    )
    .catch((res) => {
      console.log(res.status, res.statusText);
      setIpPlaceHolder(res.statusText)
      setTyped("")
      // 3. get error messages, if any
      // response.json().then((json: any) => {
      //   console.log(json);
      // })
    });

  
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
  setIpPlaceHolder("Search for any IP address or domain")
  setTyped(e.target.value)
}
  


const handleSubmit = (event) => {
  event.preventDefault();
};


// function FlyToButton() {
//   const onClick = () => map.flyTo([position.lat, position.long], 13);
//   console.log(Math.floor(Math.random()*30))
    
//   return <button onClick={onClick}>Add marker on click</button>;
// }

// setIpAdress({
//   ip:data.ip,
//   isp:data.isp,
//   location:data.location.city,
//   region:data.location.region,
//   postalCode:data.location.postalCode,
//   timezone:data.location.timezone,
//   latitude:data.location.lat,
//   longitude:data.location.lng,
// })


const iconArrow = L.icon({
  iconUrl: "./images/icon-location.svg",
  iconSize: [46, 56],
  iconAnchor: [23, 56],
  popupAnchor: [0, -57],
})
const [ipPlaceHolder, setIpPlaceHolder] = useState("Search for any IP address or domain")
const { ip, isp, location, region, postalCode, timeZone, latitude, longitude } = ipAdress

  return (
  <div className="">
    <header className='fc-light text-center flex-column'>
      <h1 className='fw-500'>IP Address Tracker</h1>

    <form onSubmit={handleSubmit} className="text-center flex container fs-100">
    <input
        type="text"
        placeholder={ipPlaceHolder}
        onChange={handleChange}
        name="typed"
        value={typed}
    />
    <button className='bgc-dark fc-light flex' onClick={onClickk} ><span className='sr-only'>Search for IP address</span><img src="images/icon-arrow.svg" alt="Search" /></button>
    </form>
    {ipAdress &&
      <div className='ip--container flex-column container bgcs-light text-center bgc-light'>
        <div className='flow'>
          <h2 className='letter-spacing upper-case fc-very-grey fs-100 fw-500'>Ip address</h2>
          <p className='fc-very-dark-grey fs-300 fw-700'>{ip}</p>
        </div>
        <span></span>
        <div className='flow'>
          <h2 className='letter-spacing upper-case fc-very-grey fs-100 fw-500'>Location</h2>
          <p className='fc-very-dark-grey fs-300 fw-700'>{location}, {region} {postalCode}</p>
        </div>
        <span></span>
        <div className='flow'>
          <h2 className='letter-spacing upper-case fc-very-grey fs-100 fw-500'>Timezone</h2>
          <p className='fc-very-dark-grey fs-300 fw-700'>UTC {timeZone}</p>
        </div>
        <span></span>
        <div className='flow'>
          <h2 className='letter-spacing upper-case fc-very-grey fs-100 fw-500'>Isp</h2>
          <p className='fc-very-dark-grey fs-300 fw-700'>{isp}</p>
        </div>
      </div>
    }
    </header>
    
    <main>
      <MapContainer center={[latitude, longitude]}  zoom={10} scrollWheelZoom={true} zoomControl={false} ref={setMap}>
      {/* <MyComponent /> */}
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {/* <ZoomControl position='bottomright' /> */}
{ipAdress && <Marker position={[latitude, longitude]} icon={iconArrow}>
      <Popup>
       <div className='text-center'>
      {location}, {region} {postalCode} <br /> {ip}
        </div> 
      </Popup>
    </Marker>
    }
{/* { ipAdress &&   <Marker position={[latitude, longitude]} icon={BoatIcon}>
      <Popup>
        
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>} */}
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

    </main>
    
  {/* <FlyToButton /> */}
  
                    {/* <button onClick={handleOnFlyTo} >Click2</button> */}
  {/* <div id="map">


</div> */}
                  </div>               


  )

  }
export default App

