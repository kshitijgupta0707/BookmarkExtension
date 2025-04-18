    import { create } from "zustand";
    import { axiosInstance } from "../lib/axios.js";
    import toast from "react-hot-toast";

    const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/" : "https://pralaysetu-backend.onrender.com/";
    export const useAuthStore = create((set) => ({
        authUser: null,
        formData: null,
        isSigningUp: false,
        isLoggingIn: false,
        isCheckingAuth: true,
        setFormData: (data) => set({ formData: data }),
        checkAuth: async () => {
            try {
                const res = await axiosInstance.get("/auth/check");
                console.log(res)
                set({ authUser: res.data });
                console.log("connected to the socket")

            } catch (error) {
                console.log(error);
                set({ authUser: null });
            } finally {
                set({ isCheckingAuth: false });
            }
        },

        signup: async (data, navigate) => {
            set({ isSigningUp: true });
            try {
                const res = await axiosInstance.post("/auth/signup", data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success(res.data.message);
                set({ isSigningUp: false });
                setTimeout(() => {
                    // Use React Router's navigate function to redirect and pass state
                    navigate("/login");
                }, 1000); // Adjust delay as needed
            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                set({ isSigningUp: false });

            }
        },
        login: async (data) => {
            set({ isLoggingIn: true });
            try {
                console.log(data);
                const res = await axiosInstance.post("/auth/login", data);
                set({ authUser: res.data.responseUser });

                toast.success("Logged in successfully ");
            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                set({ isLoggingIn: false });
            }
        },
        logout: async () => {
            try {
                await axiosInstance.post("/auth/logout");
                toast.success("Logged out successfully");
                set({ authUser: null });

                //removing it for the user
            } catch (error) {
                toast.error(error.response.data.message);
            }
        },
    }));
