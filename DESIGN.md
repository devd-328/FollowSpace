# DESIGN.md — FollowSpace

## Overview

FollowSpace adopts the **Stripe design system** as its visual foundation: trust, clarity, and professional polish without generic “AI product” aesthetics. The UI centers on people, dates, and actions — AI runs invisibly behind the scenes.

**Design principles**
- Calm, authoritative surfaces — no gradients, sparkles, or chat-bubble layouts
- Violet reserved for primary actions and active states only
- Generous whitespace; hierarchy through type weight, not decoration
- Fully responsive: mobile-first, touch-friendly, desktop-efficient

---

## Colors

### Primary Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `color-brand` | `#635BFF` | Primary CTA, links, active nav, focus rings |
| `color-ink` | `#0A2540` | Headings, primary text |
| `color-success` | `#00D4AA` | Done status, positive confirmations |
| `color-surface` | `#FFFFFF` | Cards, inputs, modals |
| `color-muted` | `#425466` | Secondary text, descriptions, metadata |

### Neutral Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `color-gray-50` | `#F6F9FC` | Page background |
| `color-gray-100` | `#E3E8EE` | Borders, dividers |
| `color-gray-200` | `#C1C9D2` | Disabled states, placeholders |
| `color-gray-700` | `#425466` | Body text |
| `color-gray-900` | `#0A2540` | Headings |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `color-error` | `#DF1B41` | Errors, destructive actions, overdue |
| `color-warning` | `#F5A623` | Warnings, pending / due-soon |
| `color-info` | `#635BFF` | Informational badges, snoozed info |

### Follow-up Status Colors

| Status | Token | Hex | Usage |
|--------|-------|-----|-------|
| Pending | `status-pending` | `#F5A623` | Due in future; amber dot + label |
| Overdue | `status-overdue` | `#DF1B41` | Past due; muted red, not alarm styling |
| Done | `status-done` | `#00D4AA` | Completed follow-ups |
| Snoozed | `status-snoozed` | `#425466` | Deferred items; cool gray |

Status indicators use a **6px dot** + **Caption** label — never full-row background fills.

### Priority (secondary accent)

| Priority | Color | Usage |
|----------|-------|-------|
| High | `#DF1B41` | Small badge only |
| Medium | `#F5A623` | Small badge only |
| Low | `#C1C9D2` | Small badge only |

---

## Typography

| Role | Family | Size | Weight | Line Height |
|------|--------|------|--------|-------------|
| Display | Inter | 56px | 700 | 1.1 |
| Heading 1 | Inter | 40px | 700 | 1.2 |
| Heading 2 | Inter | 28px | 600 | 1.3 |
| Heading 3 | Inter | 20px | 600 | 1.4 |
| Body | Inter | 16px | 400 | 1.6 |
| Body Small | Inter | 14px | 400 | 1.5 |
| Caption | Inter | 12px | 500 | 1.4 |
| Code | JetBrains Mono | 14px | 400 | 1.6 |

**Font CDN**

```
https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400
```

### Responsive type scale

| Role | Mobile | Desktop (≥1024px) |
|------|--------|-------------------|
| Page title | 24px / 600 | 28px / 600 |
| Section heading | 18px / 600 | 20px / 600 |
| Body | 15px / 400 | 16px / 400 |
| Body Small | 14px / 400 | 14px / 400 |

Never reduce body text below **14px**.

---

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Inline icon gaps |
| `space-2` | 8px | Tight element spacing |
| `space-3` | 12px | Form field gaps |
| `space-4` | 16px | Card padding (mobile), section gaps |
| `space-6` | 24px | Card padding (desktop), component spacing |
| `space-8` | 32px | Section padding |
| `space-12` | 48px | Large section gaps |
| `space-16` | 64px | Page section spacing |

---

## Border Radius

| Token | Value | Context |
|-------|-------|---------|
| `radius-sm` | 4px | Status badges, tags |
| `radius-md` | 8px | Buttons, inputs |
| `radius-lg` | 12px | Cards, modals |
| `radius-xl` | 16px | Sheets (mobile) |
| `radius-full` | 9999px | Avatars, notification pills |

---

## Elevation

| Level | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Cards at rest |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.08)` | Dropdowns, notification panel, popovers |
| `shadow-lg` | `0 12px 40px rgba(0,0,0,0.12)` | Modals, mobile sheets |

Do not use shadows heavier than `shadow-md` on static cards.

---

## Layout & Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| `sm` | ≥640px | 2-column summary optional |
| `md` | ≥768px | Table view for dashboard |
| `lg` | ≥1024px | Two-column main: capture + list |
| `xl` | ≥1280px | Max content width 1200px, centered |

### Page structure

```
┌──────────────────────────────────────────────────┐
│  Sticky header (64px) — logo, nav, bell, avatar  │
├──────────────────────────────────────────────────┤
│  Page background: color-gray-50                  │
│  ┌──────────────┐  ┌───────────────────────────┐ │
│  │ InputCapture │  │ Dashboard / follow-up list│ │
│  │   (card)     │  │        (card)             │ │
│  └──────────────┘  └───────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

### Mobile (<768px)

- Single column; capture card at top
- Dashboard rows become stacked **FollowUpCard** items
- Bottom nav: **Home** · **Today** · **Account** (64px height, safe-area inset)
- Modals → full-width bottom sheets (`radius-xl` top corners)
- Minimum touch target: **44×44px**

### Desktop (≥1024px)

- Capture left (~360px), list right (fluid)
- Dashboard table: Contact | Context | Due | Status
- Hover row: `color-gray-50` background
- No hover-only actions — all actions available on tap/click

---

## Components

### Button

| Variant | Style |
|---------|-------|
| **Primary** | Background `#635BFF`, white text, `radius-md`, padding `12px 20px` |
| **Secondary** | Transparent, border `#E3E8EE`, text `#0A2540` |
| **Ghost** | No border, text `#635BFF` |
| **Destructive** | Background `#DF1B41`, white text |

**States:** Hover darkens 10%; focus ring 2px offset `rgba(99,91,255,0.15)`; disabled 40% opacity.

**Labels:** Use “Add follow-up”, “Save”, “Done” — never “Generate” or “Ask AI”.

### Input / Textarea (`InputCapture`)

- Border `#E3E8EE`, `radius-md`, padding `10px 12px` (input) / `12px 16px` (textarea)
- Focus: border `#635BFF`, ring `rgba(99,91,255,0.15)`
- Error: border `#DF1B41`
- Mic icon: ghost button, right-aligned inside field — secondary, not prominent
- Placeholder: `color-gray-200` — e.g. *“Client said call next week about pricing…”*

### Card

- Background `#FFFFFF`, border `#E3E8EE`, `radius-lg`
- Padding: `space-4` mobile, `space-6` desktop
- `shadow-sm` at rest; optional `shadow-sm` on hover for interactive rows

### FollowUpCard

```
┌─────────────────────────────────────────┐
│ ● Overdue          [High]               │
│ Recruiter                               │
│ Interview follow-up                     │
│ Due yesterday                           │
│                                         │
│ [ Done ]  [ Snooze ▾ ]  [ Reschedule ]  │
└─────────────────────────────────────────┘
```

- Contact name: Heading 3
- Action/context: Body Small, `color-muted`
- Due date: Body Small; overdue uses `color-error`
- Actions: Primary (Done) + Secondary (Snooze, Reschedule)

### ContactPicker (disambiguation)

- Modal on desktop (`shadow-lg`); bottom sheet on mobile
- Radio-style rows, min height 56px
- Row: name (600 weight) + company + last contact (Caption, muted)
- Last row: “+ New contact” with `color-brand` text

### Extraction confirmation

Shown after parse, before save — not a chat message.

- Card with extracted fields: person, action, due date, priority badge
- Actions: **Save** (primary) · **Edit** (secondary)
- No “AI extracted” copy — title: “Review follow-up”

### NotificationBell

- Header right; badge: `color-brand` background, white Caption text
- Dropdown: `shadow-md`, `radius-lg`, max-width 360px
- Each item mirrors FollowUpCard condensed layout
- Unread: `color-gray-50` row background

### Navigation

- Sticky header, backdrop blur, height **64px**
- Logo left (**Follow** in `#635BFF`, **Space** in `#0A2540`)
- Center tabs (desktop): All · Today · Overdue
- Active tab: text `#635BFF`, 2px underline
- Right: bell + avatar

### Status badge

- `radius-sm`, padding `2px 8px`, Caption weight 500
- Background: 10% opacity tint of status color; text: full status color

### Dashboard table (desktop)

| Column | Style |
|--------|-------|
| Contact | Body, 500 weight |
| Context | Body Small, muted |
| Next follow-up | Body Small |
| Status | Status dot + badge |

Row height: 56px; divider `color-gray-100`.

### Contact timeline

- Vertical line: `color-gray-100`, 2px
- Date: Caption, muted, left column (80px)
- Event: Body Small, right column
- Page title: contact name, Heading 2

---

## Motion

| Interaction | Duration | Easing |
|-------------|----------|--------|
| Hover / focus | 150ms | ease |
| Sheet / modal enter | 200ms | ease-out |
| Dropdown | 150ms | ease |

No shimmer loaders, particles, or “AI thinking” animations. Use skeleton rows or a simple spinner (`color-brand`).

---

## Copy & Tone

| Avoid | Use |
|-------|-----|
| “AI extracted…” | “Review follow-up” |
| “Generate reminder” | “Add follow-up” |
| “Smart suggestions” | “Suggested: follow up in 3 days?” |
| “Powered by…” | *(omit)* |

---

## Assets

| Asset | Spec |
|-------|------|
| **Wordmark** | “Follow” `#635BFF` + “Space” `#0A2540` |
| **Favicon** | 32×32 monogram “FS” in brand violet on white |
| **OG image** | Navy ink background, white wordmark (demo / deploy) |

---

## Do's and Don'ts

### Do

- Use brand violet sparingly — primary actions and active nav only
- Maintain generous whitespace between sections
- Use Inter 400/500/600/700 for hierarchy
- Keep status colors muted (dot + badge, not full-row fills)
- Test on Chrome, Safari iOS, Firefox; degrade voice input gracefully
- Ensure all actions work without hover (mobile)

### Don't

- Don't use more than 2 accent colors on a single page
- Don't reduce body text below 14px
- Don't use shadows heavier than `shadow-md` on cards
- Don't use violet text on dark backgrounds without contrast check
- Don't use chat bubbles, sparkles, gradients, or “AI-powered” badges
- Don't expose AI/provider branding in the UI

---

## Tailwind CSS mapping (implementation reference)

```js
// tailwind.config — extend theme
colors: {
  brand: '#635BFF',
  ink: '#0A2540',
  success: '#00D4AA',
  muted: '#425466',
  surface: '#FFFFFF',
  gray: {
    50: '#F6F9FC',
    100: '#E3E8EE',
    200: '#C1C9D2',
    700: '#425466',
    900: '#0A2540',
  },
  error: '#DF1B41',
  warning: '#F5A623',
},
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
},
borderRadius: {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
},
boxShadow: {
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  md: '0 4px 12px rgba(0,0,0,0.08)',
  lg: '0 12px 40px rgba(0,0,0,0.12)',
},
```

---

## Screen checklist (MVP)

| Screen | Key components |
|--------|----------------|
| Auth | Centered card, primary CTA, minimal copy |
| Dashboard | InputCapture, filter tabs, table / card list, NotificationBell |
| Disambiguation | ContactPicker modal/sheet |
| Review | Extraction confirmation card |
| Contact detail | Timeline, follow-up history |
| Notifications | Bell dropdown |

---

*Based on Stripe design system. Adapted for FollowSpace — June 2026.*
