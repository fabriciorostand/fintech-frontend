import { type ReactNode, type FC } from 'react'

interface ButtonProps {
    children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children }) => {
    return (
        <button
            type="button"
            className="bg-white text-black p-3 rounded w-full max-w-md mx-auto block mt-8 hover:cursor-pointer hover:bg-gray-100"
        >
            {children}
        </button>
    )
}

export {
    Button
}