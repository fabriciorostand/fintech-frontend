import type { FC, MouseEvent } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

interface TogglePasswordButtonProps {
  isVisible: boolean;
  onToggle: () => void;
  show: boolean;
}

const TogglePasswordButton: FC<TogglePasswordButtonProps> = ({
  isVisible,
  onToggle,
  show,
}) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    onToggle();
  };

  if (!show) return null;
  return (
    <button
      aria-label={isVisible ? "Ocultar senha" : "Mostrar senha"}
      className="-translate-y-1/2 absolute top-1/2 right-2 transform cursor-pointer"
      onClick={handleClick}
      type="button"
    >
      {isVisible ? (
        <LuEyeClosed className="h-5 w-5" />
      ) : (
        <LuEye className="h-5 w-5" />
      )}
    </button>
  );
};

export { TogglePasswordButton };