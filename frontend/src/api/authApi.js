import axios from "axios";

const API = axios.create({
  baseURL: 'http://localhost:8080/api/auth',
  withCredentials: true,
});

export const refresh = async() => {
  const response = await API.get(`/refresh`)
  return response.data
}
export const register = async (username, email, password) => {
    const response = await API.post(`/register`, { username, email, password })
    return response.data
}

export const verify = async (email, token) => {
    const response = await API.post(`/verify`, { email, token })
    return response.data
}

export const login = async (email, password) => {
    const response = await API.post(`/login`, { email, password })
    return response.data
}

export const logout = async () => {
    await API.post(`/logout`)
}