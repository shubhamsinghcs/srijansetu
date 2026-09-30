"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { PrizeItem } from "@/data/prizes";

interface PrizeCardProps {
  prize: PrizeItem;
}

export default function PrizeCard({ prize }: PrizeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const isWinner = prize.place === "Winner";
  const isAI = prize.place === "Best Use of AI";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  const flipCard = () => setIsFlipped((prev) => !prev);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const renderIcon = () => {
    if (isAI) {
      return (
        <svg
          className="w-7 h-7 sm:w-9 sm:h-9 text-cyan-400"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z" />
        </svg>
      );
    }

    const trophyColor = isWinner
      ? "text-yellow-400"
      : prize.place === "Runner Up" || prize.place === "1st Runner Up"
      ? "text-slate-300"
      : "text-amber-500";

    return (
      <svg
        className={`w-7 h-7 sm:w-9 sm:h-9 ${trophyColor}`}
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
      </svg>
    );
  };

  const renderBadge = () => {
    if (isWinner) {
      return <span className="mb-2.5 pill-badge pill-badge-red">{prize.place}</span>;
    }
    if (isAI) {
      return <span className="mb-2.5 pill-badge pill-badge-blue">{prize.place}</span>;
    }
    return <span className="mb-2.5 pill-badge pill-badge-neutral">{prize.place}</span>;
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.015 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`relative w-full h-[420px] sm:h-[430px] lg:h-[440px] perspective-1000 ${
        isWinner ? "lg:-translate-y-2" : ""
      }`}
    >
      <button
        type="button"
        onClick={flipCard}
        aria-pressed={isFlipped}
        aria-label={`${prize.place}: ${prize.label}. Click to ${
          isFlipped ? "flip back" : "flip and view perks and rewards"
        }.`}
        className="group relative block w-full h-full text-left rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-spidey-red focus-visible:ring-offset-2 focus-visible:ring-offset-web-black cursor-pointer select-none"
      >
        <div
          className={`relative w-full h-full rounded-2xl [will-change:transform] ${
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
          {/* ================= FRONT FACE ================= */}
          <div
            aria-hidden={isFlipped}
            className={`absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border p-5 sm:p-6 text-center transition-all duration-300 ${
              isWinner
                ? "border-spidey-red bg-[#0F0A0E] shadow-[0_0_35px_rgba(227,38,54,0.4)]"
                : isAI
                ? "border-spidey-blue/45 bg-[#090E17] shadow-[0_0_25px_rgba(29,78,216,0.2)] hover:border-cyan-400/60"
                : "border-white/10 bg-[#0C0D14] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:border-spidey-red/50"
            } ${
              prefersReducedMotion
                ? isFlipped
                  ? "pointer-events-none opacity-0"
                  : "opacity-100"
                : "backface-hidden rotate-y-0"
            } ${isFlipped && !prefersReducedMotion ? "pointer-events-none" : ""}`}
          >
            {/* Interactive Spotlight Cursor Glow */}
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: isAI
                  ? "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(56, 189, 248, 0.16), transparent 75%)"
                  : "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(230, 36, 41, 0.15), transparent 75%)",
              }}
              aria-hidden="true"
            />

            {/* Top & Core Info */}
            <div className="relative z-10 flex flex-col items-center flex-1 justify-center">
              {/* Icon Container */}
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                  isWinner
                    ? "bg-spidey-red/20 border-2 border-spidey-red shadow-[0_0_20px_rgba(227,38,54,0.6)]"
                    : isAI
                    ? "bg-blue-500/15 border border-cyan-400/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                    : "bg-white/5 border border-white/15"
                }`}
              >
                {renderIcon()}
              </div>

              {/* Place Badge */}
              {renderBadge()}

              {/* Label */}
              <h3 className="text-base sm:text-lg font-bold text-web-white line-clamp-2 px-1">
                {prize.label}
              </h3>

              {/* Amount */}
              <div
                className={`font-accent font-black tracking-wider my-3 ${
                  isWinner
                    ? "text-xl sm:text-2xl lg:text-3xl text-spidey-red drop-shadow-[0_2px_15px_rgba(227,38,54,0.5)]"
                    : isAI
                    ? "text-lg sm:text-xl lg:text-2xl text-cyan-300 drop-shadow-[0_2px_12px_rgba(56,189,248,0.3)]"
                    : "text-lg sm:text-xl lg:text-2xl text-web-white"
                }`}
              >
                {prize.amount}
              </div>

              {/* Subtitle */}
              <p className="font-body text-[11px] sm:text-xs text-web-gray uppercase tracking-wider font-normal">
                Cash Prize + Goodies & Perks
              </p>
            </div>

            {/* Bottom Action Hint */}
            <div className="relative z-10 pt-3 border-t border-white/[0.08] flex items-center justify-between text-white/50 group-hover:text-spidey-red transition-colors duration-300">
              <span className="text-[11px] sm:text-xs font-medium tracking-wide">
                Click to view perks
              </span>
              <span className="text-sm font-bold">→</span>
            </div>
          </div>

          {/* ================= BACK FACE ================= */}
          <div
            aria-hidden={!isFlipped}
            className={`absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border p-5 sm:p-6 text-left transition-all duration-300 ${
              isWinner
                ? "border-spidey-red/70 bg-[#120B0F] shadow-[0_12px_32px_rgba(230,36,41,0.25)]"
                : isAI
                ? "border-cyan-400/60 bg-[#09111E] shadow-[0_12px_32px_rgba(56,189,248,0.2)]"
                : "border-spidey-red/45 bg-[#0D0B12] shadow-[0_8px_28px_rgba(0,0,0,0.4)]"
            } ${
              prefersReducedMotion
                ? isFlipped
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
                : "backface-hidden rotate-y-180"
            } ${!isFlipped && !prefersReducedMotion ? "pointer-events-none" : ""}`}
          >
            {/* Interactive Spotlight Cursor Glow */}
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: isAI
                  ? "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(56, 189, 248, 0.18), transparent 75%)"
                  : "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(230, 36, 41, 0.18), transparent 75%)",
              }}
              aria-hidden="true"
            />

            {/* Back Content with Orchestrated Reveal */}
            <motion.div
              initial={false}
              animate={isFlipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: isFlipped ? 0.15 : 0, ease: "easeOut" }}
              className="relative z-10 flex flex-col flex-1"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`text-xs font-mono font-bold uppercase tracking-wider ${
                    isWinner
                      ? "text-spidey-red"
                      : isAI
                      ? "text-cyan-400"
                      : "text-white/80"
                  }`}
                >
                  {prize.place} Perks
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/10">
                  Exclusive
                </span>
              </div>

              {/* Highlight Perk Box (Pro tier / Scale tier) */}
              {prize.highlightPerk && (
                <div
                  className={`mb-3 p-2.5 rounded-lg border leading-snug text-xs ${
                    isWinner
                      ? "bg-spidey-red/10 border-spidey-red/35 text-white/95"
                      : "bg-cyan-500/10 border-cyan-400/35 text-cyan-50"
                  }`}
                >
                  <div className="flex items-start gap-1.5">
                    <span className="text-yellow-400 text-xs shrink-0 mt-0.5">★</span>
                    <span className="font-medium text-[11px] sm:text-xs">
                      {prize.highlightPerk}
                    </span>
                  </div>
                </div>
              )}

              {/* Perks List */}
              <div className="space-y-2 flex-1 my-auto py-1">
                {prize.perks.map((perk, idx) => {
                  const isHoodie = perk.toLowerCase().includes("hoodie");
                  return (
                    <div
                      key={idx}
                      className={`flex items-start gap-2 text-xs sm:text-[13px] leading-snug ${
                        isHoodie
                          ? "text-white font-medium bg-white/[0.04] p-1.5 rounded-md border border-white/[0.08]"
                          : "text-white/80"
                      }`}
                    >
                      <svg
                        className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          isHoodie
                            ? "text-spidey-red"
                            : isAI
                            ? "text-cyan-400"
                            : "text-spidey-red/80"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{perk}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bottom Return Hint */}
            <div className="relative z-10 pt-3 border-t border-white/[0.08] flex items-center justify-between text-white/50 group-hover:text-spidey-red transition-colors duration-300">
              <span className="text-[11px] sm:text-xs font-medium tracking-wide">
                ← Click to flip back
              </span>
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
