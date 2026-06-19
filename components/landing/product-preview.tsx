const rows = [
  {
    contact: "Recruiter",
    context: "Interview follow-up",
    due: "Tomorrow",
    status: "pending" as const,
  },
  {
    contact: "Client A",
    context: "Proposal sent",
    due: "In 2 days",
    status: "pending" as const,
  },
  {
    contact: "Supplier",
    context: "Price inquiry",
    due: "Today",
    status: "overdue" as const,
  },
  {
    contact: "Ali Khan",
    context: "Invoice payment",
    due: "Done",
    status: "done" as const,
  },
];

const statusStyles = {
  pending: "bg-warning/15 text-warning",
  overdue: "bg-error/15 text-error",
  done: "bg-success/15 text-success",
};

const statusLabels = {
  pending: "Pending",
  overdue: "Overdue",
  done: "Done",
};

export function ProductPreview() {
  return (
    <div className="rounded-xl border border-white/10 bg-surface p-1 shadow-lg">
      <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 md:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              Your follow-ups
            </p>
            <p className="mt-0.5 text-lg font-semibold text-ink">3 due this week</p>
          </div>
          <span className="relative flex h-9 w-9 items-center justify-center rounded-md bg-surface shadow-sm">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted"
              aria-hidden
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
              2
            </span>
          </span>
        </div>

        <div className="space-y-2">
          {rows.map((row) => (
            <div
              key={row.contact}
              className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-surface px-3 py-3 shadow-sm"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">
                  {row.contact}
                </p>
                <p className="truncate text-xs text-muted">{row.context}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-xs text-muted">{row.due}</span>
                <span
                  className={`rounded-sm px-2 py-0.5 text-[10px] font-medium ${statusStyles[row.status]}`}
                >
                  {statusLabels[row.status]}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-dashed border-gray-100 bg-surface px-3 py-3">
          <p className="font-mono text-xs text-muted">
            &ldquo;Client said call next week about pricing&rdquo;
          </p>
          <p className="mt-1 text-xs font-medium text-brand">
            → Scheduled for Mon, Jun 23
          </p>
        </div>
      </div>
    </div>
  );
}
