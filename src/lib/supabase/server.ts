import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getSupabaseServerEnv } from "@/lib/env";
import type { Database } from "@/types/database";

export function createSupabaseAdminClient() {
  const { url, serviceRoleKey } = getSupabaseServerEnv();

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
