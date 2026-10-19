import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const STORAGE_BUCKETS = {
  catalog: "catalog-images",
  designs: "design-results",
} as const;

export function getCatalogImageUrl(path: string) {
  const supabase = createSupabaseAdminClient();
  return supabase.storage.from(STORAGE_BUCKETS.catalog).getPublicUrl(path).data.publicUrl;
}

export async function createDesignImageUrl(path: string, expiresIn = 60 * 10) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKETS.designs)
    .createSignedUrl(path, expiresIn);

  if (error) throw error;
  return data.signedUrl;
}
