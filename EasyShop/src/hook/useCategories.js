
import API from '../api/axiosConfig.js';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast';

// list cat
export const useCatList = () => {
    return useQuery({
        queryKey: ['catList'],
        queryFn: async () => {
            const { data } = await API.get('/category/category-list');
            return data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minute tak data "fresh" rahega
    });
};