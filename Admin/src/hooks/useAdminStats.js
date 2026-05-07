
import toast from "react-hot-toast";
import API from "../api/axiosInstance";
import useAdminAuthStore from '../store/useAdminAuthStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAdminStats = () => {
    return useQuery({
        queryKey: ["adminStats"], 
        queryFn: async () => {
            const { data } = await API.get('/admin/get-admin-stats');
            return data.data;
        },
    });
};

export const useGetAdmin = () => {
    const token = useAdminAuthStore((state) => state.token); // Use hook for reactivity

    return useQuery({
        queryKey: ['getAdmin'],
        queryFn: async () => {
            const { data } = await API.get(`/admin/admin-detail`); 
            return data.data;
        },
        enabled: !!token, 
    });
};


export const useUpdateAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updatedData) => {
            const { data } = await API.put('/admin/admin-profile-setting', updatedData);
            return data.data;
        },
        onSuccess: (newAdminData) => {
            queryClient.setQueryData(['getAdmin'], newAdminData);
            toast.success("Profile updated successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Update failed");
        }
    });
};