import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "submitviolet" | "submitblue";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "rounded-lg font-semibold text-sm transition-all duration-300 h-11 min-w-[120px] inline-flex items-center justify-center box-border w-full cursor-pointer";

  const variants = {
    primary:
      "bg-[#ffd700]  border-2 text-gray-600 border-amber-300 hover:-translate-y-1 hover:shadow-lg shadow-amber-400/50",
    outline:
      "bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-50",
    submitviolet: "submit-btn",
    submitblue: "btn-submit",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
