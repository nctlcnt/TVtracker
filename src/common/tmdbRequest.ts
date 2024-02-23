import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosRequestHeaders,
} from 'axios'
import { TMDBBaseUrl } from '@/apis/tmdbAPI.ts'

// read token from cookies
const token =
    document.cookie &&
    document.cookie
        .split(';')
        .filter((item) => item.includes('TMDBToken'))[0]
        .split('=')[1]

// default configurations
const axiosInstance: AxiosInstance = axios.create({
    baseURL: TMDBBaseUrl,
    timeout: 5000,
    // headers: {
    //     'Content-Type': 'application/json',
    // },
})

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (!config.headers) {
            config.headers = {} as AxiosRequestHeaders
        }
        config.headers.Authorization = `Bearer ${token}`
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // handle successful responses
        return response
    },
    (error: AxiosError) => {
        // handle errors
        return Promise.reject(error)
    }
)

// wrapper
export const apiRequest = async <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    try {
        return await axiosInstance.request<T>(config)
    } catch (error) {
        // Handle errors
        throw error
    }
}

const tmdb: any = {}
tmdb.get = async (url: string, config: AxiosRequestConfig) => {
    if (!token) {
        return Promise.reject('No token')
    }
    return apiRequest({ method: 'get', url: url, ...config })
}
// tmdb.post = async (url: string, data: any, config: AxiosRequestConfig) => {
//     return apiRequest({ method: 'post', url: url, data: data, ...config })
// }
// tmdb.put = async (url: string, data: any, config: AxiosRequestConfig) => {
//     return apiRequest({ method: 'put', url: url, data: data, ...config })
// }
// tmdb.delete = async (url: string, config: AxiosRequestConfig) => {
//     return apiRequest({ method: 'delete', url: url, ...config })
// }

export default tmdb
