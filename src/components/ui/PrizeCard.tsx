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
  cardBorder: string;
  cardBorderHover: string;
  cardShadow: string;
  pulseDotColor: string;
  spotlightRgba: string;
  checkColor: string;
  highlightBox: string;
}

const rankStyles: Record<PrizeRank, RankStyleConfig> = {
  first: {
    name: "1ST PLACE",
    headlineColor: "text-amber-300",
    badgeClasses: "bg-amber-500/20 border-amber-400/50 text-amber-300",
    iconBorder: "bg-amber-500/20 border-2 border-amber-400 shadow-[0_0_24px_rgba(245,158,11,0.55)]",
    iconColor: "text-amber-300",
    cardBorder: "border-amber-400/60 bg-[#120E07]",
    cardBorderHover: "border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.4)]",
    cardShadow: "shadow-[0_0_30px_rgba(245,158,11,0.25)]",
    pulseDotColor: "bg-amber-400",
    spotlightRgba: "rgba(245, 158, 11, 0.16)",
    checkColor: "text-amber-400",
    highlightBox: "bg-amber-500/10 border-amber-400/35 text-amber-100",
  },
  second: {
    name: "2ND PLACE",
    headlineColor: "text-slate-200",
    badgeClasses: "bg-slate-300/15 border-slate-300/40 text-slate-200",
    iconBorder: "bg-slate-400/15 border-2 border-slate-300 shadow-[0_0_18px_rgba(203,213,225,0.25)]",
    iconColor: "text-slate-200",
    cardBorder: "border-slate-300/45 bg-[#0D1016]",
    cardBorderHover: "border-slate-200/80 shadow-[0_0_30px_rgba(203,213,225,0.25)]",
    cardShadow: "shadow-[0_0_20px_rgba(203,213,225,0.15)]",
    pulseDotColor: "bg-slate-300",
    spotlightRgba: "rgba(203, 213, 225, 0.14)",
    checkColor: "text-slate-300",
    highlightBox: "bg-slate-400/10 border-slate-300/30 text-slate-100",
  },
  third: {
    name: "3RD PLACE",
    headlineColor: "text-[#F5B07A]",
    badgeClasses: "bg-[#CD7F32]/20 border-[#CD7F32]/45 text-[#F5B07A]",
    iconBorder: "bg-[#CD7F32]/20 border-2 border-[#CD7F32] shadow-[0_0_18px_rgba(184,115,51,0.28)]",
    iconColor: "text-[#F5B07A]",
    cardBorder: "border-[#CD7F32]/50 bg-[#120B07]",
    cardBorderHover: "border-[#E08D47]/80 shadow-[0_0_30px_rgba(184,115,51,0.28)]",
    cardShadow: "shadow-[0_0_20px_rgba(184,115,51,0.18)]",
    pulseDotColor: "bg-[#CD7F32]",
    spotlightRgba: "rgba(184, 115, 51, 0.15)",
    checkColor: "text-[#E08D47]",
    highlightBox: "bg-amber-900/15 border-[#CD7F32]/35 text-[#FAD7BD]",
  },
  special: {
    name: "SPECIAL AWARD",
    headlineColor: "text-cyan-300",
    badgeClasses: "bg-cyan-500/15 border-cyan-400/40 text-cyan-300",
    iconBorder: "bg-cyan-500/15 border-2 border-cyan-400 shadow-[0_0_22px_rgba(6,182,212,0.35)]",
    iconColor: "text-cyan-300",
    cardBorder: "border-cyan-500/45 bg-[#07111D]",
    cardBorderHover: "border-cyan-400/80 shadow-[0_0_35px_rgba(6,182,212,0.3)]",
    cardShadow: "shadow-[0_0_25px_rgba(6,182,212,0.2)]",
    pulseDotColor: "bg-cyan-400",
    spotlightRgba: "rgba(6, 182, 212, 0.18)",
    checkColor: "text-cyan-400",
    highlightBox: "bg-cyan-500/10 border-cyan-400/40 text-cyan-100",
  },
};

export default function PrizeCard({
  prize,
  variant = "podium",
  isWinnerElevated = false,
  className = "",
}: PrizeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const config = rankStyles[prize.rank] || rankStyles.third;
  const isHorizontal = variant === "horizontal";

  useEffect(() => {
    // Detect touch-only devices without pointer hover capability
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsTouchDevice(!mql.matches);

    const updateTouch = (e: MediaQueryListEvent) => setIsTouchDevice(!e.matches);
    mql.addEventListener("change", updateTouch);
    return () => mql.removeEventListener("change", updateTouch);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) setIsExpanded(false);
  };

  const handleClick = () => {
    if (isTouchDevice) setIsExpanded((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsExpanded((prev) => !prev);
    }
  };

  const renderIcon = () => {
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
  // HORIZONTAL VARIANT (Special Category Award: Best Use of AI)
  // =========================================================================
  if (isHorizontal) {
    return (
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
        aria-label={`${prize.place}: ${prize.label}. ${isExpanded ? "Expanded" : "Collapsed"}`}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`group relative w-full overflow-hidden rounded-2xl border p-5 sm:p-6 lg:p-7 text-left transition-all duration-300 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
          config.cardBorder
        } ${isExpanded ? config.cardBorderHover : config.cardShadow} ${className}`}
      >
        {/* Spotlight Cursor Glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${config.spotlightRgba}, transparent 75%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col justify-between">
          {/* Main Collapsed Header Area */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-6">
            {/* Left: Icon & Category Titles */}
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div
                className={`w-13 h-13 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${config.iconBorder} ${config.iconColor}`}
              >
                {renderIcon()}
              </div>

              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase mb-1.5 bg-cyan-500/15 border border-cyan-400/35 text-cyan-300">
                  SPECIAL CATEGORY AWARD
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

            {/* Right: Pending Badge & Bounty Info */}
            <div className="flex flex-col items-center sm:items-end text-center sm:text-right shrink-0">
              <motion.div
                animate={{ opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[11px] sm:text-xs font-mono text-cyan-300"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${config.pulseDotColor} animate-pulse`} />
                <span>Bounty: To Be Announced Soon</span>
              </motion.div>
              <p className="font-body text-[11px] sm:text-xs text-white/60 mt-1.5">
                Cash Bounty + ElevenLabs Scale Tier + Swag
              </p>
            </div>
          </div>

          {/* Expandable Reveal Content */}
          <motion.div
            initial={false}
            animate={
              isExpanded
                ? { height: "auto", opacity: 1, marginTop: 16 }
                : { height: 0, opacity: 0, marginTop: 0 }
            }
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-cyan-500/20">
              {/* Highlight Perk Box */}
              {prize.highlightPerk && (
                <div className={`p-2.5 rounded-lg border leading-snug text-xs mb-3 ${config.highlightBox}`}>
                  <div className="flex items-start gap-1.5">
                    <span className="text-yellow-400 text-xs shrink-0 mt-0.5">★</span>
                    <span className="font-medium text-[11px] sm:text-xs">
                      {prize.highlightPerk}
                    </span>
                  </div>
                </div>
              )}

              {/* Perks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
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
          </motion.div>

          {/* Bottom Action Hint */}
          <div className="pt-3 mt-3 border-t border-white/[0.08] flex items-center justify-between text-white/50 group-hover:text-cyan-300 transition-colors duration-300">
            <span className="text-[11px] sm:text-xs font-medium tracking-wide">
              {isTouchDevice
                ? isExpanded
                  ? "Tap to collapse"
                  : "Tap to view perks"
                : isExpanded
                ? "Viewing perks & rewards"
                : "Hover to view perks"}
            </span>
            <span
              className={`text-sm font-bold transition-transform duration-200 ${
                isExpanded ? "translate-x-1" : ""
              }`}
            >
              →
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  // =========================================================================
  // PODIUM VARIANT (Winner, Runner Up, 2nd Runner Up)
  // =========================================================================
  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      aria-label={`${prize.place}: ${prize.label}. ${isExpanded ? "Expanded" : "Collapsed"}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 sm:p-6 text-center transition-all duration-300 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 w-full ${
        config.cardBorder
      } ${isExpanded ? config.cardBorderHover : config.cardShadow} ${className}`}
    >
      {/* Spotlight Cursor Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${config.spotlightRgba}, transparent 75%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center justify-between h-full">
        {/* Top: Icon Container */}
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

        {/* Pending-state Pill Badge */}
        <motion.div
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] sm:text-xs font-mono text-white/75 tracking-wide my-3"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${config.pulseDotColor} animate-pulse`} />
          <span>Prize Pool: To Be Announced Soon</span>
        </motion.div>

        {/* Subtitle Note */}
        <p className="font-body text-[11px] sm:text-xs text-web-gray uppercase tracking-wider font-normal">
          Cash Prize + Goodies & Perks
        </p>

        {/* Expandable Reveal Content */}
        <motion.div
          initial={false}
          animate={
            isExpanded
              ? { height: "auto", opacity: 1, marginTop: 14 }
              : { height: 0, opacity: 0, marginTop: 0 }
          }
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="overflow-hidden w-full text-left"
        >
          <div className="pt-3 border-t border-white/[0.08]">
            {/* Highlight Perk Box (for Winner) */}
            {prize.highlightPerk && (
              <div className={`mb-2.5 p-2.5 rounded-lg border leading-snug text-xs ${config.highlightBox}`}>
                <div className="flex items-start gap-1.5">
                  <span className="text-yellow-400 text-xs shrink-0 mt-0.5">★</span>
                  <span className="font-medium text-[11px] sm:text-xs">
                    {prize.highlightPerk}
                  </span>
                </div>
              </div>
            )}

            {/* Perks List */}
            <div className="space-y-1.5 py-1">
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
          </div>
        </motion.div>

        {/* Bottom Action Hint */}
        <div className="w-full pt-3 mt-3 border-t border-white/[0.08] flex items-center justify-between text-white/50 group-hover:text-white transition-colors duration-300">
          <span className="text-[11px] sm:text-xs font-medium tracking-wide">
            {isTouchDevice
              ? isExpanded
                ? "Tap to collapse"
                : "Tap to view perks"
              : isExpanded
              ? "Viewing perks & rewards"
              : "Hover to view perks"}
          </span>
          <span
            className={`text-sm font-bold transition-transform duration-200 ${
              isExpanded ? "translate-y-0.5" : ""
            }`}
          >
            {isExpanded ? "↑" : "↓"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
