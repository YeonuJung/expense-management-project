import { ReactNode } from "react";
import "./Button.scss";

interface ButtonProps {
  children?: ReactNode;
  variant?: "outlined" | "filled" | "text-only";
  color?: "primary" | "success" | "error" | "black" | "grey" | "darkGrey" | "white";
  size?: "large" | "medium" | "small";
  disabled?: boolean;
  onClick?: () => void;
}
function Button(props: ButtonProps) {
  const {
    children,
    variant = "text-only",
    color = "primary",
    size = "medium",
    disabled,
    onClick,
  } = props;
  return (
    <>
      <button
        className={`button__container button__${size} ${
          variant === "outlined"
            ? `outline-${color} text-${color} button__outlined`
            : variant === "filled"
            ? `bg-${color} text-white button__filled`
            : `text-${color} button__text-only`
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        <div className="button__children-container">{children}</div>
      </button>
    </>
  );
}

export default Button;
