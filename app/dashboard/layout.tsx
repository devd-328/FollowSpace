import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { countUnreadNotifications } from "@/lib/modules/notifications";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  let unreadCount = 0;

  try {
    unreadCount = await countUnreadNotifications(supabase);
  } catch {
    // Tables may not exist until Supabase migration is applied.
    unreadCount = 0;
  }

  return (
    <>
      <Header unreadCount={unreadCount} />
      <div className="flex-1 pb-20 md:pb-8">{children}</div>
      <BottomNav />
    </>
  );
}
