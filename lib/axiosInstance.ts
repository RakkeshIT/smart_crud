import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? process.env.BASE_DEV_URL : process.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const setAuthTokeen = (token: string | null) => {
    if (token) {
        axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
        delete axiosClient.defaults.headers.common["Authorization"]
    }
}


axiosClient.interceptors.response.use(
    (res) => res,
    (error) => {
        const message = error.response?.data?.message || "Something went wrong 'Error from api instance'"
        return Promise.reject(new Error(message))
    }
)


export default axiosClient