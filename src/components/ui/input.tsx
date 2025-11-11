import type * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

function Input({ className = "", type = "text", ...props }: InputProps) {
  return (
    <input
      className={`mx-auto mt-1 block w-full max-w-md rounded border border-gray-300 bg-white p-2 ${className}`}
      type={type}
      {...props}
    />
  );
}

export { Input };