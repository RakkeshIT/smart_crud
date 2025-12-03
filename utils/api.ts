import axios , {AxiosRequestConfig} from "axios";

export const getBaseUrl = (): string => {
    if (window !== undefined){
        return process.env.BASE_URL || 'http://localhost:5000';
    }

    return process.env.BASE_URL || 'http://localhost:5000';
}

export const api = (config?: AxiosRequestConfig) => {
    return axios.create({
        baseURL: getBaseUrl(),
        ...config
    })
}