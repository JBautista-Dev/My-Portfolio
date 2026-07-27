import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-bg">
      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-10 items-center">
        <div className="flex-1">
          <h1 className="mb-6 font-grotesk text-5xl font-bold tracking-[-0.02em] text-text">
            Hello! I&apos;m Joshua
          </h1>
          <p className="text-lg leading-relaxed text-muted">
            I&apos;m a web developer specializing in HubSpot CMS and WordPress. I
            build and maintain sites for Maya&apos;s business units — working with
            HubL modules, HubDB schema design, and editor-friendly page templates
            that let content teams manage their own pages without touching code.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-dim">
            I&apos;m strongest on the CMS and front-end side (HTML, CSS,
            JavaScript), and I&apos;m actively expanding into React, Next.js, and
            TypeScript through personal projects — including this portfolio, which
            I built with Next.js and Tailwind. I care about clean, maintainable
            code and building things that are genuinely easy to use.
          </p>
        </div>
        <div className="shrink-0">
          <Image
            className="rounded-2xl border border-border object-cover"
            src="/assets/wall.jpg"
            alt="About Joshua"
            width={400}
            height={320}
          />
        </div>
      </div>
    </div>
  );
}
