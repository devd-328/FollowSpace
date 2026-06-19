import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white hover:brightness-90 focus-visible:ring-2 focus-visible:ring-brand/15 focus-visible:ring-offset-2",
  secondary:
    "border border-gray-100 bg-transparent text-ink hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-brand/15 focus-visible:ring-offset-2",
  ghost:
    "bg-transparent text-brand hover:bg-brand/5 focus-visible:ring-2 focus-visible:ring-brand/15 focus-visible:ring-offset-2",
  destructive:
    "bg-error text-white hover:brightness-90 focus-visible:ring-2 focus-visible:ring-error/15 focus-visible:ring-offset-2",
};

export function Button({
  variant = "primary",
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-medium transition-[filter,background-color] duration-150 disabled:opacity-40",
        variantClasses[variant],
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
