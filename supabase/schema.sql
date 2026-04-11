create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  role text not null check (role in ('guest', 'host', 'admin')) default 'guest',
  phone text,
  avatar_url text,
  bio text,
  response_time_hours integer default 24,
  is_superhost boolean default false,
  created_at timestamptz not null default now()
);

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  host_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  description text,
  type text not null,
  address text,
  city text,
  lat double precision,
  lng double precision,
  bedrooms integer default 0,
  bathrooms numeric(4,1) default 0,
  max_guests integer default 1,
  sqft integer,
  amenities text[] default '{}',
  photos text[] default '{}',
  house_rules text,
  cancellation_policy text,
  nightly_rate numeric(10,2) default 0,
  weekly_rate numeric(10,2) default 0,
  monthly_rate numeric(10,2) default 0,
  cleaning_fee numeric(10,2) default 0,
  min_stay integer default 1,
  max_stay integer default 365,
  is_long_term boolean default false,
  pet_friendly boolean default false,
  status text default 'draft',
  rating numeric(3,2) default 0,
  review_count integer default 0,
  view_count integer default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists availability (
  id bigserial primary key,
  property_id uuid not null references properties(id) on delete cascade,
  date date not null,
  status text not null check (status in ('available', 'booked', 'blocked')),
  price_override numeric(10,2),
  unique (property_id, date)
);

create table if not exists seasonal_pricing (
  id bigserial primary key,
  property_id uuid not null references properties(id) on delete cascade,
  name text not null,
  start_date date not null,
  end_date date not null,
  price_multiplier numeric(5,2) not null default 1
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  guest_id uuid not null references profiles(id) on delete cascade,
  check_in date not null,
  check_out date not null,
  guests integer not null default 1,
  total_price numeric(10,2) not null default 0,
  cleaning_fee numeric(10,2) not null default 0,
  service_fee numeric(10,2) not null default 0,
  status text not null default 'pending',
  special_requests text,
  created_at timestamptz not null default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  reviewer_id uuid not null references profiles(id) on delete cascade,
  property_id uuid not null references properties(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  cleanliness integer not null check (cleanliness between 1 and 5),
  communication integer not null check (communication between 1 and 5),
  location integer not null check (location between 1 and 5),
  value integer not null check (value between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references bookings(id) on delete cascade,
  sender_id uuid not null references profiles(id) on delete cascade,
  receiver_id uuid not null references profiles(id) on delete cascade,
  content text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists saved_properties (
  profile_id uuid not null references profiles(id) on delete cascade,
  property_id uuid not null references properties(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (profile_id, property_id)
);

create table if not exists host_payouts (
  id uuid primary key default gen_random_uuid(),
  host_id uuid not null references profiles(id) on delete cascade,
  booking_id uuid not null references bookings(id) on delete cascade,
  amount numeric(10,2) not null,
  status text not null default 'pending',
  paid_at timestamptz
);

create table if not exists long_term_applications (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  applicant_id uuid not null references profiles(id) on delete cascade,
  employment text,
  income text,
  references jsonb default '[]'::jsonb,
  status text not null default 'submitted',
  created_at timestamptz not null default now()
);

create index if not exists properties_city_idx on properties(city);
create index if not exists properties_host_idx on properties(host_id);
create index if not exists availability_property_date_idx on availability(property_id, date);
create index if not exists bookings_guest_idx on bookings(guest_id);
create index if not exists bookings_property_idx on bookings(property_id);
create index if not exists messages_receiver_idx on messages(receiver_id, read);
create index if not exists reviews_property_idx on reviews(property_id);

create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger properties_set_updated_at
before update on properties
for each row execute procedure set_updated_at();

alter table profiles enable row level security;
alter table properties enable row level security;
alter table availability enable row level security;
alter table seasonal_pricing enable row level security;
alter table bookings enable row level security;
alter table reviews enable row level security;
alter table messages enable row level security;
alter table saved_properties enable row level security;
alter table host_payouts enable row level security;
alter table long_term_applications enable row level security;

create policy if not exists public_profiles_read on profiles for select using (true);
create policy if not exists public_properties_read on properties for select using (status = 'active' or auth.uid() = host_id);
create policy if not exists host_properties_write on properties for all using (auth.uid() = host_id) with check (auth.uid() = host_id);
create policy if not exists public_availability_read on availability for select using (true);
create policy if not exists host_availability_write on availability for all using (exists (select 1 from properties p where p.id = property_id and p.host_id = auth.uid())) with check (exists (select 1 from properties p where p.id = property_id and p.host_id = auth.uid()));
create policy if not exists seasonal_pricing_read on seasonal_pricing for select using (true);
create policy if not exists host_seasonal_pricing_write on seasonal_pricing for all using (exists (select 1 from properties p where p.id = property_id and p.host_id = auth.uid())) with check (exists (select 1 from properties p where p.id = property_id and p.host_id = auth.uid()));
create policy if not exists guest_bookings_read on bookings for select using (auth.uid() = guest_id or exists (select 1 from properties p where p.id = property_id and p.host_id = auth.uid()));
create policy if not exists guest_bookings_write on bookings for insert with check (auth.uid() = guest_id);
create policy if not exists reviews_read on reviews for select using (true);
create policy if not exists reviews_write on reviews for insert with check (auth.uid() = reviewer_id);
create policy if not exists messages_participant_read on messages for select using (auth.uid() = sender_id or auth.uid() = receiver_id);
create policy if not exists messages_participant_write on messages for insert with check (auth.uid() = sender_id);
create policy if not exists saved_properties_owner on saved_properties for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
create policy if not exists host_payouts_owner on host_payouts for select using (auth.uid() = host_id);
create policy if not exists long_term_application_owner on long_term_applications for select using (auth.uid() = applicant_id);
create policy if not exists long_term_application_insert on long_term_applications for insert with check (auth.uid() = applicant_id);
