"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { podiumPrizes, specialPrizes, totalPrizeValue } from "@/data/prizes";
import PrizeCard from "@/components/ui/PrizeCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function CountUpPrizePool({
  target = 532400,
  duration = 2200,
}: {
  target?: number;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState("₹0");
  const [isFinished, setIsFinished] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(`₹${target.toLocaleString("en-IN")}`);
      setIsFinished(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const startCount = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Quartic ease-out curve for a natural deceleration
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentVal = Math.floor(easeProgress * target);

        setDisplayValue(`₹${currentVal.toLocaleString("en-IN")}`);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setDisplayValue(`₹${target.toLocaleString("en-IN")}`);
          setIsFinished(true);
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCount();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <div
      ref={containerRef}
      className="font-accent font-black text-3xl sm:text-5xl md:text-6xl text-spidey-red tracking-wider drop-shadow-[0_4px_30px_rgba(230,36,41,0.7)] mt-2 flex items-baseline justify-center"
    >
      <span>{displayValue}</span>
      <span
        className={`transition-opacity duration-300 text-spidey-red ${
          isFinished ? "opacity-100" : "opacity-0"
        }`}
      >
        +
      </span>
    </div>
  );
}

export default function Prizes() {
  const sectionRef = useRef<HTMLElement>(null);
  const podiumRef = useRef<HTMLDivElement>(null);
  const specialRef = useRef<HTMLDivElement>(null);
  const teamRewardsRef = useRef<HTMLDivElement>(null);

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

      if (teamRewardsRef.current) {
        gsap.from(teamRewardsRef.current, {
          scrollTrigger: {
            trigger: teamRewardsRef.current,
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
      <div className="text-center mb-4 sm:mb-6">
        <span className="font-accent text-label font-bold uppercase tracking-[0.22em] text-white/70">
          TOTAL PRIZE POOL
        </span>
        <CountUpPrizePool target={totalPrizeValue} duration={2200} />
        <p className="font-mono text-xs sm:text-sm text-white/60 uppercase tracking-widest mt-2">
          CASH PRIZES + PERKS & SWAGS
        </p>
      </div>

      {/* Clarity Line */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 px-4">
        <p className="font-body text-xs sm:text-sm text-white/65 leading-relaxed font-normal">
          Total includes cash prizes and sponsor tier perks, calculated for full teams of 4. Individual team payouts may vary with team size (2–4 members).
        </p>
      </div>

      {/* ================= PODIUM LAYOUT ================= */}
      {/* Desktop: 3-column grid (Bronze Left, Gold Center Elevated, Silver Right) */}
      {/* Mobile: Vertical stack in rank order (Winner 1st, Runner Up 2nd, 2nd Runner Up 3rd) */}
      <div
        ref={podiumRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-end max-w-5xl mx-auto pt-4 md:pt-12 px-2"
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

      {/* ================= SEPARATED SPECIAL CATEGORY AWARDS ================= */}
      {specialPrizes.length > 0 && (
        <div
          ref={specialRef}
          className="mt-14 sm:mt-18 lg:mt-20 max-w-4xl mx-auto w-full px-2"
        >
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[11px] sm:text-xs font-mono uppercase tracking-widest mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Special Category Awards
            </div>
            <h3 className="font-accent font-black text-lg sm:text-xl md:text-2xl text-white tracking-wide">
              ADDITIONAL EXCELLENCE RECOGNITION
            </h3>
            <p className="text-white/60 font-body text-xs sm:text-sm max-w-xl mx-auto mt-1 font-normal">
              Special partner bounties & startup tracks awarded for domain excellence and innovation.
            </p>
          </div>

          {/* Stacked Special Category Cards */}
          <div className="space-y-6">
            {specialPrizes.map((prize) => (
              <PrizeCard key={prize.id} prize={prize} variant="horizontal" />
            ))}
          </div>
        </div>
      )}

      {/* ================= SPONSOR PERKS BREAKDOWN ================= */}
      <div
        ref={teamRewardsRef}
        className="mt-14 sm:mt-18 lg:mt-20 max-w-5xl mx-auto w-full px-2"
      >
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="font-accent font-black text-lg sm:text-xl md:text-2xl text-white tracking-wide">
            SPONSOR PERKS BREAKDOWN
          </h3>
          <div className="w-16 h-0.5 bg-spidey-red mx-auto mt-2 mb-3 rounded-full" />
          <p className="text-white/60 font-body text-xs sm:text-sm max-w-xl mx-auto font-normal">
            Platform tiers and toolkits powered by our partners included in the prize pool.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* CARD 1: All Participants */}
          <div className="relative rounded-2xl border border-purple-500/30 bg-[#0B0914] p-5 sm:p-6 shadow-[0_0_24px_rgba(168,85,247,0.12)] hover:border-purple-400/60 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase bg-purple-500/15 border border-purple-400/35 text-purple-300">
                  EVERY PARTICIPANT · BONUS, NOT IN TOTAL ABOVE
                </span>
              </div>
              <p className="font-accent font-black text-xl sm:text-2xl text-purple-300 mt-2">
                ₹2,100 value
              </p>
              <h4 className="font-accent font-bold text-base sm:text-lg text-white mt-1">
                1 Month Free — Creator Tier
              </h4>
              <p className="font-mono text-xs text-white/60 mt-2">
                131k credits · Universal access
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-purple-500/20 flex items-center justify-between text-[11px] font-mono text-purple-300/60 uppercase tracking-widest">
              <span>Universal Access</span>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            </div>
          </div>

          {/* CARD 2: Winning Team */}
          <div className="relative rounded-2xl border border-amber-500/35 bg-[#140F08] p-5 sm:p-6 shadow-[0_0_24px_rgba(245,158,11,0.14)] hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase bg-amber-500/15 border border-amber-400/35 text-amber-300">
                  WINNING TEAM
                </span>
              </div>
              <p className="font-accent font-black text-xl sm:text-2xl text-amber-300 mt-2">
                ₹28,500 value per member
              </p>
              <h4 className="font-accent font-bold text-base sm:text-lg text-white mt-1">
                3 Months Pro Tier
              </h4>
              <p className="font-mono text-xs text-white/60 mt-2">
                600k credits/mo · ₹1,14,000 team total
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between text-[11px] font-mono text-amber-300/60 uppercase tracking-widest">
              <span>Per Team Member</span>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>
          </div>

          {/* CARD 3: Best Use of AI Team */}
          <div className="relative rounded-2xl border border-cyan-500/35 bg-[#081216] p-5 sm:p-6 shadow-[0_0_24px_rgba(6,182,212,0.14)] hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase bg-cyan-500/15 border border-cyan-400/35 text-cyan-300">
                  BEST USE OF AI TEAM
                </span>
              </div>
              <p className="font-accent font-black text-xl sm:text-2xl text-cyan-300 mt-2">
                ₹86,100 value per member
              </p>
              <h4 className="font-accent font-bold text-base sm:text-lg text-white mt-1">
                3 Months Scale Tier
              </h4>
              <p className="font-mono text-xs text-white/60 mt-2">
                1.8M credits/mo · ₹3,44,400 team total
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-cyan-500/20 flex items-center justify-between text-[11px] font-mono text-cyan-300/60 uppercase tracking-widest">
              <span>Per Team Member</span>
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM PARTICIPANT STRIP ================= */}
      <div className="mt-10 sm:mt-14 max-w-3xl mx-auto w-full px-2 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-white/75 font-mono text-xs sm:text-sm tracking-wide shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
          <span className="text-spidey-red font-bold">Every participant also receives:</span>
          <span className="inline-flex items-center gap-1.5 text-white/90 font-medium">
            <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814L10 13.175l-4.419 3.639A1 1 0 014 16V4z" clipRule="evenodd" />
            </svg>
            Certificate
          </span>
          <span className="text-white/30">·</span>
          <span className="inline-flex items-center gap-1.5 text-white/90 font-medium">
            <svg className="w-3.5 h-3.5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Sticker
          </span>
          <span className="text-white/30">·</span>
          <span className="inline-flex items-center gap-1.5 text-white/90 font-medium">
            <svg className="w-3.5 h-3.5 text-purple-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />
            </svg>
            Srijan Setu Customized Cup
          </span>
        </div>
      </div>
    </section>
  );
}
