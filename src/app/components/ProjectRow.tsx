import Image from "next/image";
import type { Project } from "@/lib/types";

export default function ProjectRow({ project }: { project: Project }) {
  return (
    <article>
      <details className="group">
        <summary className="cursor-pointer list-none rounded-sm py-5 sm:py-6 [&::-webkit-details-marker]:hidden">
          <h3 className="grid grid-cols-[3.5rem_minmax(0,1fr)_2rem] items-center gap-3 sm:grid-cols-[5rem_minmax(0,1fr)_2rem] sm:gap-6">
            <span className="relative block aspect-[10/7] overflow-hidden rounded-md border border-border bg-black">
              <Image
                src={project.logo}
                alt=""
                fill
                sizes="(min-width: 640px) 80px, 56px"
                className={project.contain ? "object-contain p-2" : "object-cover"}
              />
            </span>
            <span>
              <span className="block text-xl leading-tight font-semibold tracking-tight group-hover:text-accent-text sm:text-2xl">
                {project.title}
              </span>
              {project.tags.length > 0 && (
                <span className="mt-1 block font-mono text-xs font-normal text-dim">
                  {project.tags.join(" · ")}
                </span>
              )}
            </span>
            <span aria-hidden="true" className="grid size-8 place-items-center rounded-full border border-border-soft font-mono text-lg text-accent-text group-open:bg-surface-soft">
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">−</span>
            </span>
          </h3>
        </summary>
        <div className="pb-6 sm:pl-[6.5rem]">
          <p className="max-w-3xl leading-relaxed text-muted">{project.description}</p>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} (opens in a new tab)`}
            className="mt-3 inline-block rounded-sm py-1 text-sm font-medium text-accent-text underline underline-offset-4"
          >
            {project.thumb.replace(/^→\s*/, "")}
          </a>
        </div>
      </details>
    </article>
  );
}
