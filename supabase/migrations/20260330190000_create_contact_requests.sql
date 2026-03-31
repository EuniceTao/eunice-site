-- @file 20260330190000_create_contact_requests.sql
-- @description Create contact_requests table for contact form submissions.

create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text null,
  contact text not null,
  need text not null,
  page_path text null,
  user_agent text null
);

-- Enable RLS
alter table public.contact_requests enable row level security;

-- Public can insert (from your site)
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'contact_requests'
      and policyname = 'public_insert_contact_requests'
  ) then
    create policy public_insert_contact_requests
      on public.contact_requests
      for insert
      to anon, authenticated
      with check (true);
  end if;
end $$;

-- Nobody can select/update/delete from anon by default

