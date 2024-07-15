import axios from "axios";
import {store} from "core/redux/store";
import {setAuthStatus} from "core/redux/auth/authSlice";

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response) {
            const authHeader = error.response.headers['authorization'];
            if (error.response.status === 403 && authHeader && !originalRequest._retry) {
                originalRequest._retry = true;
                const newAccessToken = authHeader;

                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest);
            } else if (error.response.status === 403) {
                store.dispatch(setAuthStatus(false));
            }
        } else {
            console.log('Error:', error.message);
        }
        setAuthStatus("error");
        return Promise.reject(error);
    }
);

export const clearTokens = () => {
    delete axiosInstance.defaults.headers.common['Authorization'];
    delete axiosInstance.defaults.headers.common['Refresh-Token'];
};
