begin;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('catalog-images', 'catalog-images', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  ('design-results', 'design-results', false, 10485760, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy catalog_images_public_read on storage.objects
for select to anon, authenticated
using (bucket_id = 'catalog-images');

-- Uploads, updates and deletes use the server-side service role only.
-- Design results remain private and are served through short-lived signed URLs.

commit;
