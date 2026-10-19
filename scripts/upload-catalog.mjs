import nextEnv from "@next/env";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceRoleKey) {
  throw new Error("Supabase URL or server secret is missing from .env.local");
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const assets = [
  ["products/wadi-green.webp", "public/images/home/category-handbag.png"],
  ["products/hudu-black.webp", "public/images/home/product-black.png"],
  ["products/raml-tote.webp", "public/images/home/category-tote.png"],
  ["products/najd-chestnut.webp", "public/images/home/product-chestnut.png"],
  ["products/lamsa-pouch.webp", "public/images/home/category-pouch.png"],
  ["products/safa-beige.webp", "public/images/home/hero-bag.png"],
  ["materials/materials-editorial.webp", "public/images/home/materials.png"],
];

for (const [storagePath, localPath] of assets) {
  const source = await readFile(resolve(localPath));
  const body = await sharp(source)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();
  const { error } = await supabase.storage
    .from("catalog-images")
    .upload(storagePath, body, { contentType: "image/webp", upsert: true });

  if (error) throw new Error(`Failed to upload ${storagePath}: ${error.message}`);
  console.log(`Uploaded ${storagePath}.`);
}
