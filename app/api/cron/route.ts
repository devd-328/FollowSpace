import { NextResponse } from "next/server";

/** Scheduled job: scan due/overdue follow-ups — Phase 5. */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(
    { error: "Cron module not implemented yet (Phase 5)" },
    { status: 501 },
  );
}
