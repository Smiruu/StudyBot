import axios from "axios";
import {useAuth} from "../context/authContext"

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

let authToken = null;

export const injectInterceptorToken = (token) => {
  authToken = token;
};

api.interceptors.request.use(
    (config) => {

        if(authToken){
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)
api.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config;
        console.log("ERROR HIT",originalRequest)

        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;

            try{
                const refreshTokenResponse = await axios.post('http://localhost:8080/api/auth/refresh', {withCredentials:true})

                let {token} = refreshTokenResponse.data

                if(token){
                    injectInterceptorToken(token)
                    originalRequest.headers.Authorization = `Bearer ${token}`;

                    return api(originalRequest)
                }
            }catch(err){
                if(err.response?.status === 401){
                    window.location.href = '/login'
                }
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
)