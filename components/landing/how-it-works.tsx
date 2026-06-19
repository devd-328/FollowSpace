const steps = [
  {
    step: "01",
    title: "Drop a note",
    description:
      "Text or voice: \"Sent proposal to Ali, he'll pay next week.\"",
  },
  {
    step: "02",
    title: "We structure it",
    description:
      "Person, action, and due date extracted — you confirm if needed.",
  },
  {
    step: "03",
    title: "Get reminded",
    description:
      "In-app alerts and email digests before anything goes overdue.",
  },
  {
    step: "04",
    title: "Mark it done",
    description:
      "Done, snooze, or reschedule — every opportunity tracked to resolution.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
            From scattered promise to closed loop
          </h2>
        </div>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <li key={item.step} className="relative">
              {index < steps.length - 1 && (
                <div
                  className="absolute left-[calc(50%+2rem)] top-6 hidden h-px w-[calc(100%-4rem)] bg-gray-100 lg:block"
                  aria-hidden
                />
              )}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                  {item.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
