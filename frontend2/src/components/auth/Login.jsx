// src/pages/auth/Login.jsx
import React, { useState } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { AuthLayout } from "./AuthLayout";
// import { FormField } from "./FormField"
// import { PasswordField } from "./PasswordField";
// import { AuthFooter } from "./AuthFooter";
import { AuthLayout } from "./AuthLayout";
import { FormField } from "./FormField";
import { PasswordField } from "./PasswordField";
import { AuthFooter } from "./AuthFooter";
import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
export default function Login() {
    const{authUser , login , isLoggingIn} = useAuthStore()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const validateForm = () => {
        if (!email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Invalid email format");
        if (!password) return toast.error("Password is required");
        return true;
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        const success = validateForm();
        if (!success) return;
        login({email , password})
      };

    useEffect(() => {
        if (authUser ) {
             navigate('/dashboard');
        }
      }, [authUser, navigate]);





    const navigateToSignup = () => {
        navigate("/signup");
    };

    return (
        <AuthLayout imageSide="right">
            <div className="w-full space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-white">Welcome back</h1>
                    <p className="text-gray-400">Sign in to access your bookmarks</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <FormField
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        icon={Mail}
                    />

                    <PasswordField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                                Remember me
                            </label>
                        </div>
                        <a href="#" className="text-sm font-medium text-purple-400 hover:text-purple-300">
                            Forgot password?
                        </a>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md"
                    >
                        Sign In
                    </Button>
                </form>

                <AuthFooter
                    text="Don't have an account?"
                    linkText="Sign up"
                    onClick={navigateToSignup}
                />
            </div>
        </AuthLayout>
    );
}