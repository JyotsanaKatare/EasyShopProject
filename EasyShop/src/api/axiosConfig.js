
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

const API = axios.create({
    baseURL: 'http://localhost:8000/api/v1', // Aapka backend URL
});

// Request Interceptor: Har request bhejne se pehle ye check karega
API.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expire ho gaya ya invalid hai
            useAuthStore.getState().logout(); // Zustand se logout function call karein
            window.location.href = '/login'; // User ko login par bhej dein
        }
        return Promise.reject(error);
    }
);

export default API;