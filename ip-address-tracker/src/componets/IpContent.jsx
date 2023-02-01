export default function IpContent(props) {
    return (
<div className='ip--container flex-column container bgcs-light text-center bgc-light'>
    <div className='flow'>
        <h2 className='letter-spacing upper-case fc-very-grey fs-100 fw-500'>Ip address</h2>
        <p className='fc-very-dark-grey fs-200 fw-700'>{props.ip}</p>
    </div>
    <span className='bgc-very-dark-grey'></span>
    <div className='flow'>
        <h2 className='letter-spacing upper-case fc-very-grey fs-100 fw-500'>Location</h2>
        <p className='fc-very-dark-grey fs-200 fw-700'>{props.location}, {props.region} {props.postalCode}</p>
    </div>
    <span className='bgc-very-dark-grey'></span>
    <div className='flow'>
        <h2 className='letter-spacing upper-case fc-very-grey fs-100 fw-500'>Timezone</h2>
        <p className='fc-very-dark-grey fs-200 fw-700'>UTC {props.timeZone}</p>
    </div>
    <span className='bgc-very-dark-grey'></span>
    <div className='flow'>
        <h2 className='letter-spacing upper-case fc-very-grey fs-100 fw-500'>Isp</h2>
        <p className='fc-very-dark-grey fs-200 fw-700'>{props.isp}</p>
    </div>
    </div>
    )
}