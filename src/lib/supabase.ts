import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** How long Next.js may serve cached Supabase responses, in seconds. */
export const CONTENT_REVALIDATE = 3600;

/**
 * Shared Supabase client.
 *
 * Returns null when the env vars are missing, so the site still builds and
 * renders from the local fallback content in content-defaults.ts.
 *
 * The custom fetch tags every request for Next's ISR cache — without it the
 * queries are treated as uncacheable and force the pages to render on every
 * request instead of being served as static HTML.
 */
export const supabase =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: { persistSession: false },
        global: {
          fetch: (input, init) =>
            fetch(input, {
              ...init,
              next: { revalidate: CONTENT_REVALIDATE, tags: ["content"] },
            } as RequestInit),
        },
      })
    : null;
