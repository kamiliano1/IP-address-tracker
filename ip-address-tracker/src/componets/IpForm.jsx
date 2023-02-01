export default function IpForm(props) {
    const handleSubmit = (event) => {
        event.preventDefault();
      };

    return (
        <form onSubmit={handleSubmit} className="text-center flex container fs-300 fw-400">
            <input
                type="text"
                placeholder={props.ipPlaceHolder}
                onChange={props.handleChange}
                name={props.typedAddress}
                value={props.typedAddress}
            />
            <button className='bgc-dark fc-light flex' 
                onClick={props.updateIpAddress}>
                <span className='sr-only'>Search for IP address</span>
                <img src="images/icon-arrow.svg" alt="Search" />
            </button>
        </form>
    )
}