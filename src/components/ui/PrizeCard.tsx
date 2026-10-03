"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { PrizeItem, PrizeRank } from "@/data/prizes";

interface PrizeCardProps {
  prize: PrizeItem;
  variant?: "podium" | "horizontal";
  isWinnerElevated?: boolean;
  className?: string;
}

interface RankStyleConfig {
  name: string;
  headlineColor: string;
  badgeClasses: string;
  iconBorder: string;
  iconColor: string;
  cardBorderFront: string;
  cardBorderBack: string;
  pulseDotColor: string;
  spotlightRgba: string;
  checkColor: string;
  highlightBox: string;
  headerTextColor: string;
}

const rankStyles: Record<PrizeRank, RankStyleConfig> = {
  first: {
    name: "1ST PLACE",
    headlineColor: "text-amber-300",
    badgeClasses: "bg-amber-500/20 border-amber-400/50 text-amber-300",
    iconBorder: "bg-amber-500/20 border-2 border-amber-400 shadow-[0_0_24px_rgba(245,158,11,0.55)]",
    iconColor: "text-amber-300",
    cardBorderFront: "border-amber-400/60 bg-[#120E07] shadow-[0_0_35px_rgba(245,158,11,0.3)] hover:border-amber-400",
    cardBorderBack: "border-amber-400/70 bg-[#161108] shadow-[0_12px_32px_rgba(245,158,11,0.25)]",
    pulseDotColor: "bg-amber-400",
    spotlightRgba: "rgba(245, 158, 11, 0.16)",
    checkColor: "text-amber-400",
    highlightBox: "bg-amber-500/10 border-amber-400/35 text-amber-100",
    headerTextColor: "text-amber-300",
  },
  second: {
    name: "2ND PLACE",
    headlineColor: "text-slate-200",
    badgeClasses: "bg-slate-300/15 border-slate-300/40 text-slate-200",
    iconBorder: "bg-slate-400/15 border-2 border-slate-300 shadow-[0_0_18px_rgba(203,213,225,0.25)]",
    iconColor: "text-slate-200",
    cardBorderFront: "border-slate-300/45 bg-[#0D1016] shadow-[0_0_25px_rgba(203,213,225,0.18)] hover:border-slate-200/80",
    cardBorderBack: "border-slate-300/55 bg-[#11141D] shadow-[0_12px_32px_rgba(203,213,225,0.18)]",
    pulseDotColor: "bg-slate-300",
    spotlightRgba: "rgba(203, 213, 225, 0.14)",
    checkColor: "text-slate-300",
    highlightBox: "bg-slate-400/10 border-slate-300/30 text-slate-100",
    headerTextColor: "text-slate-200",
  },
  third: {
    name: "3RD PLACE",
    headlineColor: "text-[#F5B07A]",
    badgeClasses: "bg-[#CD7F32]/20 border-[#CD7F32]/45 text-[#F5B07A]",
    iconBorder: "bg-[#CD7F32]/20 border-2 border-[#CD7F32] shadow-[0_0_18px_rgba(184,115,51,0.28)]",
    iconColor: "text-[#F5B07A]",
    cardBorderFront: "border-[#CD7F32]/50 bg-[#120B07] shadow-[0_0_25px_rgba(184,115,51,0.2)] hover:border-[#E08D47]/80",
    cardBorderBack: "border-[#CD7F32]/60 bg-[#170E08] shadow-[0_12px_32px_rgba(184,115,51,0.2)]",
    pulseDotColor: "bg-[#CD7F32]",
    spotlightRgba: "rgba(184, 115, 51, 0.15)",
    checkColor: "text-[#E08D47]",
    highlightBox: "bg-amber-900/15 border-[#CD7F32]/35 text-[#FAD7BD]",
    headerTextColor: "text-[#F5B07A]",
  },
  special: {
    name: "SPECIAL AWARD",
    headlineColor: "text-cyan-300",
    badgeClasses: "bg-cyan-500/15 border-cyan-400/40 text-cyan-300",
    iconBorder: "bg-cyan-500/15 border-2 border-cyan-400 shadow-[0_0_22px_rgba(6,182,212,0.35)]",
    iconColor: "text-cyan-300",
    cardBorderFront: "border-cyan-500/45 bg-[#07111D] shadow-[0_0_30px_rgba(6,182,212,0.22)] hover:border-cyan-400/70",
    cardBorderBack: "border-cyan-400/60 bg-[#0A1626] shadow-[0_12px_32px_rgba(6,182,212,0.2)]",
    pulseDotColor: "bg-cyan-400",
    spotlightRgba: "rgba(6, 182, 212, 0.18)",
    checkColor: "text-cyan-400",
    highlightBox: "bg-cyan-500/10 border-cyan-400/40 text-cyan-100",
    headerTextColor: "text-cyan-300",
  },
  "special-edtech": {
    name: "EDTECH TRACK",
    headlineColor: "text-emerald-300",
    badgeClasses: "bg-emerald-500/15 border-emerald-400/40 text-emerald-300",
    iconBorder: "bg-emerald-500/15 border-2 border-emerald-400 shadow-[0_0_22px_rgba(16,185,129,0.35)]",
    iconColor: "text-emerald-300",
    cardBorderFront: "border-emerald-500/45 bg-[#07130F] shadow-[0_0_30px_rgba(16,185,129,0.22)] hover:border-emerald-400/70",
    cardBorderBack: "border-emerald-400/60 bg-[#091A14] shadow-[0_12px_32px_rgba(16,185,129,0.2)]",
    pulseDotColor: "bg-emerald-400",
    spotlightRgba: "rgba(16, 185, 129, 0.18)",
    checkColor: "text-emerald-400",
    highlightBox: "bg-emerald-500/10 border-emerald-400/40 text-emerald-100",
    headerTextColor: "text-emerald-300",
  },
};

export default function PrizeCard({
  prize,
  variant = "podium",
  isWinnerElevated = false,
  className = "",
}: PrizeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const config = rankStyles[prize.rank] || rankStyles.third;
  const isHorizontal = variant === "horizontal";

  useEffect(() => {
    // Detect touch-only devices without pointer hover capability
    const hoverMql = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsTouchDevice(!hoverMql.matches);

    const updateTouch = (e: MediaQueryListEvent) => setIsTouchDevice(!e.matches);
    hoverMql.addEventListener("change", updateTouch);

    const motionMql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionMql.matches);
    const updateMotion = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionMql.addEventListener("change", updateMotion);

    return () => {
      hoverMql.removeEventListener("change", updateTouch);
      motionMql.removeEventListener("change", updateMotion);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) setIsFlipped(false);
  };

  const handleClick = () => {
    if (isTouchDevice) setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  const renderIcon = () => {
    if (prize.iconType === "edtech" || prize.rank === "special-edtech") {
      return (
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
        </svg>
      );
    }

    if (prize.iconType === "ai" || prize.rank === "special") {
      return (
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z" />
        </svg>
      );
    }

    return (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
      </svg>
    );
  };

  // =========================================================================
  // HORIZONTAL VARIANT (Special Category Awards: Best Use of AI, Startup Launchpad)
  // =========================================================================
  if (isHorizontal) {
    const ringColor = prize.rank === "special-edtech" ? "focus-visible:ring-emerald-400" : "focus-visible:ring-cyan-400";

    return (
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-pressed={isFlipped}
        aria-label={`${prize.place}: ${prize.label}.`}
        whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.01 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.99 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className={`relative w-full h-[320px] xs:h-[300px] sm:h-[240px] md:h-[230px] perspective-1000 select-none cursor-pointer focus:outline-none focus-visible:ring-2 ${ringColor} rounded-2xl ${className}`}
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
          {/* FRONT FACE - Horizontal */}
          <div
            aria-hidden={isFlipped}
            className={`absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border p-5 sm:p-6 transition-all duration-300 ${
              config.cardBorderFront
            } ${
              prefersReducedMotion
                ? isFlipped
                    ? "pointer-events-none opacity-0"
                    : "opacity-100"
                : "backface-hidden rotate-y-0"
            } ${isFlipped && !prefersReducedMotion ? "pointer-events-none" : ""}`}
          >
            {/* Spotlight Cursor Glow */}
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${config.spotlightRgba}, transparent 75%)`,
              }}
              aria-hidden="true"
            />

            {/* Main Content Area */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-6 my-auto">
              {/* Left: Icon & Category Titles */}
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div
                  className={`w-13 h-13 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${config.iconBorder} ${config.iconColor}`}
                >
                  {renderIcon()}
                </div>

                <div>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase mb-1.5 border ${config.badgeClasses}`}>
                    {prize.badgeText || "SPECIAL CATEGORY AWARD"}
                  </span>
                  <h3
                    className={`font-accent font-black text-xl sm:text-2xl md:text-3xl tracking-wider leading-tight ${config.headlineColor}`}
                  >
                    {prize.place.toUpperCase()}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-white/80 font-medium mt-0.5">
                    {prize.label}
                  </p>
                </div>
              </div>

              {/* Right: Cash Bounty & Info OR Nextute Mentorship Track Info */}
              {prize.rank === "special-edtech" ? (
                <div className="flex flex-col items-center sm:items-end text-center sm:text-right shrink-0 max-w-sm sm:max-w-md">
                  <p className="font-accent font-bold text-xs sm:text-sm md:text-[15px] text-emerald-300 leading-snug">
                    {prize.bodyLine || "1 month of mentorship + pitch support to a relevant authority"}
                  </p>
                  <p className="font-body text-[11px] text-white/60 mt-0.5">
                    {prize.eligibilityNote || "Eligible teams will be contacted after judging."}
                  </p>

                  {/* Apply Button / Link with Disabled State */}
                  <div className="mt-2 flex flex-col items-center sm:items-end gap-1">
                    <div
                      role="button"
                      tabIndex={-1}
                      aria-disabled="true"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-mono text-xs cursor-not-allowed opacity-80 select-none shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                    >
                      <span>{prize.actionButton?.label || "Apply for Mentorship"}</span>
                      <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-mono text-white/50 italic">
                      {prize.actionButton?.disabledNote || "Form activates after hackathon judging."}
                    </span>
                  </div>

                  {/* Bottom tag */}
                  <div className="mt-1.5">
                    <span className="font-mono text-[9px] sm:text-[10px] md:text-[11px] text-emerald-200 font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                      {prize.bottomTag || "MENTORSHIP + PITCH SUPPORT"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center sm:items-end text-center sm:text-right shrink-0">
                  {prize.amount.toLowerCase().includes("announced") ? (
                    <motion.div
                      animate={{ opacity: [0.75, 1, 0.75] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[11px] sm:text-xs font-mono text-cyan-300"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${config.pulseDotColor} animate-pulse`} />
                      <span>Bounty: To Be Announced Soon</span>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center sm:items-end">
                      <span className="font-accent font-black text-2xl sm:text-3xl md:text-4xl text-cyan-300 tracking-wider leading-none drop-shadow-[0_2px_14px_rgba(6,182,212,0.4)]">
                        {prize.amount}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-cyan-400/80 mt-1 font-semibold">
                        Cash Bounty
                      </span>
                    </div>
                  )}
                  <div className="mt-2 flex flex-col items-center sm:items-end gap-1">
                    <span className="font-mono text-[9px] sm:text-[10px] md:text-[11px] text-cyan-200 font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                      {prize.bottomTag || "CASH BOUNTY + CERTIFICATE + HOODIE + ELEVENLABS SCALE TIER"}
                    </span>
                    <span className="text-[10px] text-white/50 italic">
                      Hoodie awarded to team leader · Scale Tier: 3 months, $897 value per team member, 1.8M credits/mo
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Subtle bottom indicator */}
            <div className={`relative z-10 pt-2 border-t flex items-center justify-between ${
              prize.rank === "special-edtech" ? "border-emerald-500/20" : "border-cyan-500/20"
            }`}>
              <span className={`text-[11px] font-mono uppercase tracking-widest ${
                prize.rank === "special-edtech" ? "text-emerald-400/70" : "text-cyan-400/60"
              }`}>
                {prize.sponsorTrack || "ELEVENLABS SPONSORED TRACK"}
              </span>
              <div className={`w-1.5 h-1.5 rounded-full ${config.pulseDotColor}`} />
            </div>
          </div>

          {/* BACK FACE - Horizontal */}
          <div
            aria-hidden={!isFlipped}
            className={`absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border p-5 sm:p-6 transition-all duration-300 ${
              config.cardBorderBack
            } ${
              prefersReducedMotion
                ? isFlipped
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
                : "backface-hidden rotate-y-180"
            } ${!isFlipped && !prefersReducedMotion ? "pointer-events-none" : ""}`}
          >
            {/* Spotlight Cursor Glow */}
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${config.spotlightRgba}, transparent 75%)`,
              }}
              aria-hidden="true"
            />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between gap-2">
              <span className={`text-xs sm:text-sm font-mono font-bold uppercase tracking-wider ${config.headerTextColor}`}>
                {prize.place} Perks & Benefits
              </span>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${config.badgeClasses}`}>
                {prize.rank === "special-edtech" ? "EdTech Track" : "Sponsored Track"}
              </span>
            </div>

            {/* Highlight Perk Box */}
            {prize.highlightPerk && (
              <div className={`relative z-10 p-2.5 rounded-lg border leading-snug text-xs my-auto ${config.highlightBox}`}>
                <div className="flex items-start gap-1.5">
                  <span className="text-yellow-400 text-xs shrink-0 mt-0.5">★</span>
                  <span className="font-medium text-[11px] sm:text-xs">
                    {prize.highlightPerk}
                  </span>
                </div>
              </div>
            )}

            {/* Perks Grid */}
            <div className={`relative z-10 grid grid-cols-1 ${
              prize.perks.length > 3 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"
            } gap-2 sm:gap-3`}>
              {prize.perks.map((perk, idx) => {
                const isHoodie = perk.toLowerCase().includes("hoodie");
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-2 text-xs leading-snug p-2 rounded-lg border ${
                      isHoodie
                        ? "bg-white/[0.06] border-white/15 text-white font-medium"
                        : "bg-white/[0.02] border-white/5 text-white/80"
                    }`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${config.checkColor}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="line-clamp-2">{perk}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // =========================================================================
  // PODIUM VARIANT (Winner, Runner Up, 2nd Runner Up)
  // =========================================================================
  const cardHeightClass = isWinnerElevated
    ? "h-[405px] sm:h-[415px] md:h-[425px]"
    : "h-[375px] sm:h-[385px] md:h-[395px]";

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={isFlipped}
      aria-label={`${prize.place}: ${prize.label}.`}
      whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.015 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`relative w-full ${cardHeightClass} perspective-1000 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-2xl ${className}`}
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
        {/* FRONT FACE - Podium */}
        <div
          aria-hidden={isFlipped}
          className={`absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border p-5 sm:p-6 text-center transition-all duration-300 ${
            config.cardBorderFront
          } ${
            prefersReducedMotion
              ? isFlipped
                ? "pointer-events-none opacity-0"
                : "opacity-100"
              : "backface-hidden rotate-y-0"
          } ${isFlipped && !prefersReducedMotion ? "pointer-events-none" : ""}`}
        >
          {/* Spotlight Cursor Glow */}
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${config.spotlightRgba}, transparent 75%)`,
            }}
            aria-hidden="true"
          />

          {/* Core Info */}
          <div className="relative z-10 flex flex-col items-center flex-1 justify-center">
            {/* Icon Container */}
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110 ${config.iconBorder} ${config.iconColor}`}
            >
              {renderIcon()}
            </div>

            {/* Rank Pill Badge */}
            <span
              className={`mb-2 px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider border ${config.badgeClasses}`}
            >
              {config.name}
            </span>

            {/* Dominant Rank Title */}
            <h3
              className={`font-accent font-black tracking-wider leading-tight ${
                isWinnerElevated ? "text-2xl sm:text-3xl lg:text-[32px]" : "text-xl sm:text-2xl"
              } ${config.headlineColor}`}
            >
              {prize.place.toUpperCase()}
            </h3>

            {/* Subtitle Label */}
            <p className="font-body text-xs sm:text-sm text-white/85 font-medium mt-1">
              {prize.label}
            </p>

            {/* Cash Prize Amount / Pending Badge */}
            {prize.amount.toLowerCase().includes("announced") ? (
              <motion.div
                animate={{ opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] sm:text-xs font-mono text-white/75 tracking-wide my-3"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${config.pulseDotColor} animate-pulse`} />
                <span>Prize Pool: To Be Announced Soon</span>
              </motion.div>
            ) : (
              <div className="my-2 sm:my-2.5 flex flex-col items-center">
                <span
                  className={`font-accent font-black tracking-wider leading-none ${
                    isWinnerElevated
                      ? "text-3xl sm:text-4xl lg:text-[40px]"
                      : "text-2xl sm:text-3xl lg:text-[34px]"
                  } ${config.headlineColor} drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]`}
                >
                  {prize.amount}
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white/60 mt-1 font-medium">
                  Cash Prize
                </span>
              </div>
            )}

            {/* Bottom tag & Note */}
            <div className="mt-1 flex flex-col items-center gap-1">
              <span className="font-mono text-[10px] sm:text-[11px] text-white/90 font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">
                CASH PRIZE + CERTIFICATE + HOODIE
              </span>
              <span className="text-[10px] text-white/50 italic">
                Hoodie awarded to team leader
              </span>
            </div>
          </div>

          {/* Subtle bottom indicator */}
          <div className="relative z-10 pt-2 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/30">
              {config.name}
            </span>
            <div className={`w-1.5 h-1.5 rounded-full ${config.pulseDotColor}`} />
          </div>
        </div>

        {/* BACK FACE - Podium */}
        <div
          aria-hidden={!isFlipped}
          className={`absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border p-5 sm:p-6 text-left transition-all duration-300 ${
            config.cardBorderBack
          } ${
            prefersReducedMotion
              ? isFlipped
                ? "opacity-100"
                : "pointer-events-none opacity-0"
              : "backface-hidden rotate-y-180"
          } ${!isFlipped && !prefersReducedMotion ? "pointer-events-none" : ""}`}
        >
          {/* Spotlight Cursor Glow */}
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${config.spotlightRgba}, transparent 75%)`,
            }}
            aria-hidden="true"
          />

          {/* Back Content */}
          <div className="relative z-10 flex flex-col flex-1 justify-between">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`text-xs font-mono font-bold uppercase tracking-wider ${config.headerTextColor}`}>
                {prize.place} Perks
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/10">
                {config.name}
              </span>
            </div>

            {/* Highlight Perk Box (for Winner) */}
            {prize.highlightPerk && (
              <div className={`mb-2 p-2.5 rounded-lg border leading-snug text-xs ${config.highlightBox}`}>
                <div className="flex items-start gap-1.5">
                  <span className="text-yellow-400 text-xs shrink-0 mt-0.5">★</span>
                  <span className="font-medium text-[11px] sm:text-xs">
                    {prize.highlightPerk}
                  </span>
                </div>
              </div>
            )}

            {/* Perks List */}
            <div className="space-y-1.5 py-1 my-auto">
              {prize.perks.map((perk, idx) => {
                const isHoodie = perk.toLowerCase().includes("hoodie");
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-2 text-xs sm:text-[13px] leading-snug ${
                      isHoodie
                        ? "text-white font-medium bg-white/[0.05] p-1.5 rounded-md border border-white/[0.08]"
                        : "text-white/80"
                    }`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${config.checkColor}`}
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

            {/* Subtle bottom indicator */}
            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/30">
                Guaranteed Perks
              </span>
              <div className={`w-1.5 h-1.5 rounded-full ${config.pulseDotColor}`} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
