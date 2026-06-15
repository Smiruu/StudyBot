import { api } from "./apiClient";

export const getUserFiles = async (page, limit) => {
    const response = await api.get(`/files`,{
        params: {
            page: page,
            limit: limit
        }
    })
    return response.data
}

export const getUserFile = async (id) => {
    const response = await api.get(`/files/${id}`)
    return response.data
}

export const fileUpload = async (files) => {
    const response = await api.post(`/files/upload`,files,{ headers: { 'Content-Type': 'multipart/form-data' } })
    return response.data
}