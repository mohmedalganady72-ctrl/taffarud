begin;

alter table public.profiles enable row level security;
alter table public.bag_types enable row level security;
alter table public.base_models enable row level security;
alter table public.materials enable row level security;
alter table public.colors enable row level security;
alter table public.addons enable row level security;
alter table public.price_limits enable row level security;
alter table public.ready_products enable row level security;
alter table public.designs enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.order_status_log enable row level security;

-- Firebase is the identity provider. Browser clients receive read-only access to
-- active catalog data; customer data is accessed through authenticated server APIs.
create policy bag_types_public_read on public.bag_types
for select to anon, authenticated using (is_active);

create policy base_models_public_read on public.base_models
for select to anon, authenticated using (is_active);

create policy materials_public_read on public.materials
for select to anon, authenticated using (is_active);

create policy colors_public_read on public.colors
for select to anon, authenticated using (is_active);

create policy addons_public_read on public.addons
for select to anon, authenticated using (is_active);

create policy price_limits_public_read on public.price_limits
for select to anon, authenticated using (true);

create policy ready_products_public_read on public.ready_products
for select to anon, authenticated using (is_active);

revoke all on table public.profiles from anon, authenticated;
revoke all on table public.designs from anon, authenticated;
revoke all on table public.orders from anon, authenticated;
revoke all on table public.order_items from anon, authenticated;
revoke all on table public.order_status_log from anon, authenticated;

grant usage on schema public to anon, authenticated;
grant select on table public.bag_types to anon, authenticated;
grant select on table public.base_models to anon, authenticated;
grant select on table public.materials to anon, authenticated;
grant select on table public.colors to anon, authenticated;
grant select on table public.addons to anon, authenticated;
grant select on table public.price_limits to anon, authenticated;
grant select on table public.ready_products to anon, authenticated;

commit;
