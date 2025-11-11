import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => (
  <button
    className="mx-auto mt-8 block w-full max-w-md rounded bg-white p-3 text-black hover:cursor-pointer hover:bg-gray-100 disabled:opacity-60"
    {...props}
  >
    {children}
  </button>
);

export { Button };