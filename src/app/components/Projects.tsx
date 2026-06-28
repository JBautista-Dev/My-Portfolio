"use client";
import Image from "next/image";
import SectionMarker from "./SectionMarker";
import { useReveal } from "./useReveal";

type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
  thumb: string;
  logo: string;
  contain?: boolean;
};

const projects: Project[] = [
  {
    title: "Maya",
    description:
      "Ongoing HubSpot CMS maintenance across maya.ph, maya.ph/center, and maya.ph/business — building modules, updating HubDB-driven content, and keeping the marketing, help center, and business sites consistent.",
    tags: ["HubSpot", "HubDB", "HubL"],
    href: "https://www.maya.ph/",
    thumb: "→ maya.ph",
    logo: "/Mayalogo.png",
  },
  {
    title: "Maya Bank",
    description:
      "Maintain and update the Maya Bank website, handling release deployments, page-level improvements, and coordinating fixes across the stack to keep the banking experience reliable.",
    tags: ["WordPress", "PHP", "HubDB"],
    href: "https://www.mayabank.ph/",
    thumb: "→ mayabank.ph",
    logo: "/Maya-Bank-logo.jpg",
  },
  {
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio built with Next.js and Tailwind CSS featuring parallax scrolling and smooth scroll-reveal animations.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "#",
    thumb: "→ portfolio",
    logo: "/logo-block-dark.png",
    contain: true,
  },
];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { ref, visible } = useReveal<HTMLAnchorElement>(index * 100);

  return (
    <a
      ref={ref}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`reveal ${
        visible ? "is-visible" : ""
      } group grid grid-cols-1 items-center gap-6 border-t border-border px-4 py-10 transition-colors hover:bg-[var(--surface-soft)] md:grid-cols-[auto_1fr_320px] md:gap-10`}
    >
      <span className="font-mono text-[13px] text-faint">
        0{index + 1}
      </span>

      <div>
        <div className="flex items-center gap-3">
          <h3
            className="font-grotesk font-semibold leading-tight transition-colors group-hover:text-[var(--accent-text)]"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
          >
            {project.title}
          </h3>
          <span className="inline-block translate-y-0 text-[var(--accent-text)] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
            ↗
          </span>
        </div>
        <p className="mt-3 max-w-xl text-[1.02rem] leading-[1.6] text-muted">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border-soft px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-dim"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border">
        {project.contain && (
          <div className="absolute inset-0 bg-black" />
        )}
        <Image
          src={project.logo}
          alt={`${project.title} logo`}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className={`transition-transform duration-500 group-hover:scale-[1.07] ${
            project.contain ? "object-contain p-8" : "object-cover"
          }`}
        />
        <span className="absolute bottom-3 left-3 font-mono text-[12px] text-muted">
          {project.thumb}
        </span>
        <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[var(--accent-ink)]">
          ↗
        </span>
      </div>
    </a>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-[1240px]">
        <SectionMarker number="02" label="Selected Work" />
        <h2
          className="mb-6 font-grotesk font-bold tracking-[-0.02em]"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
        >
          Featured Projects
        </h2>

        <div className="border-b border-border">
          {projects.map((project, i) => (
            <ProjectRow key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
