"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    setMessage("Check your email for a sign-in link.");
    router.refresh();
  }

  return (
    <Card className="w-full max-w-md">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-ink md:text-[28px]">
          Welcome back
        </h1>
        <p className="text-sm text-muted">
          Sign in with a magic link — no password needed.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Email
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            error={Boolean(error)}
          />
        </div>

        {error && <p className="text-sm text-error">{error}</p>}
        {message && <p className="text-sm text-success">{message}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Sending link…" : "Continue with email"}
        </Button>
      </form>
    </Card>
  );
}
