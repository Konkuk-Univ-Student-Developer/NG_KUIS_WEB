import React from "react";

interface ButtonProps {
  text: React.ReactNode;
  onClick?: () => void;
  size?: "extrasmall" | "small" | "medium" | "big";
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  isIconOnlyOnMobile?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  size = "medium",
  variant = "primary",
  icon,
  isIconOnlyOnMobile = false,
  className = "",
}) => {

  const sizeStyles = {
    extrasmall: "px-5 py-2 text-sm gap-x-1.5",
    small: "px-8.5 py-2.5 text-md gap-x-2",
    medium: "px-12 py-3 text-lg gap-x-2.5",
    big: "px-20 py-3 text-lg gap-x-3",
  };

  const variantStyles = {
    primary: "bg-darkgreen text-white hover:bg-opacity-80",
    secondary:
      "bg-beige text-black hover:bg-opacity-80",
  };

  const baseStyles =
    "inline-flex items-center font-bold justify-center rounded-lg transition-all";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon}
      <span
        className={
          isIconOnlyOnMobile && icon ? "hidden md:inline" : ""
        }
      >
        {text}
      </span>
    </button>
  );
};

export default Button;
