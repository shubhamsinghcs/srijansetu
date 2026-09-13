"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WebDivider from "@/components/ui/WebDivider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxWrapRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const webARef = useRef<HTMLDivElement>(null);
  const webBRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const parallaxWrap = parallaxWrapRef.current;
    const character = characterRef.current;
    const glow = glowRef.current;
    const webA = webARef.current;
    const webB = webBRef.current;
    const title = titleRef.current;
    const intro = introRef.current;
    const divider = dividerRef.current;

    if (!parallaxWrap || !character || !glow || !webA || !webB || !title || !intro || !divider) return;

    const cards = cardsRef.current
      ? Array.from(cardsRef.current.querySelectorAll(".ss-about-card"))
      : [];

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set([character, parallaxWrap, glow, webA, webB, title, intro, ...cards], {
          opacity: 1,
          autoAlpha: 1,
        });
        gsap.set(character, { x: 0, y: 0, scale: 1 });
        gsap.set(parallaxWrap, { x: 0, y: 0, rotationX: 0, rotationY: 0 });
        gsap.set([title, intro], { y: 0 });
        gsap.set(cards, { y: 0, scale: 1 });
        gsap.set(divider, { width: "105px" });
        return;
      }

      /* =========================================================================
         STATE 2: Continuous Cinematic Rotation + Zoom Cycle
         ROTATE (smooth 360° at ~2.3s)
         → FAST ZOOM-IN (0.32s, power3.in)
         → FAST ZOOM-OUT (0.45s, expo.out)
         → SHORT SETTLE (0.22s, power2.out)
         → BRIEF PAUSE (0.15s)
         → REPEAT
         ========================================================================= */
      const loopTimeline = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatDelay: 0.15,
        defaults: { force3D: true },
      });

      loopTimeline
        // Phase 1: Full-Body Hero Rotation Hold (~5.0s)
        // Character turns at a moderate, cinematic showcase pace while maintaining pristine full-body framing
        .to(character, {
          scale: 1.0,
          y: 0,
          duration: 5.0,
          ease: "none",
        })
        // Subtle ambient atmospheric pulsation in sync with the rotation
        .to(webA, { rotation: "+=20", duration: 5.0, ease: "none" }, 0)
        .to(webB, { rotation: "-=18", duration: 5.0, ease: "none" }, 0)

        // Phase 2: FAST CINEMATIC ZOOM-IN (0.32s)
        // Torso and superhero suit detail push forward dramatically with intense hero presence
        .to(character, {
          scale: 1.34,
          y: -14,
          duration: 0.32,
          ease: "power3.in",
        })
        .to(
          glow,
          {
            scale: 1.25,
            opacity: 0.95,
            duration: 0.32,
            ease: "power3.in",
          },
          "<"
        )

        // Phase 3: FAST CINEMATIC ZOOM-OUT (0.45s)
        // Snaps cleanly back into ideal full-body hero framing
        .to(character, {
          scale: 0.985,
          y: 3,
          duration: 0.45,
          ease: "expo.out",
        })
        .to(
          glow,
          {
            scale: 1.0,
            opacity: 0.72,
            duration: 0.45,
            ease: "expo.out",
          },
          "<"
        )

        // Phase 4: SHORT SETTLE (0.22s)
        // Locks firmly into full-body framing with natural, premium deceleration
        .to(character, {
          scale: 1.0,
          y: 0,
          duration: 0.22,
          ease: "power2.out",
        });

      /* =========================================================================
         STATE 1: Fast Cinematic Entrance
         Starts slightly closer, swiftly zooms out into full-body position,
         then cleanly transitions into the continuous loop.
         ========================================================================= */
      gsap.set(character, {
        autoAlpha: 0,
        scale: 1.22,
        y: 20,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(parallaxWrap, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        force3D: true,
      });

      gsap.set(glow, {
        autoAlpha: 0,
        scale: 0.8,
        force3D: true,
      });

      gsap.set([webA, webB], {
        autoAlpha: 0,
        scale: 1.25,
        force3D: true,
      });

      gsap.set(title, {
        autoAlpha: 0,
        y: 32,
        force3D: true,
      });

      gsap.set(intro, {
        autoAlpha: 0,
        y: 22,
        force3D: true,
      });

      gsap.set(divider, {
        width: 0,
      });

      gsap.set(cards, {
        autoAlpha: 0,
        y: 32,
        scale: 0.98,
        force3D: true,
      });

      const entranceTimeline = gsap.timeline({
        paused: true,
        defaults: { force3D: true },
        onComplete: () => {
          // Seamlessly transition to the continuous rotation + zoom cycle
          loopTimeline.play();
        },
      });

      entranceTimeline
        .to(glow, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power2.out" }, 0)
        .to(webA, { autoAlpha: 0.28, scale: 1, duration: 0.5, ease: "power3.out" }, 0)
        .to(webB, { autoAlpha: 0.15, scale: 1, duration: 0.6, ease: "power3.out" }, 0.05)
        /* Fast Cinematic Entrance: Swoops down from 1.22 into 1.0 full-body frame */
        .to(
          character,
          {
            autoAlpha: 1,
            scale: 1.0,
            y: 0,
            duration: 0.65,
            ease: "expo.out",
          },
          0.05
        )
        .to(title, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.18)
        .to(divider, { width: "105px", duration: 0.35, ease: "power3.out" }, 0.32)
        .to(intro, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" }, 0.32)
        .to(
          cards,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.42
        )
        .to(".ss-card-line", { scaleY: 1, duration: 0.3 }, 0.58);

      /* Trigger entrance once when About section reaches 75% viewport */
      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        once: true,
        onEnter: () => {
          entranceTimeline.play();
        },
      });

      /* =========================================================================
         Subtle Mouse Parallax (Isolated on parallaxWrap — never disrupts loop)
         ========================================================================= */
      const quickRotX = gsap.quickTo(parallaxWrap, "rotationX", { duration: 0.45, ease: "power3.out" });
      const quickRotY = gsap.quickTo(parallaxWrap, "rotationY", { duration: 0.45, ease: "power3.out" });
      const quickX = gsap.quickTo(parallaxWrap, "x", { duration: 0.5, ease: "power3.out" });
      const quickGlowX = gsap.quickTo(glow, "x", { duration: 0.65, ease: "power3.out" });
      const quickGlowY = gsap.quickTo(glow, "y", { duration: 0.65, ease: "power3.out" });

      let mouseRAF: number | null = null;

      const handlePointerMove = (e: PointerEvent) => {
        const pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
        const pointerY = (e.clientY / window.innerHeight - 0.5) * 2;

        if (mouseRAF) cancelAnimationFrame(mouseRAF);
        mouseRAF = requestAnimationFrame(() => {
          quickRotY(pointerX * 4);
          quickRotX(-pointerY * 2.5);
          quickX(pointerX * 8);
          quickGlowX(pointerX * 16);
          quickGlowY(pointerY * 10);
        });
      };

      const handlePointerLeave = () => {
        quickRotX(0);
        quickRotY(0);
        quickX(0);
        quickGlowX(0);
        quickGlowY(0);
      };

      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      section.addEventListener("pointerleave", handlePointerLeave, { passive: true });

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        section.removeEventListener("pointerleave", handlePointerLeave);
        if (mouseRAF) cancelAnimationFrame(mouseRAF);
      };
    }, sectionRef);

    return () => ctx.revert();
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
        {/* LEFT: FULL-BODY 3D SPIDER-MAN HERO MOTION */}
        <div
          className="relative min-h-[480px] sm:min-h-[580px] lg:min-h-[720px] flex items-center justify-center overflow-visible order-1"
          aria-hidden="true"
        >
          {/* Atmospheric Red Glow Halo */}
          <div
            ref={glowRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(540px,44vw)] aspect-square rounded-full blur-[40px] pointer-events-none -z-10"
            style={{
              background:
                "radial-gradient(circle, rgba(230, 36, 41, 0.38) 0%, rgba(230, 36, 41, 0.18) 35%, rgba(230, 36, 41, 0.04) 65%, transparent 75%)",
            }}
          />

          {/* Web Radar Element A */}
          <div
            ref={webARef}
            className="absolute -inset-[20%] pointer-events-none -z-10 -rotate-12 scale-110"
            style={{
              backgroundImage:
                "repeating-radial-gradient(circle at 50% 50%, transparent 0 70px, rgba(255, 255, 255, 0.06) 71px 72px)",
              maskImage: "linear-gradient(to right, transparent, #000 25%, #000 75%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, #000 25%, #000 75%, transparent)",
            }}
          />

          {/* Web Radar Element B */}
          <div
            ref={webBRef}
            className="absolute -inset-[20%] pointer-events-none -z-10 rotate-12 scale-105"
            style={{
              backgroundImage:
                "repeating-radial-gradient(circle at 50% 50%, transparent 0 70px, rgba(230, 36, 41, 0.08) 71px 72px)",
              maskImage: "linear-gradient(to right, transparent, #000 25%, #000 75%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, #000 25%, #000 75%, transparent)",
            }}
          />

          {/* Isolated Parallax Wrapper — Receives mouse depth without interfering with character timeline */}
          <div
            ref={parallaxWrapRef}
            className="relative z-20 w-full flex items-center justify-center pointer-events-none"
            style={{
              perspective: "1200px",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Spider-Man Showcase Frame with Solid Sharp Banner */}
            <div className="relative w-full max-w-[340px] xs:max-w-[400px] sm:max-w-[480px] lg:max-w-[540px] xl:max-w-[580px] h-[480px] xs:h-[540px] sm:h-[620px] lg:h-[720px] xl:h-[760px] overflow-hidden select-none pointer-events-none rounded-2xl flex items-center justify-center shadow-[0_30px_45px_rgba(0,0,0,0.85),0_0_35px_rgba(230,36,41,0.35)]">
              {/* Spider-Man Full-Body Hero Canvas — Only character scales during zoom cycle */}
              <div
                ref={characterRef}
                id="ssCharacter"
                className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
                style={{
                  transformOrigin: "center center",
                  willChange: "transform, opacity",
                }}
              >
                <iframe
                  onLoad={() => {
                    setTimeout(() => setIsLoaded(true), 500);
                  }}
                  className={`absolute top-0 left-0 w-full h-[calc(100%+55px)] block border-0 outline-0 bg-transparent pointer-events-none transition-opacity duration-700 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  title="Spider-Man 3D Animation"
                  src="https://sketchfab.com/models/2773bbe25bf64e58bd64ab7b27dc53d4/embed?autostart=1&autospin=12&preload=1&transparent=1&ui_theme=dark&ui_infos=0&ui_controls=0&ui_watermark=0&ui_hint=0&ui_help=0&ui_settings=0&ui_inspector=0&ui_stop=0&scrollwheel=0&fov=58&dnt=1"
                  allow="autoplay; fullscreen"
                />

                {/* Seamless bottom boundary seal */}
                <div className="absolute -bottom-1 inset-x-0 h-3 bg-[#0A0A0F] pointer-events-none z-20" />
              </div>

              {/* Pin-Sharp Top Thematic Banner — Crystal clear, ultra-readable, rock solid */}
              <div className="absolute top-0 inset-x-0 h-12 pointer-events-none z-30 flex items-center justify-center bg-gradient-to-r from-[#991B1B] via-[#1d004c] to-[#991B1B] border-b border-red-400/40 shadow-[0_4px_20px_rgba(230,36,41,0.5)]">
                <div className="flex items-center gap-2.5 font-display text-xs xs:text-sm sm:text-[15px] font-black tracking-[0.22em] text-white uppercase antialiased drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="font-extrabold text-white">READY TO CONQUER?</span>
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: ABOUT CONTENT */}
        <div className="relative z-30 max-w-[650px] py-6 sm:py-10 order-2">
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
      </div>

      {/* Section Bottom Cracked-Web Divider */}
      <div className="relative z-10 w-full mt-8 sm:mt-12">
        <WebDivider />
      </div>
    </section>
  );
}
