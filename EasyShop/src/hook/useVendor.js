
import { useQuery } from '@tanstack/react-query';
import API from '../api/axiosConfig.js';
import useAuthStore from '../store/useAuthStore.js';

// list cat for vendor signup
export const useCatList = () =>{
    return useQuery({
        queryKey: ['catList'],
        queryFn: async() => {
            const {data} = await API.get('/category/category-list');
            return data.data;
        },
        staleTime: 0,
    });
};

// vendor profile
export const useGetVendor = () => {
    const token = useAuthStore((state) => state.token); 

    return useQuery({
        queryKey: ['getVendor'],
        queryFn: async () => {
            const { data } = await API.get(`/vendor/vendor-profile`); 
            return data.data;
        },
        enabled: !!token, 
    });
};

//vendor stats
export const useVendorStats = () => {
    return useQuery({
        queryKey: ["vendorStats"],
        queryFn: async () => {
            const { data } = await API.get('/vendor/vendor-dashboard-stats');
            return data.data;
        },
    });
};