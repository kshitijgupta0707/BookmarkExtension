import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
// Safe storage helper to handle both Chrome extension and regular browser environments
const safeStorage = {
  get: (key, callback) => {
    // Check if Chrome extension API is available
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.get(key, callback);
    } else {
      // Fallback to localStorage for browser environment
      try {
        const value = localStorage.getItem(key);
        callback({ [key]: value ? JSON.parse(value) : null });
      } catch (e) {
        callback({ [key]: null });
      }
    }
  },
  set: (data) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.set(data);
    } else {
      // Fallback to localStorage
      Object.entries(data).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value));
      });
    }
  },
  remove: (keys) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.remove(keys);
    } else {
      // Fallback to localStorage
      keys.forEach(key => localStorage.removeItem(key));
    }
  }
};

export const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // For demo purposes, simulate login if no backend is available
      // if (process.env.NODE_ENV === 'development' || !window.location.hostname.includes('localhost')) {
      //   setTimeout(() => {
      //     const mockUser = {
      //       token: "mock-token-12345",
      //       userId: "user123",
      //       name: formData.name || "Demo User",
      //       email: formData.email
      //     };
      //     setUser(mockUser);
      //     safeStorage.set({ token: mockUser.token, userId: mockUser.userId, name: mockUser.name, user: mockUser });
      //     setIsLoading(false);
      //   }, 800);
      //   return;
      // }
      console.log(e)
      const response = await fetch(`http://localhost:4000/api/auth/${isSignup ? "signup" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      if (!response.ok) {
        throw new Error(isSignup ? "Signup failed" : "Login failed");
      }

      if (!isSignup) {
        const userData = await response.json();
        safeStorage.set({ token: userData.token, userId: userData.userId, name: userData.name, user: userData });
        setUser(userData);
      } else {
        setIsSignup(false);
        setFormData({ ...formData, password: "" });
        setError("Account created! Please log in.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-lg bg-card border border-border w-[300px]">
      <h2 className="text-xl font-semibold mb-6 text-center">{isSignup ? "Create Account" : "Welcome Back"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full p-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        )}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
            className="w-full p-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full p-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-70"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
              {isSignup ? "Creating Account..." : "Logging in..."}
            </span>
          ) : (
            isSignup ? "Create Account" : "Log In"
          )}
        </button>
      </form>

      {error && (
        <Alert variant={error.includes("created") ? "default" : "destructive"} className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <p className="text-sm text-center mt-4">
        {isSignup ? "Already have an account? " : "Need an account? "}
        <button
          type="button"
          onClick={() => setIsSignup(!isSignup)}
          className="text-primary hover:underline focus:outline-none"
        >
          {isSignup ? "Log In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};
