
import API from '../api/axiosConfig.js';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

// withdraw stats
export const useWithdrawStats =() =>{
    return useQuery({
        queryKey: ['withdrawStats'],
        queryFn: async() =>{
            const {data} = await API.get('/withdraw/withdraw-stats');
            return data.data;
        },
        staleTime: 0
    });
};

// withdraw list
export const useWithdrawList =() =>{
    return useQuery({
        queryKey: ['withdrawList'],
        queryFn: async() =>{
            const {data} = await API.get('/withdraw/withdraw-list');
            return data.data;
        },
        staleTime: 0
    });
};

// withdraw req form
export const useCreateWithdrawReq = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['createWithdrawReq'],
        mutationFn: async(formData) =>{
            const {data} = await API.post('/withdraw/create-withdraw-request', formData);
            return data.data;
        },

        onSuccess: (res) =>{
            queryClient.invalidateQueries({queryClient: ['withdrawList']});
        }
    });
};