-- Supabase Schema for Persian Learning App
-- Run this in the Supabase SQL Editor

-- 1. User profiles (auto-created on signup)
create table user_profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  created_at timestamptz default now()
);

alter table user_profiles enable row level security;

create policy "Users can view own profile"
  on user_profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on user_profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Reading progress
create table reading_progress (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users on delete cascade not null,
  module_id text not null,
  story_id text not null,
  status text not null default 'attempted',
  updated_at timestamptz default now(),
  unique (user_id, module_id, story_id)
);

alter table reading_progress enable row level security;

create policy "Users can manage own reading progress"
  on reading_progress for all using (auth.uid() = user_id);

-- 3. Writing progress
create table writing_progress (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users on delete cascade not null,
  module_id text not null,
  exercise_id text not null,
  updated_at timestamptz default now(),
  unique (user_id, module_id, exercise_id)
);

alter table writing_progress enable row level security;

create policy "Users can manage own writing progress"
  on writing_progress for all using (auth.uid() = user_id);

-- 4. Grammar progress
create table grammar_progress (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users on delete cascade not null,
  module_id text not null,
  exercise_id integer not null,
  updated_at timestamptz default now(),
  unique (user_id, module_id, exercise_id)
);

alter table grammar_progress enable row level security;

create policy "Users can manage own grammar progress"
  on grammar_progress for all using (auth.uid() = user_id);

-- 5. SRS cards
create table srs_cards (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users on delete cascade not null,
  persian text not null,
  english text not null,
  transliteration text not null,
  module_id text not null,
  interval integer not null default 1,
  repetitions integer not null default 0,
  ease_factor real not null default 2.5,
  next_review bigint not null default 0,
  last_reviewed bigint not null default 0,
  correct_streak integer not null default 0,
  total_reviews integer not null default 0,
  is_starred boolean not null default false,
  updated_at timestamptz default now(),
  unique (user_id, persian)
);

alter table srs_cards enable row level security;

create policy "Users can manage own SRS cards"
  on srs_cards for all using (auth.uid() = user_id);

-- 6. User streak
create table user_streak (
  user_id uuid references auth.users on delete cascade primary key,
  current_streak integer not null default 0,
  last_review_date text not null default '',
  updated_at timestamptz default now()
);

alter table user_streak enable row level security;

create policy "Users can manage own streak"
  on user_streak for all using (auth.uid() = user_id);

-- 7. Starred words
create table starred_words (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users on delete cascade not null,
  module_id text not null,
  persian text not null,
  updated_at timestamptz default now(),
  unique (user_id, module_id, persian)
);

alter table starred_words enable row level security;

create policy "Users can manage own starred words"
  on starred_words for all using (auth.uid() = user_id);

-- 8. Last activity
create table last_activity (
  user_id uuid references auth.users on delete cascade primary key,
  activity_type text not null,
  module_id text not null,
  activity_id text not null,
  updated_at timestamptz default now()
);

alter table last_activity enable row level security;

create policy "Users can manage own last activity"
  on last_activity for all using (auth.uid() = user_id);
