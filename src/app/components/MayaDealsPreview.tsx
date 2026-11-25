"use client";

import Image from "next/image";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

const views = [
  {
    id: "listing",
    label: "Deals listing",
    alt: "Maya’s deals listing with search, category filters and promotion cards.",
  },
  {
    id: "detail",
    label: "Deal detail",
    alt: "A Maya Personal Loan offer with its expiry date, highlights and eligibility.",
  },
] as const;

type ViewId = (typeof views)[number]["id"];

export default function MayaDealsPreview() {
  const panel = useRef<HTMLFieldSetElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [player, setPlayer] = useState<{ view: ViewId; clip: string } | null>(null);
  const [failed, setFailed] = useState<ViewId | null>(null);

  function showPoster() {
    setPlayer(null);
    setFailed(null);
  }

  useEffect(() => {
    const element = panel.current;
    if (!element) return;
    const smallScreen = window.matchMedia("(max-width: 767px)");
    smallScreen.addEventListener("change", showPoster);
    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) showPoster();
        })
      : null;
    observer?.observe(element);
    return () => {
      observer?.disconnect();
      smallScreen.removeEventListener("change", showPoster);
    };
  }, []);

  function play(view: ViewId) {
    const layout = window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
    // Keep play() within the tap gesture, including on mobile Safari.
    flushSync(() => {
      setFailed(null);
      setPlayer({ view, clip: `/work/maya-deals/${view}-${layout}` });
    });
    const element = video.current;
    if (!element) return;
    element.focus({ preventScroll: true });
    void element.play().catch(() => {
      if (video.current === element) {
        setFailed(view);
        setPlayer(null);
      }
    });
  }

  return (
    <fieldset ref={panel} className="case-preview grid min-w-0 content-center gap-y-4 border-0 p-4 sm:p-8">
      <legend className="sr-only">Maya Deals page previews</legend>
      <div className="case-switch">
        {views.map((view, index) => (
          <label key={view.id}>
            <input className="sr-only" type="radio" name="maya-preview" value={view.id}
              defaultChecked={index === 0} onChange={showPoster} />
            <span>{view.label}</span>
          </label>
        ))}
      </div>
      {views.map((view) => (
        <div key={view.id} data-view={view.id}
          className="case-window relative mx-auto w-full overflow-hidden rounded-lg border border-black/20 bg-black shadow-lg">
          {player?.view === view.id ? (
            <video
              ref={video}
              src={`${player.clip}.mp4`}
              poster={`${player.clip}-poster.webp`}
              aria-label={`Scrolling preview. ${view.alt}`}
              tabIndex={0}
              muted
              playsInline
              loop
              controls
              className="block h-full w-full"
            />
          ) : (
            <>
              <picture>
                <source media="(max-width: 767px)" srcSet={`/work/maya-deals/${view.id}-mobile-poster.webp`} />
                <Image unoptimized src={`/work/maya-deals/${view.id}-desktop-poster.webp`} alt={view.alt}
                  width={2400} height={1470} className="block h-auto w-full" />
              </picture>
              <button type="button" onClick={() => play(view.id)} aria-label={`Play ${view.label} preview`}
                className="case-play absolute inset-0 grid cursor-pointer place-items-center bg-black/15">
                <span className="case-play-glass" aria-hidden="true">
                  <PlayIcon className="size-7 translate-x-px drop-shadow-sm sm:size-8" />
                </span>
              </button>
              {failed === view.id && (
                <p role="alert" className="pointer-events-none absolute inset-x-0 bottom-0 bg-black/80 p-2 text-center text-sm text-white">
                  The preview couldn’t play. Press the play button to retry.
                </p>
              )}
            </>
          )}
        </div>
      ))}
    </fieldset>
  );
}
