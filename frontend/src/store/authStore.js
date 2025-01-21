import { create } from "zustand";
import axios from "axios";


const API_URL = "http://localhost:5000/api/auth";
axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({

    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async (email, password,name) => {
        set({ isLoading: true });
        try {
           const response = await axios.post(`${API_URL}/signup`, { email, password,name });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({error:error.response.data.message|| "An error occurred" , isLoading: false });
            throw error;
        }
    },
    login:async (email,password)=>{
        set({ isLoading: true,error:null });
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password,});
             set({ user: response.data.user, isAuthenticated: true, isLoading: false,error:null });
         } catch (error) {
             set({error:error.response.data.message|| "An error occurred" , isLoading: false });
             throw error;
         }
        
    },
    verifyEmail:async (code) =>{
        set({ isLoading: true, error:null });
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response.data
        }catch(error){
            set({error:error.response.data.message || "An error occurred", isLoading: false });
            throw error;
        }
    },
    checkAuth:async ()=>{
        await new Promise((resolve)=>setTimeout(resolve),2000);
        set({isCheckingAuth:true, error:null});
        try {
           const response = await axios.get(`${API_URL}/check-auth`);
           set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });

        } catch (error) {
            set({ error:null, isCheckingAuth: false,isAuthenticated:false });
            throw error
        }
    }
}));