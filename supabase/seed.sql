begin;

insert into public.bag_types (slug, name, description, sort_order)
values
  ('handbag', 'شنطة يد', 'حقيبة يد منظمة للاستخدام اليومي والمناسبات.', 1),
  ('tote', 'توت باق', 'حقيبة واسعة وخفيفة للدراسة والعمل.', 2),
  ('pouch', 'باوتش', 'حقيبة صغيرة للتفاصيل الأساسية.', 3)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order,
  is_active = true;

insert into public.materials (slug, name, small_price, large_price, prompt_text, sample_image_path, sort_order)
values
  ('vegan-leather', 'جلد نباتي', 0, 0, 'premium pebbled vegan leather with realistic fine grain', 'materials/vegan-leather.webp', 1),
  ('organic-cotton', 'قطن عضوي', 10, 15, 'natural organic cotton canvas with a refined visible weave', 'materials/organic-cotton.webp', 2),
  ('sadu', 'سدو تراثي', 40, 50, 'authentic Saudi Sadu woven textile with restrained geometric pattern', 'materials/sadu.webp', 3)
on conflict (slug) do update set
  name = excluded.name,
  small_price = excluded.small_price,
  large_price = excluded.large_price,
  prompt_text = excluded.prompt_text,
  sample_image_path = excluded.sample_image_path,
  sort_order = excluded.sort_order,
  is_active = true;

insert into public.colors (slug, name, hex, prompt_text, sort_order)
values
  ('beige', 'بيج', '#D8C4A8', 'warm refined beige', 1),
  ('forest-green', 'أخضر غابات', '#24382F', 'deep forest green', 2),
  ('espresso', 'إسبرسو', '#2A211C', 'deep espresso brown', 3),
  ('chestnut', 'كستنائي', '#8A4F32', 'warm chestnut brown', 4),
  ('ivory', 'عاجي', '#F3EBDD', 'soft warm ivory', 5),
  ('black', 'أسود', '#171513', 'soft rich black', 6)
on conflict (slug) do update set
  name = excluded.name,
  hex = excluded.hex,
  prompt_text = excluded.prompt_text,
  sort_order = excluded.sort_order,
  is_active = true;

insert into public.addons (slug, name, small_price, large_price, sort_order)
values ('name-embroidery', 'تطريز اسم', 20, 25, 1)
on conflict (slug) do update set
  name = excluded.name,
  small_price = excluded.small_price,
  large_price = excluded.large_price,
  sort_order = excluded.sort_order,
  is_active = true;

insert into public.price_limits (size, max_price)
values ('small', 250), ('large', 350)
on conflict (size) do update set max_price = excluded.max_price;

insert into public.base_models (
  bag_type_id, slug, name, size, base_price,
  front_image_path, back_image_path,
  text_x, text_y, text_width, text_height, sort_order
)
values
  ((select id from public.bag_types where slug = 'handbag'), 'handbag-classic-small', 'كلاسيك', 'small', 120, 'base-models/handbag-classic-small/front.webp', 'base-models/handbag-classic-small/back.webp', 0.35, 0.48, 0.30, 0.12, 1),
  ((select id from public.bag_types where slug = 'handbag'), 'handbag-classic-large', 'كلاسيك', 'large', 260, 'base-models/handbag-classic-large/front.webp', 'base-models/handbag-classic-large/back.webp', 0.35, 0.48, 0.30, 0.12, 2),
  ((select id from public.bag_types where slug = 'tote'), 'tote-everyday-small', 'يومي', 'small', 110, 'base-models/tote-everyday-small/front.webp', 'base-models/tote-everyday-small/back.webp', 0.33, 0.52, 0.34, 0.14, 1),
  ((select id from public.bag_types where slug = 'tote'), 'tote-everyday-large', 'يومي', 'large', 250, 'base-models/tote-everyday-large/front.webp', 'base-models/tote-everyday-large/back.webp', 0.33, 0.52, 0.34, 0.14, 2),
  ((select id from public.bag_types where slug = 'pouch'), 'pouch-soft-small', 'ناعم', 'small', 100, 'base-models/pouch-soft-small/front.webp', 'base-models/pouch-soft-small/back.webp', 0.35, 0.50, 0.30, 0.12, 1),
  ((select id from public.bag_types where slug = 'pouch'), 'pouch-soft-large', 'ناعم', 'large', 220, 'base-models/pouch-soft-large/front.webp', 'base-models/pouch-soft-large/back.webp', 0.35, 0.50, 0.30, 0.12, 2)
on conflict (slug) do update set
  name = excluded.name,
  size = excluded.size,
  base_price = excluded.base_price,
  front_image_path = excluded.front_image_path,
  back_image_path = excluded.back_image_path,
  text_x = excluded.text_x,
  text_y = excluded.text_y,
  text_width = excluded.text_width,
  text_height = excluded.text_height,
  sort_order = excluded.sort_order,
  is_active = true;

insert into public.ready_products (
  bag_type_id, slug, name, description, size, price,
  image_paths, stock, is_featured, is_active
)
values
  ((select id from public.bag_types where slug = 'handbag'), 'wadi-green', 'حقيبة وادي', 'حقيبة يد صغيرة بهيكل أنيق، مصنوعة من الجلد النباتي مع قفل ذهبي هادئ.', 'small', 168, array['products/wadi-green.webp'], 8, true, true),
  ((select id from public.bag_types where slug = 'handbag'), 'hudu-black', 'حقيبة هدوء', 'تصميم انسيابي باللون الأسود ولمسات ذهبية، مناسب للعمل والمساء.', 'small', 176, array['products/hudu-black.webp'], 5, true, true),
  ((select id from public.bag_types where slug = 'tote'), 'raml-tote', 'حقيبة رمل', 'توت باق رحبة من القطن العضوي، بحواف ومقابض خضراء داكنة.', 'large', 149, array['products/raml-tote.webp'], 11, true, true),
  ((select id from public.bag_types where slug = 'handbag'), 'najd-chestnut', 'حقيبة نجد', 'حقيبة منظمة بلون كستنائي دافئ وتفاصيل مستوحاة من الحرفة التقليدية.', 'large', 285, array['products/najd-chestnut.webp'], 3, true, true),
  ((select id from public.bag_types where slug = 'pouch'), 'lamsa-pouch', 'باوتش لمسة', 'باوتش صغير بلون رملي وتفصيلة شرابة بسيطة لحمل أساسياتك.', 'small', 128, array['products/lamsa-pouch.webp'], 14, false, true),
  ((select id from public.bag_types where slug = 'handbag'), 'safa-beige', 'حقيبة صفا', 'حقيبة يد بيج بتكوين كلاسيكي وخامة ناعمة تناسب الإطلالات اليومية.', 'small', 159, array['products/safa-beige.webp'], 6, false, true)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  size = excluded.size,
  price = excluded.price,
  image_paths = excluded.image_paths,
  stock = excluded.stock,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active;

commit;
