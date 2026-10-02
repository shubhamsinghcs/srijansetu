"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { podiumPrizes, specialPrizes, totalPrizePool } from "@/data/prizes";
import PrizeCard from "@/components/ui/PrizeCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Prizes() {
  const sectionRef = useRef<HTMLElement>(null);
  const podiumRef = useRef<HTMLDivElement>(null);
  const specialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (podiumRef.current) {
        gsap.from(podiumRef.current.children, {
          scrollTrigger: {
            trigger: podiumRef.current,
            start: "top 85%",
            once: true,
          },
          y: 35,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          clearProps: "transform",
        });
      }

      if (specialRef.current) {
        gsap.from(specialRef.current, {
          scrollTrigger: {
            trigger: specialRef.current,
            start: "top 88%",
            once: true,
          },
          y: 25,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          clearProps: "transform",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const winnerPrize = podiumPrizes.find((p) => p.rank === "first") || podiumPrizes[0];
  const runnerUpPrize = podiumPrizes.find((p) => p.rank === "second") || podiumPrizes[1];
  const secondRunnerUpPrize = podiumPrizes.find((p) => p.rank === "third") || podiumPrizes[2];
  const specialPrize = specialPrizes[0];

  return (
    <section
      ref={sectionRef}
      id="prizes"
      className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="section-heading text-display-lg leading-tight">
          PRIZES
        </h2>
        <div className="w-24 h-1 bg-spidey-red mx-auto mt-4 mb-4 rounded-full" />
        <p className="text-white/75 font-body text-body-base sm:text-body-lg max-w-2xl mx-auto leading-relaxed font-normal">
          Reap the rewards of innovation with substantial cash bounties, prestigious trophies, and partner perks.
        </p>
      </div>

      {/* Headline: Total Prize Pool */}
      <div className="text-center mb-10 sm:mb-12">
        <span className="font-accent text-label font-bold uppercase tracking-[0.22em] text-white/70">
          TOTAL PRIZE POOL
        </span>
        <div className="font-accent font-black text-3xl sm:text-5xl md:text-6xl text-spidey-red tracking-wider drop-shadow-[0_4px_30px_rgba(230,36,41,0.7)] mt-2">
          {totalPrizePool}
        </div>
      </div>

      {/* ================= PODIUM LAYOUT ================= */}
      {/* Desktop: 3-column grid (Bronze Left, Gold Center Elevated, Silver Right) */}
      {/* Mobile: Vertical stack in rank order (Winner 1st, Runner Up 2nd, 2nd Runner Up 3rd) */}
      <div
        ref={podiumRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start max-w-5xl mx-auto pt-4 md:pt-12 px-2"
      >
        {/* 2nd Runner Up (Third Place) — Left on desktop (md:order-1), 3rd on mobile (order-3) */}
        <div className="order-3 md:order-1 w-full max-w-md mx-auto md:max-w-none">
          <PrizeCard prize={secondRunnerUpPrize} variant="podium" />
        </div>

        {/* Winner (Grand Prize Champion) — Center elevated on desktop (md:order-2), 1st on mobile (order-1) */}
        <div className="order-1 md:order-2 w-full max-w-md mx-auto md:max-w-none md:-translate-y-6 lg:-translate-y-8 md:scale-[1.04] lg:scale-[1.07] z-10 transition-transform duration-300">
          <PrizeCard prize={winnerPrize} variant="podium" isWinnerElevated />
        </div>

        {/* Runner Up (Second Place) — Right on desktop (md:order-3), 2nd on mobile (order-2) */}
        <div className="order-2 md:order-3 w-full max-w-md mx-auto md:max-w-none">
          <PrizeCard prize={runnerUpPrize} variant="podium" />
        </div>
      </div>

      {/* ================= SEPARATED SPECIAL CATEGORY AWARD ================= */}
      {specialPrize && (
        <div
          ref={specialRef}
          className="mt-14 sm:mt-18 lg:mt-20 max-w-4xl mx-auto w-full px-2"
        >
          <div className="text-center mb-5 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[11px] sm:text-xs font-mono uppercase tracking-widest mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Special Category Award
            </div>
            <h3 className="font-accent font-black text-lg sm:text-xl text-white tracking-wide">
              ADDITIONAL EXCELLENCE RECOGNITION
            </h3>
            <p className="text-white/60 font-body text-xs sm:text-sm max-w-xl mx-auto mt-1 font-normal">
              Special partner bounty awarded for outstanding engineering and implementation.
            </p>
          </div>

          {/* Wide Horizontal Flip Card */}
          <PrizeCard prize={specialPrize} variant="horizontal" />
        </div>
      )}
    </section>
  );
}
