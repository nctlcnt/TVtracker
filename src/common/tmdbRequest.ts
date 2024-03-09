import axios from 'axios'

// useAxios.js
import React, { useMemo } from 'react'
import GlobalContext from '@/globalContext/GlobalContext.ts'

const useAxios = () => {
    const {
        tokens: { TMDBToken },
    } = React.useContext(GlobalContext)

    // This ensures the interceptor is updated if the token changes
    return useMemo(() => {
        const instance = axios.create({
            // Your Axios configuration here (baseURL, etc.)
        })

        instance.interceptors.request.use(
            (config) => {
                if (TMDBToken) {
                    config.headers.Authorization = `Bearer ${TMDBToken}`
                }
                return config
            },
            (error) => Promise.reject(error)
        )

        return instance
    }, [TMDBToken])
}

export default useAxios
