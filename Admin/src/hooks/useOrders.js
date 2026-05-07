
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../api/axiosInstance";
import toast from 'react-hot-toast';

// order list
export const useOrderList = (filters = {}) => {
    return useQuery({
        queryKey: ['orderList', filters], 
        queryFn: async () => {
            const { data } = await API.get('/admin/get-all-orders', {
                params: filters // vendorId, status, page etc. yahan se jayenge
            });
            return data.data;
        },
        staleTime: 30 * 1000, 
    });
};

// toggle order status
export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['updateOrderStatus'],
        mutationFn: async ({ order_id, status }) => {
            const { data } = await API.patch(`/order/order-status-update/${order_id}`, { status });
            return data.data;
        },
        onSuccess: (data) => {
           toast.success(`Order updated to ${data.orderStatus}`);
            
            queryClient.invalidateQueries(['orderList']);
            queryClient.invalidateQueries({ queryKey: ['vendorOrders'] });
            queryClient.invalidateQueries(['orderDetail', data._id]);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to update status");
        }
    });
};