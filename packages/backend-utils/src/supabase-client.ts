import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@ultimate-adventure/shared-models';

let client: SupabaseClient<Database> | undefined;

export function getSupabaseClient(): SupabaseClient<Database> {
  if (client) {
    return client;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be set in environment variables');
  }

  client = createClient<Database>(supabaseUrl, supabaseKey);

  return client;
}
