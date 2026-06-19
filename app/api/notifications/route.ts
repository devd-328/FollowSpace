import { NextResponse } from "next/server";

/** In-app + email dispatch module — Phase 5. */
export async function GET() {
  return NextResponse.json(
    { error: "Notifications module not implemented yet (Phase 5)" },
    { status: 501 },
  );
}
