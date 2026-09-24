"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { prizes, totalPrizePool, PrizeItem } from "@/data/prizes";
import Card from "@/components/ui/Card";

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

  const renderIcon = (prize: PrizeItem) => {
    if (prize.iconType === "ai" || prize.place === "Best Use of AI") {
      return (
        <svg
          className="w-7 h-7 sm:w-10 sm:h-10 text-cyan-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z" />
        </svg>
      );
    }

    const trophyColor =
      prize.place === "Winner"
        ? "text-yellow-400"
        : prize.place === "Runner Up" || prize.place === "1st Runner Up"
        ? "text-slate-300"
        : "text-amber-500";

    return (
      <svg
        className={`w-7 h-7 sm:w-10 sm:h-10 ${trophyColor}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
      </svg>
    );
  };

  const renderBadge = (prize: PrizeItem) => {
    if (prize.place === "Winner") {
      return <span className="mb-3 pill-badge pill-badge-red">{prize.place}</span>;
    }
    if (prize.place === "Best Use of AI") {
      return <span className="mb-3 pill-badge pill-badge-blue">{prize.place}</span>;
    }
    return <span className="mb-3 pill-badge pill-badge-neutral">{prize.place}</span>;
  };

  return (
    <section
      ref={sectionRef}
      id="prizes"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="section-heading text-display-lg leading-tight">
          PRIZES
        </h2>
        <div className="w-24 h-1 bg-spidey-red mx-auto mt-4 mb-4 rounded-full" />
        <p className="text-white/75 font-body text-body-base sm:text-body-lg max-w-2xl mx-auto leading-relaxed font-normal">
          Reap the rewards of innovation with substantial cash bounties, trophies, and partner perks.
        </p>
      </div>

      {/* Large Headline Number: Total Prize Pool */}
      <div className="text-center mb-12 sm:mb-16">
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
        {prizes.map((prize) => {
          const isWinner = prize.place === "Winner";
          const isAI = prize.place === "Best Use of AI";

          return (
            <motion.div
              key={prize.place}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="h-full flex flex-col"
            >
              <Card
                variant={isWinner ? "featured" : "default"}
                className={`h-full text-center transition-all duration-300 flex flex-col justify-between ${
                  isWinner
                    ? "border-spidey-red shadow-[0_0_35px_rgba(227,38,54,0.45)] lg:-translate-y-2 py-8 px-5 sm:px-6"
                    : isAI
                    ? "border-spidey-blue/40 hover:border-cyan-400/60 shadow-[0_0_25px_rgba(29,78,216,0.18)] py-6 px-5 sm:px-6"
                    : "border-white/10 hover:border-spidey-red/60 py-6 px-5 sm:px-6"
                }`}
              >
                <div className="flex flex-col items-center">
                  {/* Icon Container */}
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 ${
                      isWinner
                        ? "bg-spidey-red/20 border-2 border-spidey-red shadow-[0_0_20px_rgba(227,38,54,0.6)]"
                        : isAI
                        ? "bg-blue-500/15 border border-cyan-400/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                        : "bg-white/5 border border-white/15"
                    }`}
                  >
                    {renderIcon(prize)}
                  </div>

                  {/* Place Tag */}
                  {renderBadge(prize)}

                  {/* Label */}
                  <h3 className="text-base sm:text-lg font-bold text-web-white">
                    {prize.label}
                  </h3>

                  {/* Amount */}
                  <div
                    className={`font-accent font-black tracking-wider my-3 sm:my-4 ${
                      isWinner
                        ? "text-2xl sm:text-3xl text-spidey-red drop-shadow-[0_2px_15px_rgba(227,38,54,0.5)]"
                        : isAI
                        ? "text-xl sm:text-2xl text-cyan-300 drop-shadow-[0_2px_12px_rgba(56,189,248,0.3)]"
                        : "text-xl sm:text-2xl text-web-white"
                    }`}
                  >
                    {prize.amount}
                  </div>
                </div>

                {/* Subtle note */}
                <p className="font-body text-xs text-web-gray mt-2 uppercase tracking-wider font-normal">
                  Cash Prize + Goodies & Perks
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
