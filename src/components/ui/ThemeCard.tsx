"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    <motion.div
      whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
      className="relative w-full h-[280px] sm:h-[285px] lg:h-[290px] perspective-1000"
    >
      <button
        type="button"
        onClick={flipCard}
        aria-pressed={isFlipped}
        aria-label={`Theme ${number}: ${theme.name}. Click to ${isFlipped ? "flip back" : "flip and view details"}.`}
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
            {/* Top: Number */}
            <div>
              <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-spidey-red">
                {number}
              </span>
            </div>

            {/* Middle: Theme Title */}
            <div className="my-auto py-2">
              <h3 className="font-body text-xl sm:text-[22px] font-bold text-white tracking-tight leading-snug">
                {theme.name}
              </h3>
            </div>

            {/* Bottom: Action hint */}
            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-white/45 group-hover:text-spidey-red transition-colors duration-300">
              <span className="text-xs font-medium tracking-wide">
                Click to view details
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
            {/* Top & Content */}
            <div>
              <div className="mb-3">
                <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-spidey-red">
                  {number}
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

            {/* Bottom: Return hint */}
            <div className="pt-3 border-t border-spidey-red/20 flex items-center justify-between text-white/45 group-hover:text-spidey-red transition-colors duration-300">
              <span className="text-xs font-medium tracking-wide">
                Click to flip back
              </span>
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
