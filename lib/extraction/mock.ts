import type { ExtractedFollowUp } from "@/lib/types/domain";
import { addDays, resolveDateFromText, toISODate } from "@/lib/extraction/dates";
import { parseExtractionOutput } from "@/lib/extraction/parser";

function normalizeKey(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

type DemoTemplate = Omit<ExtractedFollowUp, "status"> & { context?: string };

function demo(
  anchor: Date,
  entry: Omit<DemoTemplate, "follow_up_date"> & {
    daysFromNow: number;
  },
): DemoTemplate {
  const { daysFromNow, ...rest } = entry;
  return {
    ...rest,
    follow_up_date: addDays(anchor, daysFromNow),
  };
}

function buildDemoMap(anchor: Date): Record<string, DemoTemplate> {
  const entries: Array<[string, DemoTemplate]> = [
    [
      "client said call me next week about pricing",
      demo(anchor, {
        person: "Client",
        action: "Call about pricing",
        daysFromNow: 7,
        priority: "high",
        context: "Pricing discussion",
      }),
    ],
    [
      "sent proposal to ali, he'll pay next week",
      demo(anchor, {
        person: "Ali",
        action: "Follow up on payment",
        daysFromNow: 7,
        priority: "high",
        context: "Proposal sent",
      }),
    ],
    [
      "recruiter said interview feedback in 3 days",
      demo(anchor, {
        person: "Recruiter",
        action: "Check interview feedback",
        daysFromNow: 3,
        priority: "high",
        context: "Post-interview",
      }),
    ],
    [
      "investor will review pitch tomorrow",
      demo(anchor, {
        person: "Investor",
        action: "Follow up on pitch review",
        daysFromNow: 1,
        priority: "high",
        context: "Pitch sent",
      }),
    ],
    [
      "customer said call next week",
      demo(anchor, {
        person: "Customer",
        action: "Schedule call",
        daysFromNow: 7,
        priority: "medium",
      }),
    ],
    [
      "sir said he'll update marks later",
      demo(anchor, {
        person: "Sir",
        action: "Check marks update",
        daysFromNow: 7,
        priority: "low",
        context: "Academic follow-up",
      }),
    ],
    [
      "sent invoice to ali, he'll pay next week",
      demo(anchor, {
        person: "Ali",
        action: "Confirm invoice payment",
        daysFromNow: 7,
        priority: "high",
        context: "Invoice sent",
      }),
    ],
    [
      "freelance client needs follow up in 2 days",
      demo(anchor, {
        person: "Freelance client",
        action: "Follow up on project",
        daysFromNow: 2,
        priority: "medium",
      }),
    ],
    [
      "supplier price inquiry today",
      demo(anchor, {
        person: "Supplier",
        action: "Follow up on price inquiry",
        daysFromNow: 0,
        priority: "medium",
      }),
    ],
    [
      "job interview follow up tomorrow",
      demo(anchor, {
        person: "Recruiter",
        action: "Interview follow-up",
        daysFromNow: 1,
        priority: "high",
      }),
    ],
  ];

  return Object.fromEntries(entries);
}

function inferPerson(text: string): string {
  const lower = text.toLowerCase();

  const roleMap: Array<[RegExp, string]> = [
    [/\bclient\b/, "Client"],
    [/\brecruiter\b/, "Recruiter"],
    [/\binvestor\b/, "Investor"],
    [/\bcustomer\b/, "Customer"],
    [/\bsupplier\b/, "Supplier"],
    [/\bsir\b/, "Sir"],
    [/\bali\b/, "Ali"],
  ];

  for (const [pattern, name] of roleMap) {
    if (pattern.test(lower)) return name;
  }

  const toMatch = text.match(/\bto\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/);
  if (toMatch) return toMatch[1];

  const withMatch = text.match(/\bwith\s+([A-Z][a-z]+)/);
  if (withMatch) return withMatch[1];

  return "Contact";
}

function inferAction(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length <= 80) return trimmed;

  const callMatch = trimmed.match(/call[^.!?]*/i);
  if (callMatch) return callMatch[0].trim();

  const followMatch = trimmed.match(/follow[^.!?]*/i);
  if (followMatch) return followMatch[0].trim();

  return `${trimmed.slice(0, 77)}…`;
}

function inferPriority(text: string): ExtractedFollowUp["priority"] {
  const lower = text.toLowerCase();
  if (
    /\b(interview|invoice|proposal|investor|pricing|payment|urgent)\b/.test(
      lower,
    )
  ) {
    return "high";
  }
  if (/\b(casual|marks|later)\b/.test(lower)) return "low";
  return "medium";
}

function heuristicExtract(text: string, anchor: Date): DemoTemplate {
  return {
    person: inferPerson(text),
    action: inferAction(text),
    follow_up_date: resolveDateFromText(text, anchor),
    priority: inferPriority(text),
    context: text.length > 60 ? text.slice(0, 120) : undefined,
  };
}

/**
 * Mock extraction for Phase 1 — exact demo matches first, then heuristics.
 * Phase 2 swaps this for Claude without changing the API contract.
 */
export function mockExtract(
  text: string,
  anchor: Date = new Date(),
): ExtractedFollowUp {
  const normalized = normalizeKey(text);
  const demoMap = buildDemoMap(anchor);
  const exact = demoMap[normalized];

  const raw = exact ?? heuristicExtract(text, anchor);

  return parseExtractionOutput({
    ...raw,
    status: "pending",
  });
}

export function getTodayAnchor(): string {
  return toISODate(new Date());
}
