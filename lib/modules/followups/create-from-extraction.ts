import type { SupabaseClient } from "@supabase/supabase-js";
import type { ExtractedFollowUp } from "@/lib/types/domain";
import { createContact, findContactsByName } from "@/lib/modules/contacts";
import { createFollowUp } from "@/lib/modules/followups/service";
import type { FollowUp } from "@/lib/modules/followups/service";

type Supabase = SupabaseClient;

async function resolveContactId(
  supabase: Supabase,
  person: string,
): Promise<string> {
  const matches = await findContactsByName(supabase, person);

  if (matches.length === 1) {
    return matches[0].id;
  }

  const contact = await createContact(supabase, { name: person });
  return contact.id;
}

/** Persists an extracted follow-up (contacts module + followups module). */
export async function createFollowUpFromExtraction(
  supabase: Supabase,
  extracted: ExtractedFollowUp,
): Promise<FollowUp> {
  const contactId = await resolveContactId(supabase, extracted.person);

  return createFollowUp(supabase, {
    contact_id: contactId,
    action: extracted.action,
    due_date: extracted.follow_up_date,
    context: extracted.context ?? null,
    priority: extracted.priority,
  });
}
