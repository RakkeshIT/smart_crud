import axiosClient from "./axiosInstance";

type Method = "GET" | "POST" | "DELETE" | "UPDATE";

export const apiClient = async<T>(url: string, method: Method = "GET", data?: any): Promise<T> => {
    const res = await axiosClient({
        url,
        method,
        data,
        withCredentials: true
    })

    return res.data
}