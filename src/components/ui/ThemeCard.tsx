"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { HackathonTheme } from "@/data/themes";

interface ThemeCardProps {
  theme: HackathonTheme;
}

export default function ThemeCard({ theme }: ThemeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const number = String(theme.order).padStart(2, "0");

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
      aria-label={`Theme ${number}: ${theme.name}.`}
      whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.015 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="relative w-full h-[250px] sm:h-[260px] lg:h-[270px] perspective-1000 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-spidey-red rounded-xl"
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
        {/* ================= FRONT FACE ================= */}
        <div
          aria-hidden={isFlipped}
          className={`absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border p-6 text-left transition-colors duration-300 ${
            isFlipped
              ? "border-spidey-red/70 bg-[#0F0A0E] shadow-[0_0_25px_rgba(227,38,54,0.3)]"
              : "border-white/10 bg-[#0C0D14] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:border-spidey-red/50"
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
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(230, 36, 41, 0.15), transparent 75%)",
            }}
            aria-hidden="true"
          />

          {/* Top: Number & Tag */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-spidey-red">
              {number}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 border border-white/10 px-2.5 py-0.5 rounded-full">
              Problem Space
            </span>
          </div>

          {/* Middle: Theme Title */}
          <div className="relative z-10 my-auto py-2">
            <h3 className="font-body text-xl sm:text-[22px] font-bold text-white tracking-tight leading-snug">
              {theme.name}
            </h3>
          </div>

          {/* Subtle bottom indicator line */}
          <div className="relative z-10 pt-2 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/30">
              Theme {number}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-spidey-red/60" />
          </div>
        </div>

        {/* ================= BACK FACE ================= */}
        <div
          aria-hidden={!isFlipped}
          className={`absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border border-spidey-red/50 bg-[#120B0F] p-6 text-left shadow-[0_12px_32px_rgba(230,36,41,0.2)] transition-colors duration-300 ${
            prefersReducedMotion
              ? isFlipped
                ? "opacity-100"
                : "pointer-events-none opacity-0"
              : "backface-hidden rotate-y-180"
          } ${!isFlipped && !prefersReducedMotion ? "pointer-events-none" : ""}`}
        >
          {/* Spotlight Cursor Glow */}
          <div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(230, 36, 41, 0.18), transparent 75%)",
            }}
            aria-hidden="true"
          />

          {/* Top: Header */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-spidey-red">
              {number}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-spidey-red/80 border border-spidey-red/30 px-2.5 py-0.5 rounded-full bg-spidey-red/10">
              Overview
            </span>
          </div>

          {/* Content */}
          <div className="relative z-10 my-auto py-1">
            <h4 className="font-body text-base sm:text-lg font-bold text-white tracking-tight leading-snug mb-2">
              {theme.name}
            </h4>
            <p className="font-body text-xs sm:text-[14px] leading-relaxed text-white/85 font-normal">
              {theme.description}
            </p>
          </div>

          {/* Bottom Accent */}
          <div className="relative z-10 pt-2 border-t border-spidey-red/20 flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-widest text-spidey-red/60">
              Srijan Setu Track
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-spidey-red" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
