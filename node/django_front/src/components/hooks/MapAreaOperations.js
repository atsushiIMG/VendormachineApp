import { useEffect, useState } from "react";
import axios from "axios"

export const useFetchMapData = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    // django_react/settings.pyにてCORS対策済み
    // ページ内に別URLの画面が生成されていることはいけない→CORS
    const baseUrl = 'http://localhost:8000/api/vendors'

    useEffect(() => {
        const fetchData = async() => {
            try {
                const { data: response } = await axios.get(baseUrl);
                setData(response);
                setLoading(false)
            } catch (error) {
                console.error(error)
            }
            // axios.get(baseUrl)
            // .then(res => {
            //     console.dir(res)
            // }

            // )
            //     setLoading(false);
        }
        fetchData()
    },[])

    return {
        data,
        loading,
    }
}
