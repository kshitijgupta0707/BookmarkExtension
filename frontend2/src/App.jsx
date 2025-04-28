import BookmarkDashboard from './components/BookmarkDashboard'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
export default function App() {




  const { authUser, checkAuth} = useAuthStore();

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={authUser ? <BookmarkDashboard /> : <Navigate to="/login" />} 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/dashboard" 
          element={authUser ? <BookmarkDashboard /> : <Navigate to="/login" />} 
        />
      </Routes>
      <Toaster/>
    </Router>
  );
}