"use client";
import { useEffect, useRef, useState } from "react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
};

const projects: Project[] = [
  {
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio built with Next.js and Tailwind CSS featuring parallax scrolling and smooth scroll-reveal animations.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "#",
  },
  {
    title: "Maya",
    description:
      "Ongoing HubSpot CMS maintenance across maya.ph, maya.ph/center, and maya.ph/business — building modules, updating HubDB-driven content, and keeping the marketing, help center, and business sites consistent.",
    tags: ["HubSpot", "HubDB", "HubL"],
    href: "https://www.maya.ph/",
  },
  {
    title: "Maya Bank",
    description:
      "Maintain and update the Maya Bank website, handling release deployments, page-level improvements, and coordinating fixes across the stack to keep the banking experience reliable.",
    tags: ["WordPress", "PHP", "HubDB"],
    href: "https://www.mayabank.ph/",
  },
];

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <a
      ref={cardRef}
      href={project.href}
      className={`group block p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-zinc-100 dark:border-zinc-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transition: "opacity 0.6s ease-out, transform 0.6s ease-out, box-shadow 0.2s, border-color 0.2s" }}
    >
      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 mb-4 flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-blue-600 transition-colors duration-200">
        <svg
          className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
        {project.title}
      </h3>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function Projects() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-24 px-6 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-5xl mx-auto">
        <div
          ref={headingRef}
          className={`mb-12 transition-all duration-700 ease-out ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-widest text-sm mb-3">
            Work
          </p>
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-white">
            Featured Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
