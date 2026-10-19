begin;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id text primary key,
  full_name text not null check (char_length(full_name) between 2 and 100),
  phone text check (phone is null or char_length(phone) between 8 and 20),
  city text check (city is null or char_length(city) <= 100),
  address text check (address is null or char_length(address) <= 500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.bag_types (
  id bigint generated always as identity primary key,
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  name text not null unique,
  description text,
  is_active boolean not null default true,
  sort_order smallint not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.base_models (
  id bigint generated always as identity primary key,
  bag_type_id bigint not null references public.bag_types(id) on delete restrict,
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  name text not null,
  size text not null check (size in ('small', 'large')),
  base_price numeric(10, 2) not null check (base_price >= 0),
  front_image_path text not null,
  back_image_path text not null,
  text_x numeric(6, 5) not null default 0.35 check (text_x between 0 and 1),
  text_y numeric(6, 5) not null default 0.45 check (text_y between 0 and 1),
  text_width numeric(6, 5) not null default 0.30 check (text_width > 0 and text_width <= 1),
  text_height numeric(6, 5) not null default 0.12 check (text_height > 0 and text_height <= 1),
  is_active boolean not null default true,
  sort_order smallint not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (bag_type_id, name, size)
);

create table public.materials (
  id bigint generated always as identity primary key,
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  name text not null unique,
  small_price numeric(10, 2) not null default 0 check (small_price >= 0),
  large_price numeric(10, 2) not null default 0 check (large_price >= 0),
  prompt_text text not null check (char_length(prompt_text) <= 500),
  sample_image_path text,
  is_active boolean not null default true,
  sort_order smallint not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.colors (
  id bigint generated always as identity primary key,
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  name text not null unique,
  hex text not null check (hex ~ '^#[0-9A-Fa-f]{6}$'),
  prompt_text text not null check (char_length(prompt_text) <= 300),
  sample_image_path text,
  is_active boolean not null default true,
  sort_order smallint not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.addons (
  id bigint generated always as identity primary key,
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  name text not null unique,
  small_price numeric(10, 2) not null default 0 check (small_price >= 0),
  large_price numeric(10, 2) not null default 0 check (large_price >= 0),
  is_active boolean not null default true,
  sort_order smallint not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.price_limits (
  size text primary key check (size in ('small', 'large')),
  max_price numeric(10, 2) not null check (max_price > 0),
  updated_at timestamptz not null default now()
);

create table public.ready_products (
  id bigint generated always as identity primary key,
  bag_type_id bigint not null references public.bag_types(id) on delete restrict,
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  name text not null,
  description text check (description is null or char_length(description) <= 2000),
  size text not null check (size in ('small', 'large')),
  price numeric(10, 2) not null check (price >= 0),
  image_paths text[] not null default '{}',
  stock integer not null default 0 check (stock >= 0),
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.designs (
  id bigint generated always as identity primary key,
  user_id text not null references public.profiles(id) on delete cascade,
  base_model_id bigint not null references public.base_models(id) on delete restrict,
  material_id bigint not null references public.materials(id) on delete restrict,
  color_id bigint not null references public.colors(id) on delete restrict,
  addon_id bigint references public.addons(id) on delete restrict,
  embroidery_text text check (embroidery_text is null or char_length(embroidery_text) between 1 and 30),
  embroidery_font text check (embroidery_font is null or embroidery_font in ('cairo', 'tajawal')),
  customer_note text check (customer_note is null or char_length(customer_note) <= 300),
  prompt text not null,
  generated_image_path text,
  price numeric(10, 2) not null check (price >= 0),
  attempts smallint not null default 0 check (attempts between 0 and 3),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id bigint generated always as identity primary key,
  user_id text not null references public.profiles(id) on delete restrict,
  kind text not null check (kind in ('ready', 'custom')),
  design_id bigint references public.designs(id) on delete restrict,
  total numeric(10, 2) not null check (total >= 0),
  status text not null default 'pending_payment' check (
    status in ('pending_payment', 'paid', 'accepted', 'manufacturing', 'shipped', 'delivered', 'rejected', 'refunded')
  ),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'refunded')),
  payment_last4 text check (payment_last4 is null or payment_last4 ~ '^[0-9]{4}$'),
  shipping_address jsonb not null check (
    jsonb_typeof(shipping_address) = 'object'
    and shipping_address ? 'full_name'
    and shipping_address ? 'phone'
    and shipping_address ? 'city'
    and shipping_address ? 'address'
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((kind = 'custom' and design_id is not null) or (kind = 'ready' and design_id is null))
);

create table public.order_items (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.orders(id) on delete cascade,
  ready_product_id bigint not null references public.ready_products(id) on delete restrict,
  quantity integer not null check (quantity > 0 and quantity <= 20),
  unit_price numeric(10, 2) not null check (unit_price >= 0),
  created_at timestamptz not null default now(),
  unique (order_id, ready_product_id)
);

create table public.order_status_log (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.orders(id) on delete cascade,
  status text not null check (
    status in ('pending_payment', 'paid', 'accepted', 'manufacturing', 'shipped', 'delivered', 'rejected', 'refunded')
  ),
  note text check (note is null or char_length(note) <= 1000),
  changed_by text,
  created_at timestamptz not null default now()
);

create index base_models_bag_type_id_idx on public.base_models (bag_type_id);
create index base_models_active_type_size_idx on public.base_models (bag_type_id, size, sort_order) where is_active;
create index ready_products_bag_type_id_idx on public.ready_products (bag_type_id);
create index ready_products_active_filters_idx on public.ready_products (bag_type_id, size, price) where is_active;
create index ready_products_featured_idx on public.ready_products (created_at desc) where is_active and is_featured;
create index designs_user_id_created_at_idx on public.designs (user_id, created_at desc);
create index designs_base_model_id_idx on public.designs (base_model_id);
create index designs_material_id_idx on public.designs (material_id);
create index designs_color_id_idx on public.designs (color_id);
create index designs_addon_id_idx on public.designs (addon_id) where addon_id is not null;
create index orders_user_id_created_at_idx on public.orders (user_id, created_at desc);
create index orders_status_created_at_idx on public.orders (status, created_at desc);
create unique index orders_design_id_unique_idx on public.orders (design_id) where design_id is not null;
create index order_items_order_id_idx on public.order_items (order_id);
create index order_items_ready_product_id_idx on public.order_items (ready_product_id);
create index order_status_log_order_id_created_at_idx on public.order_status_log (order_id, created_at);

create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
create trigger bag_types_set_updated_at before update on public.bag_types
for each row execute function public.set_updated_at();
create trigger base_models_set_updated_at before update on public.base_models
for each row execute function public.set_updated_at();
create trigger materials_set_updated_at before update on public.materials
for each row execute function public.set_updated_at();
create trigger colors_set_updated_at before update on public.colors
for each row execute function public.set_updated_at();
create trigger addons_set_updated_at before update on public.addons
for each row execute function public.set_updated_at();
create trigger price_limits_set_updated_at before update on public.price_limits
for each row execute function public.set_updated_at();
create trigger ready_products_set_updated_at before update on public.ready_products
for each row execute function public.set_updated_at();
create trigger designs_set_updated_at before update on public.designs
for each row execute function public.set_updated_at();
create trigger orders_set_updated_at before update on public.orders
for each row execute function public.set_updated_at();

commit;
