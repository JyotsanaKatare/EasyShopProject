
import { useMutation } from '@tanstack/react-query';
import API from '../api/axiosInstance';

// login admin
export const useAdminLogin = () => {
    return useMutation({
        mutationKey: ['adminLogin'], // Debugging ke liye help karta hai
        mutationFn: async (adminData) => {
            const res = await API.post('/admin/admin-login', adminData);
            return res.data;
        }
    });
};

// logout admin
export const useAdminLogout = () => {
    return useMutation({
        mutationKey: ['adminLogout'],
        mutationFn: async () => {
            const res = await API.post('/admin/admin-logout');
            return res.data;
        }
    });
};