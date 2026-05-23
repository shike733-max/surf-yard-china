create table if not exists public.app_content (
  key text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.app_content enable row level security;

drop policy if exists "No public access to app content" on public.app_content;

create policy "No public access to app content"
on public.app_content
for all
using (false)
with check (false);
