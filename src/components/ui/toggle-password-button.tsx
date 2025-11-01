import { type FC, type MouseEvent } from 'react';
import { LuEye, LuEyeClosed } from "react-icons/lu";

interface TogglePasswordButtonProps {
    isVisible: boolean;
    onToggle: () => void;
    show: boolean;
}

const TogglePasswordButton: FC<TogglePasswordButtonProps> = ({ isVisible, onToggle, show }) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        onToggle();
    };

    if (!show) return null;
    return (
        <button
            type="button"
            onClick={handleClick}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            aria-label={isVisible ? "Ocultar senha" : "Mostrar senha"}
        >
            {isVisible ? (
                <LuEyeClosed className="w-5 h-5" />
            ) : (
                <LuEye className="w-5 h-5" />
            )}
        </button>
    );
}

export {
    TogglePasswordButton
}