"use client";
import { useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function ParallaxHero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.45}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: "url('/assets/Wallpaper.jpeg')",
          top: "-30%",
          bottom: "-30%",
        }}
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"
      />

      {/* Content — glass card */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 text-center text-white">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl px-8 py-12 md:px-16 shadow-2xl">
          <p className="text-sm font-semibold text-blue-400 mb-4 tracking-widest uppercase">
            Web Developer
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Hi, I&apos;m{" "}
            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Joshua
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            I build modern, performant web applications with clean code and
            great user experiences.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#projects"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-full font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-white/40 hover:border-white hover:bg-white/10 rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-white transition-colors animate-bounce"
      >
        <ChevronDownIcon className="w-7 h-7" />
      </a>
    </section>
  );
}
