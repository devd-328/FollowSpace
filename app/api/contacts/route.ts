import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { listContacts } from "@/lib/modules/contacts";

/** Contact resolution & disambiguation module. */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const contacts = await listContacts(supabase);
    return NextResponse.json({ contacts });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json(
    { error: "Contact creation via API lands in Phase 3" },
    { status: 501 },
  );
}
