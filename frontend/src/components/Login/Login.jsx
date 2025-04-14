import { useState } from "react";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Form data submitted:", formData); // Debugging line
      const response = await fetch(`http://localhost:5000/api/auth/${isSignup ? "signup" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Response received:", response); // Debugging line
      if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      if (!response.ok) {
        throw new Error(isSignup ? "Signup failed" : "Login failed");
      }
      
      if (!isSignup) {
        const userData = await response.json();
        chrome.storage.sync.set({ token: userData.token, userId: userData.userId, name: userData.name });
        setUser(userData);
        chrome.storage.sync.set({ user: userData });
      }

    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        {isSignup && (
          <input 
            type="text" name="name" value={formData.name} onChange={handleChange} 
            placeholder="Name" required className="w-full p-2 border rounded"
          />
        )}
        <input 
          type="email" name="email" value={formData.email} onChange={handleChange} 
          placeholder="Email" required className="w-full p-2 border rounded"
        />
        <input 
          type="password" name="password" value={formData.password} onChange={handleChange} 
          placeholder="Password" required className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <p className="text-sm mt-2 cursor-pointer" onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Already have an account? Login" : "New user? Sign up"}
      </p>
    </div>
  );
};

export default Login;
