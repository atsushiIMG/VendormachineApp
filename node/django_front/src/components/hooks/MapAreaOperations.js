import { useEffect, useState } from "react";
import axios from "axios"
import { useLocation, useNavigate } from 'react-router-dom';

export const useFetchMapData = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    
    // django_react/settings.pyにてCORS対策済み
    // ページ内に別URLの画面が生成されていることはいけない→CORS
    // const baseUrl = 'http://localhost:8000/api/vendors'
    const baseUrl = 'http://0.0.0.0:8000/api/vendors'

    useEffect(() => {
        const fetchData = async() => {
            axios.get(baseUrl)
            .then(res => {
                setData(res.data);
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
        loading,
    }
}
