
import { useQuery } from "@tanstack/react-query";
import API from "../api/axiosConfig";

// vendor - customer stats
export const useVendorCustomerStats = () => {
    return useQuery({
        queryKey: ['vendorCustomerStats'],
        queryFn: async () => {
            const { data } = await API.get('/vendor/vendor-customer-stats');
            return data.data;
        },
        staleTime: 0
    });
};

// vendor - customer table
export const useVendorCustomers = () => {
    return useQuery({
        queryKey: ['vendorCustomers'],
        queryFn: async () => {
            const { data } = await API.get('/vendor/vendor-customers');
            return data.data;
        },
        staleTime: 0
    });
};

// vendor - customer detail
export const useVendorCustomerDetail = (id) => {
    return useQuery({
        queryKey: ['customerDetail', id],
        queryFn: async () => {
            const { data } = await API.get(`/vendor/vendor-customer-detail/${id}`);
            return data.data;
        },
        enabled: !!id
    });
};

// ====== USER ======