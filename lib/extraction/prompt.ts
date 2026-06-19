/**
 * Extraction prompt template for Gemini.
 * Kept isolated and versionable per PRD modular architecture.
 */
export const EXTRACTION_SYSTEM_PROMPT = `You extract structured follow-up data from free-form text about commitments, calls, emails, and meetings.

Rules:
- person: who the follow-up is with (name or role, e.g. "Client", "Ali", "Recruiter")
- action: concise follow-up task (e.g. "Call about pricing")
- follow_up_date: ISO 8601 date only (YYYY-MM-DD), resolved from relative phrases using today's anchor date
- priority: low | medium | high (job interviews, invoices, proposals = high; casual = low)
- status: always "pending"
- context: optional short note about the situation

Return JSON only. No markdown.`;

export function buildExtractionUserPrompt(input: string, todayIso: string) {
  return `Today's date: ${todayIso}

Input: "${input}"

Extract the follow-up details.`;
}
