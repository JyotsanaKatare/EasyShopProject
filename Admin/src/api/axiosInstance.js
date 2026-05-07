
import axios from 'axios';
import useAdminAuthStore from '../store/useAdminAuthStore';

const API = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
});

// Request Interceptor: manuall header likhne ki need nhi
API.interceptors.request.use((config) => {
    const token = useAdminAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// if token expire automatic go to login page
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {

            useAdminAuthStore.getState().logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default API;