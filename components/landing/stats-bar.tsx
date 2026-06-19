const stats = [
  { value: "0", label: "Opportunities lost to forgotten follow-ups" },
  { value: "1", label: "Place for every commitment" },
  { value: "24/7", label: "Reminders when you need them" },
];

export function StatsBar() {
  return (
    <section className="border-b border-gray-100 bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 md:px-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center sm:text-left">
            <p className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
