"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { themes } from "@/data/themes";
import ThemeCard from "@/components/ui/ThemeCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Themes() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const activeThemes = themes.filter((theme) => theme.active).sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.from(gridRef.current?.children ?? [], {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: true,
        },
        y: 36,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "all",
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="themes"
      aria-labelledby="themes-heading"
      className="relative mx-auto max-w-7xl px-4 py-10 sm:py-14 lg:py-16 scroll-mt-20"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-spidey-red/5 rounded-full blur-[100px] pointer-events-none -z-10" aria-hidden="true" />
      <div id="problem-statements" className="sr-only" aria-hidden="true" />

      {/* Section Header - Exactly like Timeline */}
      <div className="text-center mb-8 sm:mb-12">
        <h2
          id="themes-heading"
          className="section-heading text-display-lg leading-tight"
        >
          HACKING THEMES
        </h2>
        <div
          className="w-24 h-1 bg-spidey-red mx-auto mt-4 mb-4 rounded-full"
          aria-hidden="true"
        />
        <p className="text-white/75 font-body text-body-base sm:text-body-lg max-w-2xl mx-auto leading-relaxed font-normal">
          Choose a problem space. Explore the opportunity. Build something useful.
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
      >
        {activeThemes.map((theme) => (
          <ThemeCard key={theme.id} theme={theme} />
        ))}
      </div>
    </section>
  );
}
