
import { create } from 'zustand';

// const useAuthStore = create((set) => ({

//     // Initial State: Refresh hone par localStorage se data uthayein
//     user: JSON.parse(localStorage.getItem("user")) || null,
//     token: localStorage.getItem("token") || null,

//     // Action: Login hone par data store mein bharo
//     login: (userData, token) => {
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(userData)); 
//         set({ user: userData, token: token });
//     },

//     // Action: Logout karne par khali karo
//     logout: () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         set({ user: null, token: null });
//     }
// }));

// export default useAuthStore;

const getSafeJSON = (key) => {
    const data = localStorage.getItem(key);
    if (!data || data === "undefined") return null; // "undefined" string ko check karein
    try {
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
};

const useAuthStore = create((set) => ({
    user: getSafeJSON("user"),
    token: localStorage.getItem("token") || null,
    
    login: (user, token) => {
        // Hamesha check karein ki data valid hai ya nahi
        if (user && token) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            set({ user, token });
        }
    },
    
    // Action: Logout karne par khali karo
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ user: null, token: null });
    }
}));

export default useAuthStore;