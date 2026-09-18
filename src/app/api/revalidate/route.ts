import { revalidateTag, revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Clears the cached Supabase content so an edit shows up immediately instead
 * of waiting out the hourly revalidate window.
 *
 * Call it with the secret from REVALIDATE_SECRET:
 *   curl -X POST "https://bauworks.space/api/revalidate?secret=YOUR_SECRET"
 *
 * Optional: wire it to a Supabase Database Webhook so saving a row in the
 * Table Editor refreshes the live site on its own.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "REVALIDATE_SECRET is not set" },
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  const provided =
    url.searchParams.get("secret") ??
    request.headers.get("x-revalidate-secret") ??
    "";

  if (provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // "max" expires the tag immediately (Next 16 requires a cache profile).
  revalidateTag("content", "max");
  revalidatePath("/");
  revalidatePath("/about");

  return NextResponse.json({ revalidated: true, at: Date.now() });
}
