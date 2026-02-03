"use client";

import React, { forwardRef, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  type: string;
  placeholder: string;
  error?: string;
  required?: boolean;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, type,placeholder, required, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        <input
          type={ type }
          ref={ref}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-lg ${
            error ? "border-red-500" : "border-border"
          }`}
          {...props}
        />

        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
