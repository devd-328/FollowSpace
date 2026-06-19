import { Card } from "@/components/ui/card";
import { InputCapture } from "@/components/input-capture";
import { FollowUpList } from "@/components/follow-up-list";
import { listFollowUpsWithContacts } from "@/lib/modules/followups";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  let followUps: Awaited<ReturnType<typeof listFollowUpsWithContacts>> = [];

  try {
    followUps = await listFollowUpsWithContacts(supabase);
  } catch {
    followUps = [];
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-ink md:text-[28px]">
          Follow-ups
        </h1>
        <p className="mt-1 text-sm text-muted">
          Capture commitments and track them until they&apos;re done.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr] lg:items-start">
        <Card>
          <h2 className="text-lg font-semibold text-ink">Add follow-up</h2>
          <p className="mt-1 text-sm text-muted">
            Type or speak a commitment — we&apos;ll structure it for you.
          </p>
          <div className="mt-4">
            <InputCapture />
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-ink">Your follow-ups</h2>
          <div className="mt-4">
            <FollowUpList followUps={followUps} />
          </div>
        </Card>
      </div>
    </main>
  );
}
