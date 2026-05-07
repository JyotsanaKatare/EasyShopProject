
import toast from 'react-hot-toast';
import API from "../api/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// all transactions
export const useTransactionList = () =>{
    return useQuery({
       queryKey: ['allTransactions'],
       queryFn: async() =>{
        const {data} = await API.get('/admin/get-all-transactions');
        return data.data
       }
    });
};

// toggle transaction status
export const useToggleTransactionStatus =() =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey:['toggleTransaction'],
        mutationFn: async({transaction_id, status}) =>{
            const {data} = await API.patch(`/admin/toggle-transaction-status/${transaction_id}`, {status});
            return data.data;
        },
        onSuccess: (data) => {
           toast.success(`Transaction updated to ${data.status}`);
            queryClient.invalidateQueries({ queryKey: ['allTransactions'] });
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to update status");
        }
    });
};