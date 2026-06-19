const audiences = [
  "Freelancers",
  "Job seekers",
  "Sales reps",
  "Founders",
  "Students",
];

export function UseCases() {
  return (
    <section className="border-y border-gray-100 bg-ink py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          Built for anyone juggling open commitments
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/60 md:text-base">
          If you&apos;ve ever thought &ldquo;I should follow up on that&rdquo; —
          and then didn&apos;t — this is for you.
        </p>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {audiences.map((label) => (
            <li
              key={label}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90"
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
