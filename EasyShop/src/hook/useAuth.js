
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// OTP bhejne ka hook
export const useSendOTP = () => {
    return useMutation({
        mutationFn: async (data) => {
            const res = await axios.post('http://localhost:8000/user/send-otp', data);
            return res.data;
        }
    })
};

// OTP verify ka hook
export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: async (verifyData) => {
            const res = await axios.post('http://localhost:8000/user/verify-otp', verifyData);
            return res.data
        }
    })
};

// Signup karne ka hook
export const useSignup = () => {
    return useMutation({
        mutationFn: async (userData) => {
            const res = await axios.post('http://localhost:8000/user/user-signup', userData);
            return res.data;
        }
    });
};