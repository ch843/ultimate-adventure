import { createBrowserClient } from '@supabase/ssr';
import {Database} from "../definitions/generatedDefinitions.ts";
import {SupabaseClient} from "@supabase/supabase-js";
import invariant from 'tiny-invariant';


let client: ReturnType<typeof createBrowserClient<Database>> | undefined;

export function getClient(): SupabaseClient {
    if (client) {
        return client;
    }

    invariant(import.meta.env.VITE_SUPA_API_URL, `Supabase URL was not provided`);
    invariant(import.meta.env.VITE_SUPA_API_KEY, `Supabase Anon key was not provided`);

    client = createBrowserClient<Database>(
        import.meta.env.VITE_SUPA_API_URL,
        import.meta.env.VITE_SUPA_API_KEY
    );

    return client;
}