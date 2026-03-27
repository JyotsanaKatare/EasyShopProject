
import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem("token") || null,

    // Action: Login hone par data store mein bharo
    login: (userData, token) => {
        localStorage.setItem("token", token);
        set({ user: userData, token: token });
    },

    // Action: Logout karne par khali karo
    logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
    }
}));

export default useAuthStore;