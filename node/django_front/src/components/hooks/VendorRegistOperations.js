import axios from "axios"

export const RegistVendorInfo = (latlong, drinks, navigate) => {

    const baseUrl = 'http://localhost:8000/api/vendors'
    // const navigate = useNavigate()

    axios.post(baseUrl, 
        {
            Drinkings: drinks,
            address: "blank",
            longitude: latlong.lng, 
            latitude: latlong.lat
        }, {
            headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }}
    )
    .then(res => {

    }, (err) => {
        navigate('/error')
        console.error(err)
    })
}

export const UpdateVendorInfo = (latlong, drinks, navigate) => {

    let vendorNo = window.location.pathname.split('/')

    const baseUrl = 'http://localhost:8000/api/vendors/' + vendorNo[3]
    // const navigate = useNavigate()

    axios.put(baseUrl, 
        {
            Drinkings: drinks,
            address: "blank",
            longitude: latlong.lng, 
            latitude: latlong.lat
        }, {
            headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }}
    )
    .then(res => {

    }, (err) => {
        navigate('/error')
        console.error(err)
    })
}