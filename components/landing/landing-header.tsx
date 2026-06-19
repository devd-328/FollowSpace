import Link from "next/link";
import { Wordmark } from "@/components/layout/wordmark";
import { ButtonLink } from "@/components/ui/button-link";

interface LandingHeaderProps {
  isAuthenticated?: boolean;
}

export function LandingHeader({ isAuthenticated = false }: LandingHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Wordmark className="text-white [&_span:last-child]:text-white/90" />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Landing">
          <a
            href="#features"
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            How it works
          </a>
        </nav>
        <div className="flex items-center gap-3">
          {!isAuthenticated && (
            <Link
              href="/auth/login"
              className="hidden text-sm font-medium text-white/80 transition-colors hover:text-white sm:inline"
            >
              Sign in
            </Link>
          )}
          <ButtonLink
            href={isAuthenticated ? "/dashboard" : "/auth/login"}
            variant="inverse"
            className="px-4 py-2.5 text-sm"
          >
            {isAuthenticated ? "Dashboard" : "Get started"}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
