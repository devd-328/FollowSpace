"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

interface LogoutButtonProps {
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "destructive";
}

export function LogoutButton({
  className,
  variant = "ghost",
}: LogoutButtonProps) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  }

  return (
    <Button
      type="button"
      variant={variant}
      className={cn("text-sm", className)}
      onClick={handleLogout}
    >
      Sign out
    </Button>
  );
}
