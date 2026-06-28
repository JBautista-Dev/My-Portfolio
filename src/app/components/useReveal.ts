"use client";
import { useEffect, useRef, useState } from "react";

/**
 * IntersectionObserver-based scroll reveal.
 * Includes a mount fallback that reveals immediately if the element is already
 * in the viewport, so nothing can get stuck hidden.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback: already in viewport on mount.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const t = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(t);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return { ref, visible };
}
