import type { SupabaseClient } from "@supabase/supabase-js";
import type { Contact } from "@/lib/types/domain";

export type { Contact };

type Supabase = SupabaseClient;

export async function listContacts(supabase: Supabase): Promise<Contact[]> {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;
  return (data ?? []) as Contact[];
}

export async function findContactsByName(
  supabase: Supabase,
  name: string,
): Promise<Contact[]> {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .ilike("name", name.trim());

  if (error) throw error;
  return (data ?? []) as Contact[];
}

export async function createContact(
  supabase: Supabase,
  input: { name: string; company?: string | null },
): Promise<Contact> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("contacts")
    .insert({
      user_id: user.id,
      name: input.name.trim(),
      company: input.company ?? null,
      last_contact_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data as Contact;
}
