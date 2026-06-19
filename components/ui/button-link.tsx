import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkVariant = "primary" | "secondary" | "ghost" | "inverse";

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: ButtonLinkVariant;
}

const variantClasses: Record<ButtonLinkVariant, string> = {
  primary:
    "bg-brand text-white hover:brightness-90 focus-visible:ring-2 focus-visible:ring-brand/15 focus-visible:ring-offset-2",
  secondary:
    "border border-gray-100 bg-surface text-ink hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-brand/15 focus-visible:ring-offset-2",
  ghost:
    "bg-transparent text-brand hover:bg-brand/5 focus-visible:ring-2 focus-visible:ring-brand/15 focus-visible:ring-offset-2",
  inverse:
    "bg-surface text-ink hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
};

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-medium transition-[filter,background-color] duration-150",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
