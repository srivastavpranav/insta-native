import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLIC_URL, SUPABASE_PUBLIC_ANON_KEY } from "@env";

export const supabase = createClient(
  SUPABASE_PUBLIC_URL,
  SUPABASE_PUBLIC_ANON_KEY
);
