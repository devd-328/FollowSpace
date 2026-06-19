-- FollowSpace initial schema (Phase 0)
-- Run in Supabase SQL Editor or via Supabase CLI

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- contacts
-- ---------------------------------------------------------------------------
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  company text,
  last_contact_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists contacts_user_id_idx on public.contacts (user_id);
create index if not exists contacts_name_idx on public.contacts (user_id, name);

alter table public.contacts enable row level security;

create policy "contacts_select_own"
  on public.contacts for select
  using (auth.uid() = user_id);

create policy "contacts_insert_own"
  on public.contacts for insert
  with check (auth.uid() = user_id);

create policy "contacts_update_own"
  on public.contacts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "contacts_delete_own"
  on public.contacts for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- followups
-- ---------------------------------------------------------------------------
create type public.followup_status as enum ('pending', 'overdue', 'done', 'snoozed');
create type public.followup_priority as enum ('low', 'medium', 'high');

create table if not exists public.followups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  contact_id uuid not null references public.contacts (id) on delete cascade,
  context text,
  action text not null,
  due_date date not null,
  priority public.followup_priority not null default 'medium',
  status public.followup_status not null default 'pending',
  created_at timestamptz not null default now()
);

create index if not exists followups_user_id_idx on public.followups (user_id);
create index if not exists followups_due_date_idx on public.followups (user_id, due_date);
create index if not exists followups_status_idx on public.followups (user_id, status);

alter table public.followups enable row level security;

create policy "followups_select_own"
  on public.followups for select
  using (auth.uid() = user_id);

create policy "followups_insert_own"
  on public.followups for insert
  with check (auth.uid() = user_id);

create policy "followups_update_own"
  on public.followups for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "followups_delete_own"
  on public.followups for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- notifications
-- ---------------------------------------------------------------------------
create type public.notification_channel as enum ('in_app', 'email');

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  followup_id uuid not null references public.followups (id) on delete cascade,
  channel public.notification_channel not null,
  sent_at timestamptz not null default now(),
  read_at timestamptz
);

create index if not exists notifications_user_id_idx on public.notifications (user_id);
create index if not exists notifications_unread_idx
  on public.notifications (user_id, channel)
  where read_at is null;

alter table public.notifications enable row level security;

create policy "notifications_select_own"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "notifications_insert_own"
  on public.notifications for insert
  with check (auth.uid() = user_id);

create policy "notifications_update_own"
  on public.notifications for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "notifications_delete_own"
  on public.notifications for delete
  using (auth.uid() = user_id);
