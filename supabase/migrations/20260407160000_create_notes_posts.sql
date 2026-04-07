-- @file 20260407160000_create_notes_posts.sql
-- @description Create notes_posts table + RLS for Notes (Blog) admin editing.

create table if not exists public.notes_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique,
  title text not null,
  summary text not null default '',
  body_md text not null default '',
  date date not null,
  published boolean not null default false
);

create index if not exists notes_posts_published_date_idx on public.notes_posts (published, date desc);
create index if not exists notes_posts_date_idx on public.notes_posts (date desc);

-- Keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_notes_posts_updated_at on public.notes_posts;
create trigger trg_notes_posts_updated_at
before update on public.notes_posts
for each row execute function public.set_updated_at();

-- Enable RLS
alter table public.notes_posts enable row level security;

-- Public can read published posts
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'notes_posts'
      and policyname = 'public_select_published_notes_posts'
  ) then
    create policy public_select_published_notes_posts
      on public.notes_posts
      for select
      to anon, authenticated
      using (published = true);
  end if;
end $$;

-- Owner (by email) can read everything
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'notes_posts'
      and policyname = 'owner_select_all_notes_posts'
  ) then
    create policy owner_select_all_notes_posts
      on public.notes_posts
      for select
      to authenticated
      using (auth.jwt() ->> 'email' = '1743110041@qq.com');
  end if;
end $$;

-- Owner can insert/update/delete
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'notes_posts'
      and policyname = 'owner_insert_notes_posts'
  ) then
    create policy owner_insert_notes_posts
      on public.notes_posts
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
      and tablename = 'notes_posts'
      and policyname = 'owner_update_notes_posts'
  ) then
    create policy owner_update_notes_posts
      on public.notes_posts
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
      and tablename = 'notes_posts'
      and policyname = 'owner_delete_notes_posts'
  ) then
    create policy owner_delete_notes_posts
      on public.notes_posts
      for delete
      to authenticated
      using (auth.jwt() ->> 'email' = '1743110041@qq.com');
  end if;
end $$;

