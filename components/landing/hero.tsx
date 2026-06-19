import { ButtonLink } from "@/components/ui/button-link";
import { ProductPreview } from "./product-preview";

interface HeroProps {
  isAuthenticated?: boolean;
}

export function Hero({ isAuthenticated = false }: HeroProps) {
  return (
    <section className="landing-grid relative overflow-hidden bg-ink pb-16 pt-12 md:pb-24 md:pt-20">
      <div
        className="pointer-events-none absolute -right-32 top-0 h-[480px] w-[480px] rounded-full bg-brand/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-success/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:gap-16 md:px-6">
        <div className="max-w-xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Never miss a follow-up again
          </p>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[56px]">
            Every commitment,{" "}
            <span className="text-brand">tracked</span> until it&apos;s done.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
            FollowSpace turns scattered promises — &ldquo;he&apos;ll call next
            week,&rdquo; &ldquo;follow up in 3 days&rdquo; — into structured
            reminders. Capture, schedule, and act before opportunities go cold.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              href={isAuthenticated ? "/dashboard" : "/auth/login"}
              className="px-6 py-3.5 text-base"
            >
              {isAuthenticated ? "Open dashboard" : "Start"}
            </ButtonLink>
            <ButtonLink
              href="#how-it-works"
              variant="ghost"
              className="border border-white/20 text-white hover:bg-white/10 hover:text-white"
            >
              See how it works
            </ButtonLink>
          </div>
          <p className="mt-4 text-sm text-white/50">
            No credit card · Free to start · Works on any device
          </p>
        </div>

        <div className="landing-float mx-auto w-full max-w-lg md:max-w-none">
          <ProductPreview />
        </div>
      </div>
    </section>
  );
}
