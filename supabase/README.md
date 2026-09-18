# Supabase content setup

All site text lives in Supabase so it can be edited without touching code.
If Supabase is unconfigured, paused, or unreachable, the site falls back to
`src/lib/content-defaults.ts` and renders exactly as it does today.

## Tables

| Table | What it holds |
| --- | --- |
| `site_content` | All one-off text, as `key` → `value` rows. The `label` column explains what each key is. |
| `projects` | The Featured Projects list. Uncheck `published` to hide one. |
| `skills` | About-section pills. `category` is `core` or `working`. |
| `marquee_items` | The scrolling strip under the hero. |
| `nav_links` | Header navigation links. |
| `social_links` | The GitHub / LinkedIn buttons in the Contact card. |

Every table has `sort_order` — lower numbers appear first.

## First-time setup

1. Create a project at [supabase.com](https://supabase.com).
2. Dashboard → Settings → API. Copy the **Project URL** and the **anon public** key.
3. Copy `.env.local.example` to `.env.local` and paste both values in.
4. Dashboard → SQL Editor → New query. Paste `schema.sql`, run it.
5. Same place: paste `seed.sql`, run it. This loads the current site content.
6. `npm run dev` and confirm the site looks unchanged — it is now reading from Supabase.
7. Add the same two env vars in Vercel, then redeploy.

## Editing content

Dashboard → Table Editor → pick a table → edit a cell → save.

Changes appear on the live site within an hour. To see them immediately, call
the revalidate endpoint:

```
curl -X POST "https://bauworks.space/api/revalidate?secret=YOUR_SECRET"
```

`YOUR_SECRET` is the `REVALIDATE_SECRET` env var. You can also wire this to a
Supabase **Database Webhook** (Dashboard → Database → Webhooks) so saving a row
refreshes the site on its own.

## Keeping the free tier awake

Free Supabase projects pause after 7 days with no database activity.
`.github/workflows/supabase-keepalive.yml` runs a tiny read every 3 days.

Add these GitHub repo secrets (Settings → Secrets and variables → Actions):

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

Note: GitHub disables scheduled workflows in repos with no commits for 60 days.
If the repo goes quiet that long, re-enable it from the Actions tab.

## Changing the fallback content

`src/lib/content-defaults.ts` is the in-repo copy. After editing it, run:

```
npm run seed:generate
```

which rewrites `seed.sql` so the two stay in sync.
