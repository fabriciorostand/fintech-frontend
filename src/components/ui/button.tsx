
import { type ButtonHTMLAttributes, type ReactNode, type FC } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button
            className="bg-white text-black p-3 rounded w-full max-w-md mx-auto block mt-8 hover:cursor-pointer hover:bg-gray-100 disabled:opacity-60"
            {...props}
        >
            {children}
        </button>
    )
}

export {
    Button
}