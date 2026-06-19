import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({
  className,
  interactive = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-100 bg-surface p-4 shadow-sm md:p-6",
        interactive && "transition-shadow duration-150 hover:shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
