import { apiClient } from "./apiClient";

export const useCreateData = <T>(url: string, data: any) => {
    return apiClient<T>(url, "POST", data)
}