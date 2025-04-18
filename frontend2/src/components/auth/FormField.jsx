import React from "react";
import { Input } from "@/components/ui/input";

export const FormField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  icon: Icon,
  rightElement,
  helpText,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
        )}
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${Icon ? "pl-10" : ""} ${
            rightElement ? "pr-10" : ""
          } bg-gray-800 border-gray-700 text-white placeholder:text-gray-500`}
          required={required}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    </div>
  );
};