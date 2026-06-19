import { cn } from "@/lib/utils/cn";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-md border bg-surface px-3 py-2.5 text-sm text-ink outline-none transition-colors duration-150 placeholder:text-gray-200 focus:border-brand focus:ring-2 focus:ring-brand/15",
        error ? "border-error" : "border-gray-100",
        className,
      )}
      {...props}
    />
  );
}
