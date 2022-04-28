import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

export const useFetchVendorInfo = () => {
    const location = useLocation()
    const baseUrl = 'http://localhost:8000/api/vendors/'
    const vendorNo = location.pathname.substring('/vendors/'.length)
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async() => {
            axios.get(baseUrl + vendorNo)
            .then(res => {
                setData(res.data)
                setLoading(false)
            }, (err) => {
                navigate('/error')
                console.error(err)
            })
        }
        fetchData()
    },[])
    return {
        data,
        loading
    }
}