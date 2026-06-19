import type { ExtractedFollowUp, FollowUpPriority } from "@/lib/types/domain";
import { normalizeDateString } from "@/lib/extraction/dates";

const PRIORITIES: FollowUpPriority[] = ["low", "medium", "high"];

export function parseExtractionOutput(raw: unknown): ExtractedFollowUp {
  if (!raw || typeof raw !== "object") {
    throw new Error("Extraction output must be an object");
  }

  const data = raw as Record<string, unknown>;

  const person = String(data.person ?? "").trim();
  const action = String(data.action ?? "").trim();
  const rawDate = String(data.follow_up_date ?? data.due_date ?? "").trim();
  const priority = String(data.priority ?? "medium").toLowerCase() as FollowUpPriority;
  const status = "pending" as const;
  const context =
    data.context != null ? String(data.context).trim() : undefined;

  if (!person || !action || !rawDate) {
    throw new Error("Missing required fields: person, action, and follow_up_date");
  }

  if (!PRIORITIES.includes(priority)) {
    throw new Error(`Invalid priority "${priority}". Use low, medium, or high.`);
  }

  const follow_up_date = normalizeDateString(rawDate);

  return { person, action, follow_up_date, priority, status, context };
}
