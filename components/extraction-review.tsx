import type { ExtractedFollowUp } from "@/lib/types/domain";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

interface ExtractionReviewProps {
  extracted: ExtractedFollowUp;
  source?: "gemini" | "mock";
  saving?: boolean;
  onSave: () => void;
  onEdit: () => void;
  onCancel: () => void;
}

const priorityStyles: Record<ExtractedFollowUp["priority"], string> = {
  high: "bg-error/10 text-error",
  medium: "bg-warning/10 text-warning",
  low: "bg-gray-100 text-muted",
};

export function ExtractionReview({
  extracted,
  source,
  saving = false,
  onSave,
  onEdit,
  onCancel,
}: ExtractionReviewProps) {
  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-ink">Review follow-up</p>
        {source === "mock" && (
          <span className="rounded-sm bg-gray-100 px-2 py-0.5 text-xs text-muted">
            Offline mode
          </span>
        )}
      </div>

      <dl className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Contact</dt>
          <dd className="font-medium text-ink">{extracted.person}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Action</dt>
          <dd className="text-right font-medium text-ink">{extracted.action}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Due</dt>
          <dd className="font-medium text-ink">
            {formatDueDate(extracted.follow_up_date)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted">Priority</dt>
          <dd>
            <span
              className={cn(
                "rounded-sm px-2 py-0.5 text-xs font-medium capitalize",
                priorityStyles[extracted.priority],
              )}
            >
              {extracted.priority}
            </span>
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={onSave} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </Button>
        <Button variant="secondary" onClick={onEdit} disabled={saving}>
          Edit
        </Button>
        <Button variant="ghost" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

function formatDueDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
