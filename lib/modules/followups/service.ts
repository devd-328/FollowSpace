import type { SupabaseClient } from "@supabase/supabase-js";
import type { FollowUp, FollowUpStatus } from "@/lib/types/domain";

export type { FollowUp };

export interface FollowUpWithContact extends FollowUp {
  contact_name: string;
  contact_company: string | null;
}

type Supabase = SupabaseClient;

export async function listFollowUpsWithContacts(
  supabase: Supabase,
): Promise<FollowUpWithContact[]> {
  const { data, error } = await supabase
    .from("followups")
    .select("*, contacts(name, company)")
    .order("due_date", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => {
    const contact = row.contacts as { name: string; company: string | null } | null;
    const followUp = { ...row } as FollowUp & {
      contacts?: { name: string; company: string | null } | null;
    };
    delete followUp.contacts;
    return {
      ...followUp,
      contact_name: contact?.name ?? "Unknown",
      contact_company: contact?.company ?? null,
    };
  });
}

export async function listFollowUps(supabase: Supabase): Promise<FollowUp[]> {
  const { data, error } = await supabase
    .from("followups")
    .select("*")
    .order("due_date", { ascending: true });

  if (error) throw error;
  return (data ?? []) as FollowUp[];
}

export async function listFollowUpsByStatus(
  supabase: Supabase,
  status: FollowUpStatus,
): Promise<FollowUp[]> {
  const { data, error } = await supabase
    .from("followups")
    .select("*")
    .eq("status", status)
    .order("due_date", { ascending: true });

  if (error) throw error;
  return (data ?? []) as FollowUp[];
}

export async function createFollowUp(
  supabase: Supabase,
  input: {
    contact_id: string;
    action: string;
    due_date: string;
    context?: string | null;
    priority?: FollowUp["priority"];
  },
): Promise<FollowUp> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("followups")
    .insert({
      user_id: user.id,
      contact_id: input.contact_id,
      action: input.action,
      due_date: input.due_date,
      context: input.context ?? null,
      priority: input.priority ?? "medium",
      status: "pending",
    })
    .select()
    .single();

  if (error) throw error;
  return data as FollowUp;
}

export async function updateFollowUpStatus(
  supabase: Supabase,
  id: string,
  status: FollowUpStatus,
): Promise<FollowUp> {
  const { data, error } = await supabase
    .from("followups")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as FollowUp;
}
