import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * App Supabase client. Use generated Database types from `supabase gen types`
 * in a later pass; untyped client keeps Phase 0 modular services building cleanly.
 */
export type AppSupabase = SupabaseClient;
