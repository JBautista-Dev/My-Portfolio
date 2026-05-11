"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const closeMenu = () => setIsOpen(false);

  const iconClass = `w-6 h-6 transition-colors ${
    isScrolled ? "text-zinc-700 dark:text-zinc-300" : "text-white"
  }`;

  return (
    <header
      className={`w-full top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "fixed bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-sm border-b border-zinc-100 dark:border-zinc-800"
          : "absolute bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-4">
        <a href="#home" className="flex items-center">
          <Image
            src={!isScrolled || isDark ? "/assets/Logo - Darkmode.png" : "/assets/Logo - LIghtmode.png"}
            alt="Joshua logo"
            width={120}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}

          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={toggleDark}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={`p-2 rounded-full transition-colors ${
              isScrolled
                ? "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                : "hover:bg-white/10"
            }`}
          >
            {isDark ? (
              <SunIcon className={iconClass} />
            ) : (
              <MoonIcon className={iconClass} />
            )}
          </button>
        </nav>

        {/* Mobile right controls */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={toggleDark}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-1 rounded-full"
          >
            {isDark ? (
              <SunIcon className={iconClass} />
            ) : (
              <MoonIcon className={iconClass} />
            )}
          </button>

          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="p-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <XMarkIcon className={iconClass} />
            ) : (
              <Bars3Icon className={iconClass} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 px-6 py-4 flex flex-col gap-4"
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={closeMenu}
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
