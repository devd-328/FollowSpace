import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface WordmarkProps {
  className?: string;
  href?: string;
}

export function Wordmark({ className, href = "/" }: WordmarkProps) {
  return (
    <Link
      href={href}
      className={cn("text-lg font-semibold tracking-tight", className)}
    >
      <span className="text-brand">Follow</span>
      <span className="text-ink">Space</span>
    </Link>
  );
}
