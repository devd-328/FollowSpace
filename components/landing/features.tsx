const features = [
  {
    title: "Capture in plain language",
    description:
      "Type or speak a note — no forms, no fields. Just say what was promised and when.",
    icon: (
      <path
        d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Smart scheduling",
    description:
      "\"Next week\" and \"in 3 days\" become real dates. Reminders land exactly when you need them.",
    icon: (
      <>
        <rect
          x="3"
          y="4"
          width="18"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" />
      </>
    ),
  },
  {
    title: "Nothing slips through",
    description:
      "Pending, overdue, done — one board shows every open commitment across clients, jobs, and deals.",
    icon: (
      <>
        <path
          d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="m22 4-10 10-3-3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Features
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
            A system for commitments, not another to-do list
          </h2>
          <p className="mt-4 text-base text-muted">
            People don&apos;t lose deals at the first conversation. They lose
            them at the missing follow-up.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-lg border border-gray-100 bg-surface p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  {feature.icon}
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
