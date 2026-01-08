import axios from "axios";

export const axiosInstand = axios.create({
    baseURL : "http://127.0.0.1:8001/" , 
    withCredentials: true ,
})


/**
 * creation d'ajouter un etoken automatiquement 
 * 
*/


axiosInstand.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);