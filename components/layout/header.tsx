import { Wordmark } from "@/components/layout/wordmark";
import { NotificationBell } from "@/components/notification-bell";
import { LogoutButton } from "@/components/auth/logout-button";

interface HeaderProps {
  unreadCount?: number;
}

export function Header({ unreadCount = 0 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-gray-100 bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Wordmark href="/dashboard" />
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          <span className="border-b-2 border-brand pb-0.5 text-sm font-medium text-brand">
            All
          </span>
          <span className="text-sm text-muted">Today</span>
          <span className="text-sm text-muted">Overdue</span>
        </nav>
        <div className="flex items-center gap-2">
          <NotificationBell unreadCount={unreadCount} />
          <LogoutButton className="hidden sm:inline-flex" />
        </div>
      </div>
    </header>
  );
}
