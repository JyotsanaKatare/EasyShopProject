
import API from '../api/axiosConfig.js';
import { useQuery } from '@tanstack/react-query';

// sub cat list
export const useSubCatList = () => {
    return useQuery({
        queryKey: ['subCatList'],
        queryFn: async () => {
            const { data } = await API.get('/subCategory/sub-category-list');
            return data.data;
        },
        staleTime: 5 * 60 * 1000,
    });
};

// list sub cat by cat
export const useSubCatByCategory = (cat_id) => {
    return useQuery({
        queryKey: ['subCatByCatList', cat_id],
        queryFn: async () => {
            if (!cat_id) return [];
            const { data } = await API.get(`/subCategory/sub-category-list-by-category/${cat_id}`);
            return data.data;
        },
        enabled: !!cat_id,
        staleTime: 5 * 60 * 1000,
    });
};