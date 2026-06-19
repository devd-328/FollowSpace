import { ButtonLink } from "@/components/ui/button-link";

interface CtaSectionProps {
  isAuthenticated?: boolean;
}

export function CtaSection({ isAuthenticated = false }: CtaSectionProps) {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-xl bg-brand px-6 py-14 text-center shadow-lg md:px-16 md:py-20">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-ink/10"
            aria-hidden
          />
          <h2 className="relative text-3xl font-bold tracking-tight text-white md:text-4xl">
            Stop losing opportunities to memory
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-base text-white/80">
            Join FollowSpace and turn every conversation into a tracked
            commitment — free to start, ready in minutes.
          </p>
          <div className="relative mt-8">
            <ButtonLink
              href={isAuthenticated ? "/dashboard" : "/auth/login"}
              variant="inverse"
              className="px-8 py-3.5 text-base font-semibold"
            >
              {isAuthenticated ? "Go to dashboard" : "Get started"}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
