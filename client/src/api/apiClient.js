import axios from "axios";
import {useAuth} from "../context/authContext"

export const API = axios.create({
  baseURL: 'http://localhost:8080/api/',
  withCredentials: true,
});



API.interceptors.request.use(
    (config) => {
        const {token} = useAuth();

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

API.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config;

        if(originalRequest.response.status === 401 && !originalRequest.retry){
            originalRequest.retry = true;

            try{
                const refreshTokenResponse = await axios.post('http://localhost:8080/api/auth/refresh', {withCredentials:true})

                let {token} = refreshTokenResponse.data

                if(token){
                    originalRequest.headers.Authorization = `Bearer ${token}`;

                    return API(originalRequest)
                }
            }catch(err){
                if(err.response?.status === 401){
                    window.location.href = '/login'
                }
                return Promise.reject(err);
            }
        }
        return Promise.reject(err);
    }
)