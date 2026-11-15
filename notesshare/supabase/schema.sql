create table if not exists public.note_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 80),
  email text not null check (
    char_length(email) between 3 and 254
    and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
  ),
  subject text not null check (char_length(btrim(subject)) between 1 and 80),
  topic text not null check (char_length(btrim(topic)) between 1 and 120),
  details text not null check (char_length(btrim(details)) between 20 and 1000),
  created_at timestamptz not null default now()
);

alter table public.note_requests enable row level security;

revoke all on table public.note_requests from anon, authenticated;
grant insert (name, email, subject, topic, details)
  on table public.note_requests to anon, authenticated;

drop policy if exists note_requests_public_insert on public.note_requests;
create policy note_requests_public_insert
  on public.note_requests
  for insert
  to anon, authenticated
  with check (true);
