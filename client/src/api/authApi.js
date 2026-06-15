import axios from "axios";

const authApi = axios.create({
  baseURL: 'http://localhost:8080/api/auth',
  withCredentials: true,
});

export const refresh = async() => {
  const response = await authApi.get(`/refresh`)
  return response.data
}
export const register = async (username, email, password) => {
    const response = await authApi.post(`/register`, { username, email, password })
    return response.data
}

export const verify = async (email, token) => {
    const response = await authApi.post(`/verify`, { email, token })
    return response.data
}

export const login = async (email, password) => {
    const response = await authApi.post(`/login`, { email, password })
    return response.data
}

export const logout = async () => {
    await authApi.post(`/logout`)
}