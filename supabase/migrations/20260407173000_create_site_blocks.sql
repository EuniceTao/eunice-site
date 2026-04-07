-- @file 20260407173000_create_site_blocks.sql
-- @description Create site_blocks table + RLS for editable site sections (draft/publish).

create table if not exists public.site_blocks (
  key text primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  draft jsonb not null default '{}'::jsonb,
  published jsonb not null default '{}'::jsonb
);

-- Keep updated_at fresh
create or replace function public.set_site_blocks_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_site_blocks_updated_at on public.site_blocks;
create trigger trg_site_blocks_updated_at
before update on public.site_blocks
for each row execute function public.set_site_blocks_updated_at();

-- Enable RLS
alter table public.site_blocks enable row level security;

-- Public can read published only (published JSON is safe for public)
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'site_blocks'
      and policyname = 'public_select_site_blocks'
  ) then
    create policy public_select_site_blocks
      on public.site_blocks
      for select
      to anon, authenticated
      using (true);
  end if;
end $$;

-- Owner can insert/update/delete
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'site_blocks'
      and policyname = 'owner_insert_site_blocks'
  ) then
    create policy owner_insert_site_blocks
      on public.site_blocks
      for insert
      to authenticated
      with check (auth.jwt() ->> 'email' = '1743110041@qq.com');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'site_blocks'
      and policyname = 'owner_update_site_blocks'
  ) then
    create policy owner_update_site_blocks
      on public.site_blocks
      for update
      to authenticated
      using (auth.jwt() ->> 'email' = '1743110041@qq.com')
      with check (auth.jwt() ->> 'email' = '1743110041@qq.com');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'site_blocks'
      and policyname = 'owner_delete_site_blocks'
  ) then
    create policy owner_delete_site_blocks
      on public.site_blocks
      for delete
      to authenticated
      using (auth.jwt() ->> 'email' = '1743110041@qq.com');
  end if;
end $$;

