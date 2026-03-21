-- Migration for creating comments table
create table comments (
  id uuid default gen_random_uuid() primary key,
  post_slug text not null,
  author_name text not null,
  content text not null,
  created_at timestamptz default now(),
  is_approved boolean default true
);

alter table comments enable row level security;

create policy "public read" on comments
  for select using (is_approved = true);

create policy "public insert" on comments
  for insert with check (true);
