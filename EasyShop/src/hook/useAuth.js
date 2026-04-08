
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import API from '../api/axiosConfig';

// send otp - user + vendor
export const useSendOTP = () => {
    return useMutation({
        mutationFn: async (data) => {

            // data should be { email, role }
            const res = await API.post('/otp/send-otp', data);
            return res.data;
        }
    });
};

// verify otp - user + vendor
export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: async (verifyData) => {

            // verifyData should be { email, otp, role }
            const res = await API.post('/otp/verify-otp', verifyData);
            return res.data
        }
    });
};

// update email verify otp - user + vendor
export const useUpdatedEmailVerifyOtp =()=>{
    return useMutation({
        mutationFn: async(verifyUpdatedData) => {
            const res = await API.post('/otp/updated-email-verify-otp', verifyUpdatedData);
            return res.data;
        }
    });
};

// Signup - user
export const useSignup = () => {
    return useMutation({
        mutationFn: async (userData) => {
            const res = await API.post('/user/user-signup', userData);
            return res.data;
        }
    });
};

// Signup - vendor
export const useVendorSignup = () => {
    return useMutation({
        mutationFn: async (vendorData) => {
            const res = await API.post('/vendor/vendor-signup', vendorData);
            return res.data;
        }
    });
};

// login - user + vendor
export const useLogin = () => {
    return useMutation({
        mutationFn: async ({ email, password, role }) => {

            // Role ke basis par sahi endpoint choose karein
            const endpoint = role === 'vendor' ? '/vendor/vendor-login' : '/user/user-login';

            const res = await API.post(endpoint, { email, password });
            return res.data;
        }
    });
};

// forgot - user + vendor
export const useForgotPassword = () => {
    return useMutation({
        mutationFn: async ({ email, role }) => {

            const endpoint = role === 'vendor' ? '/vendor/vendor-forgot-password' : '/user/user-forgot-password'
            const res = await API.post(endpoint, { email });
            return res.data;
        }
    });
};

// reset - user + vendor
export const useResetPassword = () => {
    return useMutation({
        mutationFn: async ({ id, token, password, confirmPassword, role }) => {

            const endpoint = role === 'vendor'
                ? `/vendor/vendor-reset-password/${id}/${token}`
                : `/user/user-reset-password/${id}/${token}`;

            const res = await API.post(endpoint, { password, confirmPassword });
            return res.data;
        }
    });
};

// get - user
export const useGetUser = (user_id) => {
    return useQuery({
        queryKey: ["user", user_id],
        queryFn: async () => {
            const res = await API.get(`/user/user-get/${user_id}`);
            return res.data;
        },
        enabled: !!user_id, // Jab tak user_id na ho, tab tak fetch na kare
    });
};

// update - user
export const useUpdateUser = () => {
    
    // Cache refresh karne ke liye
    const queryClient = useQueryClient(); 

    return useMutation({
        mutationFn: async (updateData) => {
            const res = await API.put(`/user/user-detail-update`, updateData);
            return res.data
        },
        onSuccess: () => {
            
            // Update ke baad purana data refresh ho jaye
            queryClient.invalidateQueries(["user"]);
        },
    });
};