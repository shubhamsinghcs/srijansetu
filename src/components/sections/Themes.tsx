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
  const headingRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const activeThemes = themes.filter((theme) => theme.active).sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !gridRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          once: true,
        },
      });

      if (titleRef.current) {
        tl.from(titleRef.current, {
          y: 28,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      }

      if (dividerRef.current) {
        tl.from(
          dividerRef.current,
          {
            scaleX: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }

      if (subtitleRef.current) {
        tl.from(
          subtitleRef.current,
          {
            y: 16,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.25"
        );
      }

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
      className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24 lg:px-8 scroll-mt-20"
    >
      <div id="problem-statements" className="sr-only" aria-hidden="true" />
      <div ref={headingRef} className="mb-10 text-center sm:mb-14">
        <h2
          ref={titleRef}
          id="themes-heading"
          className="section-heading text-display-lg leading-tight"
        >
          HACKATHON THEMES
        </h2>
        <div
          ref={dividerRef}
          className="mx-auto mt-4 mb-4 h-1 w-24 rounded-full bg-spidey-red origin-center"
          aria-hidden="true"
        />
        <p
          ref={subtitleRef}
          className="mx-auto max-w-2xl px-4 font-body text-body-base font-normal leading-relaxed text-white/75 sm:text-body-lg"
        >
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
