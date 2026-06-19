import type { FollowUpWithContact } from "@/lib/modules/followups";

interface FollowUpListProps {
  followUps: FollowUpWithContact[];
}

export function FollowUpList({ followUps }: FollowUpListProps) {
  if (followUps.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-100 px-4 py-12 text-center">
        <p className="text-sm font-medium text-ink">No follow-ups yet</p>
        <p className="mt-1 text-sm text-muted">
          Add your first commitment using the form on the left.
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100">
      {followUps.map((followUp) => (
        <li
          key={followUp.id}
          className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-sm font-medium text-ink">{followUp.contact_name}</p>
            <p className="text-sm text-ink">{followUp.action}</p>
            <p className="text-sm text-muted">
              {followUp.context ?? followUp.contact_company ?? "—"}
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted">
            <span>{formatDueDate(followUp.due_date)}</span>
            <StatusBadge status={followUp.status} />
            <PriorityBadge priority={followUp.priority} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function StatusBadge({ status }: { status: FollowUpWithContact["status"] }) {
  const styles: Record<FollowUpWithContact["status"], string> = {
    pending: "bg-warning/10 text-warning",
    overdue: "bg-error/10 text-error",
    done: "bg-success/10 text-success",
    snoozed: "bg-muted/10 text-muted",
  };

  return (
    <span
      className={`rounded-sm px-2 py-0.5 text-xs font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: FollowUpWithContact["priority"];
}) {
  const styles: Record<FollowUpWithContact["priority"], string> = {
    high: "bg-error/10 text-error",
    medium: "bg-warning/10 text-warning",
    low: "bg-gray-100 text-muted",
  };

  return (
    <span
      className={`rounded-sm px-2 py-0.5 text-xs font-medium capitalize ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

function formatDueDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}
