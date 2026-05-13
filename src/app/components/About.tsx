"use client";
import { useEffect, useRef, useState } from "react";

const skills = [
    "Hubspot CMS",
    "HubDB",
    "HubL",
    "wordPress",
    "PHP",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Git",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-24 px-6 bg-white dark:bg-zinc-950 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-widest text-sm mb-3">
          About Me
        </p>
        <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-10">
          Who I Am
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-5">
              I&apos;m a passionate full-stack developer who loves turning ideas
              into reality through code. I specialize in building web
              applications that are fast, accessible, and delightful to use.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
              When I&apos;m not coding, I enjoy exploring new technologies,
              contributing to open source, and continuously growing as a
              developer.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-5">
              Technologies I Work With
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
