"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WebDivider from "@/components/ui/WebDivider";
import AboutVisual from "@/components/ui/AboutVisual";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const title = titleRef.current;
    const intro = introRef.current;
    const divider = dividerRef.current;

    if (!title || !intro || !divider) return;

    const cards = cardsRef.current
      ? Array.from(cardsRef.current.querySelectorAll(".ss-about-card"))
      : [];

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set([title, intro, ...cards], {
          opacity: 1,
          autoAlpha: 1,
          y: 0,
          scale: 1,
        });
        gsap.set(divider, { width: "105px" });
        return;
      }

      // Initial state for text content
      gsap.set(title, { autoAlpha: 0, y: 32, force3D: true });
      gsap.set(intro, { autoAlpha: 0, y: 22, force3D: true });
      gsap.set(divider, { width: 0 });
      gsap.set(cards, { autoAlpha: 0, y: 32, scale: 0.98, force3D: true });

      // Text entrance timeline triggered when section enters viewport
      const textTimeline = gsap.timeline({
        paused: true,
        defaults: { force3D: true },
      });

      textTimeline
        .to(title, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" })
        .to(divider, { width: "105px", duration: 0.35, ease: "power3.out" }, "-=0.2")
        .to(intro, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" }, "-=0.15")
        .to(
          cards,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.1"
        )
        .to(".ss-card-line", { scaleY: 1, duration: 0.35, ease: "power2.out" }, "-=0.2");

      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none none",
        once: true,
        onEnter: () => {
          textTimeline.play();
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-[100svh] overflow-hidden text-white border-y border-[#E62429]/20"
      style={{
        background:
          "radial-gradient(circle at 20% 50%, rgba(230, 36, 41, 0.12), transparent 34%), radial-gradient(circle at 80% 50%, rgba(29, 78, 216, 0.08), transparent 30%), #0A0A0F",
        isolation: "isolate",
      }}
    >
      <div className="relative z-10 w-[min(1380px,92vw)] min-h-[100svh] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8 sm:gap-12 lg:gap-16 py-12 sm:py-16">
        {/* LEFT: ABOUT CONTENT (text stays on the left, unchanged) */}
        <div className="relative z-30 max-w-[650px] py-6 sm:py-10 order-1 lg:order-1">
          {/* Label */}
          <div className="inline-flex items-center gap-2.5 mb-4 text-[#E62429] font-body text-[11px] font-extrabold tracking-[0.22em] uppercase">
            <span className="w-8 h-[1px] bg-[#E62429]" />
            INTEL / DOSSIER
          </div>

          {/* Section Title */}
          <h2
            ref={titleRef}
            className="m-0 font-display text-[clamp(44px,5.5vw,76px)] leading-[0.95] font-extrabold uppercase tracking-tight text-white drop-shadow-[0_0_25px_rgba(230,36,41,0.25)]"
          >
            ABOUT <span className="text-[#E62429] [-webkit-text-stroke:1px_rgba(230,36,41,0.35)]">US</span>
          </h2>

          {/* Divider */}
          <div
            ref={dividerRef}
            className="h-[2px] my-5 bg-gradient-to-r from-[#E62429] to-transparent rounded-full"
          />

          {/* Intro Paragraph */}
          <p
            ref={introRef}
            className="max-w-[600px] mb-8 text-white/80 font-body text-[clamp(15px,1.2vw,17px)] leading-relaxed"
          >
            A national nexus engineered to catalyze ground-level problem discovery and breakthrough
            prototype deployment.
          </p>

          {/* Content Cards */}
          <div ref={cardsRef} className="grid gap-4">
            <article className="ss-about-card group relative p-6 sm:p-7 border border-white/10 hover:border-[#E62429]/50 rounded-[14px] bg-gradient-to-br from-white/[0.05] to-white/[0.015] backdrop-blur-xl overflow-hidden transition-colors duration-300">
              <span className="ss-card-line absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-[#E62429] to-transparent origin-center scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />
              <h3 className="m-0 mb-2 text-white font-body text-[clamp(17px,1.35vw,21px)] font-bold tracking-tight">
                Bridging The Chasm Between Challenge &amp; Solution
              </h3>
              <p className="m-0 text-white/70 font-body text-sm sm:text-base leading-relaxed">
                Srijan Setu is a national innovation conclave engineered to eliminate the disconnect
                between ground-level community challenges and scalable technical solutions.
              </p>
            </article>

            <article className="ss-about-card group relative p-6 sm:p-7 border border-white/10 hover:border-[#1D4ED8]/50 rounded-[14px] bg-gradient-to-br from-white/[0.05] to-white/[0.015] backdrop-blur-xl overflow-hidden transition-colors duration-300">
              <span className="ss-card-line absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-[#1D4ED8] to-transparent origin-center scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />
              <h3 className="m-0 mb-2 text-white font-body text-[clamp(17px,1.35vw,21px)] font-bold tracking-tight">
                Ecosystem of Collaborative Prototyping
              </h3>
              <p className="m-0 text-white/70 font-body text-sm sm:text-base leading-relaxed">
                Bringing together developers, product designers, and researchers, the initiative
                establishes an intensive 24-hour sandbox for rapid prototype fabrication, peer review,
                and deployment.
              </p>
            </article>
          </div>
        </div>

        {/* RIGHT: PREMIUM MOTION-RICH VISUAL SLOT */}
        <div className="relative flex items-center justify-center order-2 lg:order-2">
          <AboutVisual aboutSectionRef={sectionRef} />
        </div>
      </div>

      {/* Section Bottom Cracked-Web Divider */}
      <div className="relative z-10 w-full mt-8 sm:mt-12">
        <WebDivider />
      </div>
    </section>
  );
}
