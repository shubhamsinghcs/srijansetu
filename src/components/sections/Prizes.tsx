"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prizes, totalPrizePool } from "@/data/prizes";
import PrizeCard from "@/components/ui/PrizeCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Prizes() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current?.children ?? [], {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.65,
        stagger: 0.09,
        ease: "power2.out",
        clearProps: "transform",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="prizes"
      className="relative py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-spidey-red/5 rounded-full blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="section-heading text-display-lg leading-tight">
          PRIZES
        </h2>
        <div className="w-24 h-1 bg-spidey-red mx-auto mt-4 mb-4 rounded-full" />
        <p className="text-white/75 font-body text-body-base sm:text-body-lg max-w-2xl mx-auto leading-relaxed font-normal">
          Reap the rewards of innovation with substantial cash bounties, trophies, and partner perks.
        </p>
      </div>

      {/* Large Headline Number: Total Prize Pool */}
      <div className="text-center mb-8 sm:mb-10">
        <span className="font-accent text-label font-bold uppercase tracking-[0.22em] text-white/70">
          TOTAL PRIZE POOL
        </span>
        <div className="font-accent font-black text-3xl sm:text-5xl md:text-6xl text-spidey-red tracking-wider drop-shadow-[0_4px_30px_rgba(230,36,41,0.7)] mt-2">
          {totalPrizePool}
        </div>
      </div>

      {/* Four Prize Cards Grid */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch max-w-7xl mx-auto"
      >
        {prizes.map((prize) => (
          <PrizeCard key={prize.id} prize={prize} />
        ))}
      </div>
    </section>
  );
}
