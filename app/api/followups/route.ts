import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  createFollowUpFromExtraction,
  listFollowUpsWithContacts,
} from "@/lib/modules/followups";
import { parseExtractionOutput } from "@/lib/extraction/parser";

function formatError(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes("does not exist")) {
      return "Database tables missing. Run supabase/migrations/001_initial_schema.sql in Supabase SQL Editor.";
    }
    return error.message;
  }
  return "Unknown error";
}

/** CRUD for follow-up records. */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const followUps = await listFollowUpsWithContacts(supabase);
    return NextResponse.json({ followUps });
  } catch (error) {
    return NextResponse.json({ error: formatError(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const extracted = parseExtractionOutput(body);
    const followUp = await createFollowUpFromExtraction(supabase, extracted);
    return NextResponse.json({ followUp }, { status: 201 });
  } catch (error) {
    console.error("Follow-up save failed:", error);
    return NextResponse.json({ error: formatError(error) }, { status: 422 });
  }
}
