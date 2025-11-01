import type * as React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

function Input({ className = '', type = 'text', ...props }: InputProps) {
    return (
        <input
            className={`bg-white border border-gray-300 p-2 rounded w-full max-w-md mx-auto block mt-1 ${className}`}
            type={type}
            {...props}
        />
    );
}

export {
    Input
};