import Image from "next/image";
import { getSiteData } from "@/lib/content";

// Next requires a literal here. Keep in sync with CONTENT_REVALIDATE
// in src/lib/supabase.ts.
export const revalidate = 3600;

export default async function AboutPage() {
  const { content } = await getSiteData();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-bg">
      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-10 items-center">
        <div className="flex-1">
          <h1 className="mb-6 font-grotesk text-5xl font-bold tracking-[-0.02em] text-text">
            {content["about.page_heading"]}
          </h1>
          <p className="text-lg leading-relaxed text-muted">
            {content["about.paragraph_1"]}
          </p>
          <p className="mt-5 text-lg leading-relaxed text-dim">
            {content["about.paragraph_2"]}
          </p>
        </div>
        <div className="shrink-0">
          <Image
            className="rounded-2xl border border-border object-cover"
            src={content["about.page_image"]}
            alt={content["about.page_image_alt"]}
            width={400}
            height={320}
          />
        </div>
      </div>
    </div>
  );
}
