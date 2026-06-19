import Link from "next/link";
import { LogoutButton } from "@/components/auth/logout-button";

const items = [
  { href: "/dashboard", label: "Home" },
  { href: "/dashboard?filter=today", label: "Today" },
];

export function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-100 bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
      aria-label="Mobile"
    >
      <ul className="grid h-16 grid-cols-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex h-full items-center justify-center text-sm font-medium text-muted"
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li className="flex items-center justify-center">
          <LogoutButton className="h-full min-h-0 px-3 py-2 text-sm font-medium" />
        </li>
      </ul>
    </nav>
  );
}
