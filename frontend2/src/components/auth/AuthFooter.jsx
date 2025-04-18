// src/components/auth/AuthFooter.jsx
import React from "react";

export const AuthFooter = ({ text, linkText, onClick }) => {
  return (
    <div className="text-center">
      <p className="text-gray-400 text-sm">
        {text}{" "}
        <button
          onClick={onClick}
          className="font-medium text-purple-400 hover:text-purple-300"
        >
          {linkText}
        </button>
      </p>
    </div>
  );
};