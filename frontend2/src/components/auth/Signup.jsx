// src/pages/auth/Signup.jsx
import React, { useState } from "react";
import { User, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { AuthLayout } from "./AuthLayout";
// import { FormField } from "./FormField";
// import { PasswordField } from "./PasswordField";
// import { AuthFooter } from "./AuthFooter.jsx";
import { AuthLayout } from "./AuthLayout";
import { FormField } from "./FormField";
import { PasswordField } from "./PasswordField";
import { AuthFooter } from "./AuthFooter";
import { useAuthStore } from "@/store/useAuthStore";
export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
        console.log("Signup with:", { name, email, password });
        // Call your signup API here
        // For example, using the useAuthStore to handle signup
        const { signup } = useAuthStore.getState();
        signup({ name, email, password }, navigate);
        // After successful signup, you can navigate to another page or show a success message
        // For example, you can use the navigate function to redirect the user



        // Navigate to dashboard or verification page on successful signup
        // navigate("/dashboard");
    };

    const navigateToLogin = () => {
        navigate("/login");
    };

    return (
        <AuthLayout imageSide="right">
            <div className="w-full space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-white">Create an account</h1>
                    <p className="text-gray-400">Start organizing your bookmarks today</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <FormField
                        id="name"
                        label="Full Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                        icon={User}
                    />

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
                        helpText="Password must be at least 8 characters long"
                    />

                    <div className="flex items-center">
                        <input
                            id="terms"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500"
                            required
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                            I agree to the{" "}
                            <a href="#" className="text-purple-400 hover:text-purple-300">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-purple-400 hover:text-purple-300">
                                Privacy Policy
                            </a>
                        </label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md"
                    >
                        Create Account
                    </Button>
                </form>

                <AuthFooter
                    text="Already have an account?"
                    linkText="Sign in"
                    onClick={navigateToLogin}
                />
            </div>
        </AuthLayout>
    );
}