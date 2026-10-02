"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { HackathonTheme } from "@/data/themes";

interface ThemeCardProps {
  theme: HackathonTheme;
}

export default function ThemeCard({ theme }: ThemeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const number = String(theme.order).padStart(2, "0");

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
      aria-label={`Theme ${number}: ${theme.name}. ${isExpanded ? "Expanded" : "Collapsed"}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border p-6 text-left transition-all duration-300 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-spidey-red bg-[#0C0D14] w-full ${
        isExpanded
          ? "border-spidey-red/70 shadow-[0_0_25px_rgba(227,38,54,0.3)] bg-[#0F0A0E]"
          : "border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:border-spidey-red/50"
      }`}
    >
      {/* Interactive Spotlight Cursor Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(230, 36, 41, 0.15), transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top: Theme Number */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-spidey-red">
            {number}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 border border-white/10 px-2 py-0.5 rounded-full">
            Problem Space
          </span>
        </div>

        {/* Domain Title */}
        <h3 className="font-body text-xl sm:text-[22px] font-bold text-white tracking-tight leading-snug">
          {theme.name}
        </h3>

        {/* Expandable Reveal Content */}
        <motion.div
          initial={false}
          animate={
            isExpanded
              ? { height: "auto", opacity: 1, marginTop: 12 }
              : { height: 0, opacity: 0, marginTop: 0 }
          }
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div className="pt-3 border-t border-white/[0.08]">
            <p className="font-body text-body-sm leading-relaxed text-white/80 font-normal">
              {theme.description}
            </p>
          </div>
        </motion.div>

        {/* Bottom Action Hint */}
        <div className="pt-4 mt-3 border-t border-white/[0.08] flex items-center justify-between text-white/50 group-hover:text-spidey-red transition-colors duration-300">
          <span className="text-xs font-medium tracking-wide">
            {isTouchDevice
              ? isExpanded
                ? "Tap to collapse"
                : "Tap to explore"
              : isExpanded
              ? "Exploring domain"
              : "Hover to explore"}
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
