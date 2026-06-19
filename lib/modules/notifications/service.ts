import type { SupabaseClient } from "@supabase/supabase-js";
import type { Notification } from "@/lib/types/domain";

export type { Notification };

type Supabase = SupabaseClient;

export async function listUnreadNotifications(
  supabase: Supabase,
): Promise<Notification[]> {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("channel", "in_app")
    .is("read_at", null)
    .order("sent_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Notification[];
}

export async function countUnreadNotifications(
  supabase: Supabase,
): Promise<number> {
  const notifications = await listUnreadNotifications(supabase);
  return notifications.length;
}
