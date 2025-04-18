
// src/components/auth/PasswordField.jsx
import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { FormField } from "./FormField";

export const PasswordField = ({
  id = "password",
  label = "Password",
  value,
  onChange,
  placeholder = "••••••••",
  required = true,
  helpText,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <FormField
      id={id}
      label={label}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      icon={Lock}
      helpText={helpText}
      rightElement={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-500 hover:text-gray-300"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  );
};
