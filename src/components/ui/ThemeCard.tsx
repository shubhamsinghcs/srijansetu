"use client";

import { useEffect, useState } from "react";
import type { HackathonTheme } from "@/data/themes";

interface ThemeCardProps {
  theme: HackathonTheme;
}

export default function ThemeCard({ theme }: ThemeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const number = String(theme.order).padStart(2, "0");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  const flipCard = () => setIsFlipped((prev) => !prev);

  return (
    <div className="relative w-full h-[280px] sm:h-[285px] lg:h-[290px] perspective-1000">
      <button
        type="button"
        onClick={flipCard}
        aria-pressed={isFlipped}
        aria-label={`Theme ${number}: ${theme.name}. Click to ${isFlipped ? "flip back to domain title" : "flip and view domain description"}.`}
        className="group relative block w-full h-full text-left rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-spidey-red focus-visible:ring-offset-2 focus-visible:ring-offset-web-black cursor-pointer select-none"
      >
        <div
          className={`relative w-full h-full rounded-xl [will-change:transform] ${
            prefersReducedMotion
              ? "transition-opacity duration-200"
              : "preserve-3d transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
          }`}
          style={{
            transform: prefersReducedMotion
              ? "none"
              : isFlipped
              ? "rotateY(180deg)"
              : "rotateY(0deg)",
          }}
        >
          {/* Front Face */}
          <div
            aria-hidden={isFlipped}
            className={`absolute inset-0 flex h-full w-full flex-col justify-between rounded-xl border border-white/10 bg-[#0C0D14] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-colors duration-300 group-hover:border-spidey-red/50 ${
              prefersReducedMotion
                ? isFlipped
                  ? "pointer-events-none opacity-0"
                  : "opacity-100"
                : "backface-hidden rotate-y-0"
            } ${isFlipped && !prefersReducedMotion ? "pointer-events-none" : ""}`}
          >
            {/* Top row: Number & Domain tag */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-3xl sm:text-4xl font-black tracking-tight text-spidey-red">
                {number}
              </span>
              <span className="text-[11px] font-mono tracking-widest uppercase text-white/35">
                DOMAIN // {number}
              </span>
            </div>

            {/* Middle: Theme Title */}
            <div className="my-auto py-2">
              <h3 className="font-body text-xl sm:text-[22px] font-bold text-white tracking-tight leading-snug">
                {theme.name}
              </h3>
            </div>

            {/* Bottom: Subtle interaction indicator */}
            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-white/45 group-hover:text-spidey-red transition-colors duration-300">
              <span className="text-[11px] font-semibold tracking-widest uppercase font-accent">
                VIEW DOMAIN
              </span>
              <span
                aria-hidden="true"
                className="text-sm font-bold transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </div>
          </div>

          {/* Back Face */}
          <div
            aria-hidden={!isFlipped}
            className={`absolute inset-0 flex h-full w-full flex-col justify-between rounded-xl border border-spidey-red/45 bg-[#120B0F] p-6 shadow-[0_12px_32px_rgba(230,36,41,0.14)] transition-colors duration-300 group-hover:border-spidey-red/70 ${
              prefersReducedMotion
                ? isFlipped
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
                : "backface-hidden rotate-y-180"
            } ${!isFlipped && !prefersReducedMotion ? "pointer-events-none" : ""}`}
          >
            {/* Content: Header, Title, Description */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xl font-bold tracking-tight text-spidey-red">
                    {number}
                  </span>
                  <span className="text-white/30 text-xs">—</span>
                  <span className="text-[11px] font-mono tracking-wider uppercase text-white/40">
                    OVERVIEW
                  </span>
                </div>
                <span className="text-[11px] font-mono tracking-wider uppercase text-white/35 group-hover:text-white/70 transition-colors">
                  FLIP ↺
                </span>
              </div>

              {/* Theme title */}
              <h4 className="font-body text-base sm:text-lg font-bold text-white tracking-tight leading-snug mb-2.5">
                {theme.name}
              </h4>

              {/* Theme description */}
              <p className="font-body text-body-sm sm:text-[15px] leading-relaxed text-white/80 font-normal">
                {theme.description}
              </p>
            </div>

            {/* Bottom: Return indicator */}
            <div className="pt-3 border-t border-spidey-red/20 flex items-center justify-between text-white/45 group-hover:text-spidey-red transition-colors duration-300">
              <span className="text-[11px] font-semibold tracking-widest uppercase font-accent">
                BACK TO DOMAIN
              </span>
              <span
                aria-hidden="true"
                className="text-sm font-bold transition-transform duration-300 group-hover:-translate-x-1"
              >
                &larr;
              </span>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
