
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../api/axiosInstance";
import toast from "react-hot-toast";

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

// sub cat toggle status
export const useToggleSubCatStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['toggleSubCat'],
        mutationFn: async (subCatId) => {
            const { data } = await API.patch(`/subCategory/sub-category-toggle-status/${subCatId}`);
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['subCatList'] });
            toast.success(data.message || "Status Updated!")
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to update status");
        }
    });
};

// add sub-cat
export const useAddSubCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['addSubCat'],
        mutationFn: async ({ catId, formData }) => {
            const { data } = await API.post(`/subCategory/sub-category-add/${catId}`, formData);
            return data;
        },
        onSuccess: () => {

            // Category list ko invalidate karein taaki nayi category turant dikhne lage
            queryClient.invalidateQueries({ queryKey: ['subCatList'] });
        }
    });
};

// edit sub-cat
export const useUpdateSubCategory = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['updateSubCat'],
        mutationFn: async ({ subCatId, formData }) => {
            const { data } = await API.put(`/subCategory/sub-category-update/${subCatId}`, formData);
            return data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subCatList'] });
        }
    });
};

// dlt sub-cat
export const useDeleteSubCategory = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['subCatDelete'],
        mutationFn: async ({ subCatId }) => {
            const { data } = await API.delete(`/subCategory/sub-category-delete/${subCatId}`);
            return data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subCatList'] });
        }
    });
};