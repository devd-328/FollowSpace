import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { extractFollowUp } from "@/lib/extraction";

/** Extraction module — text → structured follow-up (Gemini or mock). */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { text?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const text = body.text?.trim();
  if (!text) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  try {
    const { extracted, source } = await extractFollowUp(text);
    return NextResponse.json({ extracted, source });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Extraction failed";
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
