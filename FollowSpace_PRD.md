# Product Requirements Document: FollowSpace

**Status:** Concept / Hackathon MVP (3-day build)
**Author:** Dev
**Last updated:** June 19, 2026

---

## 1. Overview

**One-liner:** FollowSpace turns scattered, half-remembered commitments — "he said he'll call next week," "sent the proposal, follow up in 3 days" — into structured, tracked follow-ups with automatic reminders, so nothing falls through the cracks.

**Core insight:** People don't lose jobs, sales, or deals at the first conversation. They lose them at the missing follow-up — because there's no system, follow-ups are scattered across chats/calls/emails, and memory isn't reliable.

**Target users (initial):** Freelancers, job seekers, small business owners/sales reps, founders, students — anyone juggling multiple pending commitments without a dedicated tool.

---

## 2. Problem Statement

| User | Example commitment | What goes wrong |
|---|---|---|
| Job seeker | "I'll hear back in a week" | Forgets to follow up, loses the lead |
| Freelancer | "Client said they'll respond soon" | No reminder, opportunity goes cold |
| Founder | "Investor said they'll review the pitch" | No structured tracking across investors |
| Sales rep | "Customer said call next week" | Buried in chat history, missed |
| Student | "Sir said he'll update marks later" | Forgotten entirely |

These aren't memory failures — they're **system failures**. There is no single place where commitments are captured, scheduled, and surfaced at the right time.

---

## 3. Goals & Non-Goals

**Goals (3-day MVP):**
- Let users capture a commitment in plain language (typed or spoken) with zero manual structuring
- Automatically extract person, action, due date, and priority using AI
- Track every follow-up's status (Pending / Overdue / Done / Snoozed)
- Notify users in-app and via email when something is due
- Prevent duplicate/contact confusion when names repeat without surnames

**Non-goals (explicitly out of scope for v1):**
- SMS / WhatsApp notifications (budget and approval-time constraints)
- Multi-user/team accounts
- Native mobile app
- CRM-level contact management (deal stages, pipelines, etc.)
- Fuzzy-matching ML on contacts (confidence-scored auto-merge) — deferred to v2

---

## 4. Tech Stack

Chosen for speed, security, and a clean modular structure that doesn't require re-architecting if the product continues post-hackathon.

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js (App Router) + React + Tailwind | Fast to build, server components reduce client JS, deploys natively to Vercel |
| Backend | Next.js API routes / Route Handlers (modular service layer) | No separate backend needed — keeps it to one deployable unit, still organized in modules (see §9) |
| Database & Auth | Supabase (Postgres + Supabase Auth) | Free tier, built-in auth, row-level security for per-user data isolation, generous free tier for a hackathon |
| AI extraction | Claude API (Sonnet) | Strong structured-extraction performance, affordable at hackathon volume (~$8–12 total estimated) |
| Voice input | Web Speech API (browser native) | Zero cost, zero extra infra, works in Chrome-based browsers out of the box |
| Email notifications | Resend | Free tier (3,000 emails/month), simple API, clean templates |
| Scheduling/reminders | Vercel Cron (or Supabase scheduled functions) | Free on Vercel Hobby tier, no separate worker needed |
| Hosting | Vercel | Free tier, zero-config Next.js deploys |
| Domain (optional) | Namecheap .xyz/.site | $1–2, optional polish for demo |

**Security notes:**
- Supabase Row-Level Security (RLS) enforced on every table — a user can only read/write their own rows.
- Claude API key and Resend API key stored as server-side environment variables only, never exposed to the client.
- All AI extraction and notification logic runs server-side (API routes), not in the browser.

---

## 5. Modular Architecture

Code is organized into independent modules with clear boundaries, so each can be built, tested, and demoed in isolation:

```
/app
  /api
    /extract        → AI extraction module (text/voice input → structured follow-up)
    /contacts        → contact resolution & disambiguation module
    /followups       → CRUD for follow-up records, status updates
    /notifications   → in-app + email dispatch module
    /cron            → scheduled job: scan due/overdue follow-ups, trigger notifications
  /dashboard         → UI: follow-up list, status board
  /components
    InputCapture.tsx → text + voice input, shared by all entry points
    ContactPicker.tsx→ disambiguation UI
    FollowUpCard.tsx → individual follow-up display + actions (Done/Snooze/Reschedule)
    NotificationBell.tsx
/lib
  supabaseClient.ts
  claudeClient.ts
  resendClient.ts
  extraction/
    prompt.ts        → extraction prompt template (isolated, versionable)
    parser.ts         → validates/cleans AI JSON output before DB write
```

**Why this matters:** each module has one job and one interface. The extraction module never talks to the database directly — it returns clean structured data, and the followups module owns persistence. This keeps the system debuggable under time pressure and easy to extend later (e.g., swapping Resend for SMS later doesn't touch extraction or contacts at all).

---

## 6. Core Features

### 6.1 Input Capture (text + voice)
- Single input box accepts free-form text.
- Mic icon triggers Web Speech API; transcript fills the same input box.
- Same downstream pipeline for both — voice is just an alternate way to fill text, not a separate feature.

### 6.2 AI Extraction Engine
Input: free-form sentence (typed or transcribed).
Output: structured JSON.

Example:
```
Input: "Client said call me next week about pricing"
Output:
{
  "person": "Client",
  "action": "Call about pricing",
  "follow_up_date": "<resolved ISO date>",
  "priority": "high",
  "status": "pending"
}
```
- Priority inferred by context (e.g., job interview → high, casual chat → low).
- Relative dates ("next week," "tomorrow") resolved to absolute dates server-side at extraction time.

### 6.3 Contact Disambiguation (key design decision)
**Problem:** Users will say "Ali" repeatedly without surnames. The system must not silently create duplicate contacts or silently guess wrong.

**Approach for v1 — confirmation flow:**
1. After extraction, the system checks the name against the user's existing contacts.
2. If there's exactly one match and no ambiguity → auto-link, no interruption.
3. If there are multiple possible matches (or the name is new) → show an inline picker before saving:

```
Found "Ali" in your contacts:
 → Ali Khan (Arbisoft) — last contact 3 days ago
 → Ali Raza (Freelance client)
 → + New contact "Ali"
```

4. User taps one option; the follow-up is saved against the correct contact.

**Why this approach over the alternatives:**
- *Auto-create + merge later* → fast but creates dashboard clutter and trust issues if the AI guesses wrong.
- *Fuzzy-match with confidence scoring* → the "correct" long-term answer, but too much engineering time for a 3-day build.
- *Confirmation flow* (chosen) → ~4–6 hours of work, eliminates duplicates entirely, and doubles as a demo moment showing the AI is "aware" of history rather than blindly parsing text.

Deferred to v2: confidence-scored fuzzy auto-matching once there's enough usage data to tune it.

### 6.4 Dashboard
Simple board view:

| Contact | Context | Next Follow-up | Status |
|---|---|---|---|
| Client A | Proposal sent | In 2 days | Pending |
| Recruiter | Interview done | Tomorrow | Pending |
| Supplier | Price inquiry | Today | Overdue |

Each row expands to a `FollowUpCard` with actions: **Done / Snooze / Reschedule**.

### 6.5 Notifications
- **In-app bell:** unread count, dropdown list of due/overdue items. Always-on, no setup, central to the demo.
- **Email (Resend):** triggered by a daily cron scan — "You have 3 follow-ups today. One is overdue." Works even when the user isn't in the app.
- **Not built in v1:** SMS and WhatsApp (cost and approval-time constraints) — listed in the pitch as "coming soon."

### 6.6 Smart Intelligence Layer
- **Auto follow-up suggestion:** if a logged interaction has no date attached ("Sent proposal to Company X"), the system prompts: "No follow-up set. Suggest: 3 days?"
- **Missed-opportunity detection:** flags follow-ups that passed their date without action — "You missed following up with Client A 2 days ago."
- **Conversation memory:** all interactions with a contact roll up into one timeline per contact.

---

## 7. Planned (Not Built in v1) — Pitch-Stage Features

These cost nothing to build now but strengthen the pitch and roadmap story:

- **Weekly recap email** — Monday morning digest of the week's pending follow-ups.
- **Snooze with reason** — capture *why* a follow-up was snoozed to learn patterns over time (e.g., "you snooze client calls on Mondays — auto-reschedule?").
- **Wins log** — follow-ups marked successfully Done feed a "Wins" feed; strong retention/demo hook.
- **Priority heatmap** — visual showing which days are overloaded.
- **Contact health score** — a contact goes "cold" after 30 days with no activity, shown as a visual indicator.

---

## 8. User Flow (MVP)

1. User adds an interaction via text or voice: *"Sent invoice to Ali, he'll pay next week."*
2. AI extracts structured follow-up data.
3. If "Ali" is ambiguous, disambiguation picker appears; user resolves it.
4. System schedules the follow-up and reminder.
5. Cron job scans due/overdue items daily → triggers in-app + email notification.
6. User marks the follow-up **Done**, **Snooze**, or **Reschedule** from the dashboard or notification.

---

## 9. Data Model (Supabase / Postgres, high-level)

```
users            → managed by Supabase Auth
contacts         (id, user_id, name, company, last_contact_at, created_at)
followups        (id, user_id, contact_id, context, action, due_date,
                   priority, status [pending|overdue|done|snoozed], created_at)
notifications    (id, user_id, followup_id, channel [in_app|email], sent_at, read_at)
```
- RLS policy on every table: `user_id = auth.uid()`.
- `status` transitions handled server-side (e.g., a cron job flips `pending` → `overdue` when `due_date` passes).

---

## 10. Budget ($25 total credit)

| Item | Estimated cost | Notes |
|---|---|---|
| Claude API (extraction) | ~$8–12 | Roughly tens of thousands of extractions at hackathon volume |
| Resend (email) | $0 | Free tier — 3,000 emails/month |
| Supabase | $0 | Free tier sufficient for hackathon scale |
| Vercel | $0 | Hobby tier, includes cron jobs |
| Web Speech API | $0 | Browser-native |
| Domain (optional) | $1–2 | Optional polish, not required for demo |
| **Total estimated spend** | **~$9–14** | Leaves $11–16 buffer for demo day |

**Cost discipline:** test the extraction prompt against hardcoded sample inputs (unit-test style) rather than repeatedly calling the live API during prompt iteration. Only hit the live API once the prompt is stable.

---

## 11. 3-Day Build Plan

**Day 1 — Core pipeline**
Supabase auth setup → input capture component (text + voice) → extraction module + prompt → raw DB write → basic list view.

**Day 2 — Dashboard + intelligence**
Contact disambiguation UI → dashboard with status board (Pending/Overdue/Done) → Resend email integration → cron job for due-date scanning.

**Day 3 — Polish + demo prep**
In-app notification bell → priority indicators/visuals → seed one clean demo account with realistic data → deploy to Vercel → rehearse demo flow end-to-end.

---

## 12. Success Metrics (for demo / early validation)

Since this is pre-launch, metrics are framed as **what the demo will prove**, not live user data:
- AI correctly extracts person/action/date from at least 90% of test sentences used in the demo set.
- Disambiguation flow correctly resolves all duplicate-name test cases without creating a duplicate contact.
- End-to-end flow (capture → extract → schedule → notify → resolve) completes in under 5 minutes live in front of judges.

---

## 13. Risks & Open Questions

| Risk | Mitigation |
|---|---|
| AI misreads relative dates ("next week" on a Friday) | Resolve dates server-side with explicit "today" anchor passed into the prompt; test edge cases before demo |
| Web Speech API accuracy on Pakistani English / Urdu-mixed speech | Add a language toggle (en-US / ur-PK) as a small but visible touch; fall back to text if transcription is poor |
| Claude API cost overrun during dev | Hardcoded test inputs during prompt iteration; only call live API for final validation |
| Disambiguation UI adds friction | Only triggers when there's genuine ambiguity — auto-links single matches silently |

---

## 14. One-Line Pitch

*People don't lose opportunities at the first conversation — they lose them because they forget to follow up. FollowSpace captures every commitment from conversations, messages, and notes, and ensures nothing is forgotten by automatically scheduling intelligent reminders and tracking every opportunity until it's resolved.*
