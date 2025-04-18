2// src/components/auth/AuthLayout.jsx
import React from "react";
import { Bookmark } from "lucide-react";

export const AuthLayout = ({ children, imageSide = "right" }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {imageSide === "left" && <DesignSide />}
      <div className="w-1/2 flex items-center justify-center bg-black">
        <div className="w-4/5 max-w-md">{children}</div>
      </div>
      {imageSide === "right" && <DesignSide />}
    </div>
  );
};

const DesignSide = () => {
  return (
    <div className="w-1/2 bg-gray-900 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
        <div className="w-24 h-24 bg-purple-500 rounded-2xl flex items-center justify-center mb-8">
          <Bookmark size={48} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white text-center mb-4">Bookmark Dashboard</h2>
        <p className="text-gray-300 text-center max-w-xs">
          Organize your online world with our intuitive bookmark management system
        </p>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-purple-600/20 rounded-full blur-2xl" />
      <div className="absolute bottom-32 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-indigo-600/20 rounded-full blur-2xl" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIGZpbGw9IiMxMjEyMTIiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-20" />
    </div>
  );
};


