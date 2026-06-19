import { Wordmark } from "@/components/layout/wordmark";

export function LandingFooter() {
  return (
    <footer className="border-t border-gray-100 bg-surface py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row md:px-6">
        <Wordmark />
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} FollowSpace. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
