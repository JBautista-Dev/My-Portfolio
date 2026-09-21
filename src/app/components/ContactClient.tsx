"use client";
import { useState } from "react";
import SectionMarker from "./SectionMarker";
import { useReveal } from "./useReveal";
import type { LinkItem } from "@/lib/types";

type Status = "idle" | "sending" | "success" | "error";

// Form wiring, not editable content. These are tied to the markup and the
// Formspree account, so they live here instead of in site_content.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqvyjoy";

const FORM = {
  labelName: "Name",
  labelEmail: "Email",
  labelMessage: "Message",
  submit: "Send Message →",
  sending: "Sending…",
  successTitle: "Thanks! Your message is on its way.",
  successBody: "I'll get back to you as soon as I can.",
  error: "Something went wrong. Please try again or email me directly.",
} as const;

export default function ContactClient({
  socialLinks,
}: {
  socialLinks: LinkItem[];
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-[1240px]">
        <SectionMarker
          number="03"
          label="Contact"
        />

        <div
          ref={ref}
          className={`reveal ${
            visible ? "is-visible" : ""
          } rounded-2xl border border-border-soft bg-[var(--surface)] px-6 py-16 md:px-16`}
        >
          <div className="text-center">
            <h2
              className="font-grotesk font-bold tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              Let&apos;s Work{" "}
              <span className="text-[var(--accent-text)]">
                Together
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[1.1rem] leading-[1.6] text-muted">
              Have a project in mind or want to chat? Fill out the form below —
              I&apos;m always open to new opportunities and collaborations.
            </p>
          </div>

          {status === "success" ? (
            <div className="mx-auto mt-10 max-w-xl rounded-md border border-border-strong bg-[var(--surface)] px-6 py-8 text-center">
              <p className="font-grotesk text-lg font-bold text-[var(--accent-text)]">
                {FORM.successTitle}
              </p>
              <p className="mt-2 text-sm text-muted">
                {FORM.successBody}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-10 flex max-w-xl flex-col gap-5 text-left"
            >
              {/* Honeypot: hidden from humans, bots fill it -> Formspree drops it */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted"
                >
                  {FORM.labelName}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="rounded-md border border-border-strong bg-transparent px-4 py-3 text-[15px] outline-none transition-colors focus:border-[var(--accent-text)]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted"
                >
                  {FORM.labelEmail}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="rounded-md border border-border-strong bg-transparent px-4 py-3 text-[15px] outline-none transition-colors focus:border-[var(--accent-text)]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted"
                >
                  {FORM.labelMessage}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="resize-y rounded-md border border-border-strong bg-transparent px-4 py-3 text-[15px] outline-none transition-colors focus:border-[var(--accent-text)]"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-2 rounded-md bg-accent px-7 py-3.5 font-mono text-[13px] uppercase tracking-[0.1em] text-[var(--accent-ink)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending"
                  ? FORM.sending
                  : FORM.submit}
              </button>

              {status === "error" && (
                <p className="text-center text-sm text-red-500">
                  {FORM.error}
                </p>
              )}
            </form>
          )}

          <div className="mt-12 flex justify-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border-strong px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] text-muted transition-colors hover:border-[var(--accent-text)] hover:text-[var(--accent-text)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
