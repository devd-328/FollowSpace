<div align="center">
  <br />
    <h1 align="center">✨ FollowSpace</h1>
  <br />
  <p align="center">
    <strong>Never let a conversation fall through the cracks again.</strong>
  </p>
  <p align="center">
    FollowSpace turns scattered, half-remembered commitments into structured, tracked follow-ups with automatic reminders.
  </p>
  <br />

  <div>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
  </div>
</div>

<br />

## 🎯 The Problem

People don't lose jobs, sales, or deals at the first conversation. They lose them at the missing follow-up — because there's no system, follow-ups are scattered across chats, calls, and emails, and memory isn't reliable.

| User | Example Commitment | What Goes Wrong |
| --- | --- | --- |
| 🧑‍💼 **Job Seeker** | *"I'll hear back in a week"* | Forgets to follow up, loses the lead. |
| 💻 **Freelancer** | *"Client said they'll respond soon"* | No reminder, opportunity goes cold. |
| 🚀 **Founder** | *"Investor said they'll review the pitch"* | No structured tracking across investors. |

## 🚀 The Solution

**FollowSpace** is not just another task manager. It's a structured follow-up intelligence layer. Simply speak or type your commitment in plain English, and our AI extracts the person, action, priority, and date—scheduling everything automatically.

### ✨ Key Features

- **🎙️ Natural Input (Text & Voice):** *"Client said call me next week about pricing."* We handle the rest.
- **🧠 AI Extraction Engine:** Powered by Gemini to auto-extract contacts, contexts, and due dates accurately.
- **🔍 Smart Disambiguation:** Knows the difference between your contacts. Never merges the wrong "Ali" or "Sarah".
- **🔔 Intelligent Reminders:** Daily cron jobs send in-app and email digests of due and overdue follow-ups.
- **📊 Intuitive Dashboard:** A clean, Kanban-style view of your pending, due, and snoozed opportunities.

<br />

## 🛠️ Tech Stack

Built for speed, scale, and a premium user experience:

- **Frontend & API:** [Next.js (App Router)](https://nextjs.org/) + React 19
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Database & Auth:** [Supabase](https://supabase.com/) (Postgres + RLS + Auth)
- **AI Engine:** Google Generative AI (Gemini)
- **Email:** [Resend](https://resend.com/)

<br />

## 🚀 Getting Started

Follow these steps to run FollowSpace locally.

### 1. Clone the repository

```bash
git clone https://github.com/devd-328/FollowSpace.git
cd FollowSpace
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file and fill in your keys (Supabase, Resend, Gemini):

```bash
cp .env.example .env.local
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<br />

## 🛣️ Roadmap

- [x] Natural language capture & AI extraction
- [x] Contact disambiguation
- [x] Dashboard & Follow-up states (Pending, Overdue, Done, Snoozed)
- [ ] Weekly recap digest emails
- [ ] Snooze with context ("why did I snooze this?")
- [ ] Priority heatmap

<br />

<div align="center">
  <i>Built with ❤️ for those who follow up and close the deal.</i>
</div>
