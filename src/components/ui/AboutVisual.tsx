"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AboutVisualProps {
  aboutSectionRef?: React.RefObject<HTMLElement>;
  className?: string;
}

export default function AboutVisual({ aboutSectionRef, className = "" }: AboutVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const entranceRef = useRef<HTMLDivElement>(null);
  const kenBurnsRef = useRef<HTMLDivElement>(null);

  // Check prefers-reduced-motion using Framer Motion's hook
  const shouldReduceMotion = useReducedMotion();

  // 4. INTERACTIVE HOVER/PARALLAX — Framer Motion 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Map cursor position (0 to 1) to max ±6 degrees tilt
  const rotateX = useTransform(mouseY, [0, 1], [6, -6]);
  const rotateY = useTransform(mouseX, [0, 1], [-6, 6]);

  // Spring transition: stiffness 150, damping 20
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    mouseX.set(xPos);
    mouseY.set(yPos);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // 2. ENTRANCE ANIMATION & 3. IDLE MICRO-MOTION — GSAP
  useEffect(() => {
    const entranceEl = entranceRef.current;
    const kenBurnsEl = kenBurnsRef.current;
    const triggerEl = aboutSectionRef?.current || containerRef.current;

    if (!entranceEl || !kenBurnsEl) return;

    // 5. ACCESSIBILITY: when reduced motion is preferred, show final state immediately
    if (shouldReduceMotion) {
      gsap.set(entranceEl, { scale: 1, opacity: 1, y: 0 });
      gsap.set(kenBurnsEl, { scale: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Set initial entrance state
      gsap.set(entranceEl, {
        scale: 0.9,
        opacity: 0,
        y: 40,
        force3D: true,
      });

      // 2. ScrollTrigger Entrance: scale(0.9) -> 1, opacity 0 -> 1, y 40 -> 0 over ~1s with power3.out
      const entranceTween = gsap.to(entranceEl, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: triggerEl,
          start: "top 70%",
          toggleActions: "play none none none",
          once: true,
        },
        onComplete: () => {
          // 3. IDLE MICRO-MOTION (Ken Burns-style effect after entrance)
          // Scale drift: 1.0 -> 1.08 over 22s looping with sine.inOut
          gsap.to(kenBurnsEl, {
            scale: 1.08,
            duration: 22,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            force3D: true,
          });

          // Offset vertical drift: y: -6px over 13s so timing isn't mechanically synced
          gsap.to(kenBurnsEl, {
            y: -6,
            duration: 13,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            force3D: true,
          });
        },
      });

      return () => {
        entranceTween.kill();
      };
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [aboutSectionRef, shouldReduceMotion]);

  // Framer Motion variants for hover border glow & duotone reveal
  const frameVariants: Variants = {
    initial: {
      borderColor: "rgba(230, 36, 41, 0.4)",
      boxShadow: "0 0 20px rgba(230, 36, 41, 0.25), 0 15px 35px rgba(0, 0, 0, 0.7)",
    },
    hover: {
      borderColor: "rgba(230, 36, 41, 0.85)",
      boxShadow: "0 0 35px rgba(230, 36, 41, 0.55), 0 0 15px rgba(230, 36, 41, 0.4), 0 20px 45px rgba(0, 0, 0, 0.85)",
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  const duotoneVariants: Variants = {
    initial: {
      opacity: 0.8,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    hover: {
      opacity: 0.35,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex items-center justify-center select-none ${className}`}
    >
      {/* Background Soft Atmospheric Red Halo */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(520px,90%)] aspect-square rounded-full blur-[50px] pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(230, 36, 41, 0.32) 0%, rgba(230, 36, 41, 0.12) 40%, rgba(29, 78, 216, 0.05) 65%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Layer 1: GSAP Entrance Wrapper */}
      <div
        ref={entranceRef}
        className="relative w-full max-w-[360px] xs:max-w-[420px] sm:max-w-[480px] md:max-w-[500px] lg:max-w-[520px] xl:max-w-[540px]"
        style={{
          perspective: "1200px",
        }}
      >
        {/* Layer 2: Framer Motion Interactive Tilt & Glowing Card Frame */}
        <motion.div
          variants={frameVariants}
          initial="initial"
          whileHover={shouldReduceMotion ? undefined : "hover"}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: shouldReduceMotion ? 0 : springRotateX,
            rotateY: shouldReduceMotion ? 0 : springRotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full aspect-square rounded-2xl border bg-[#0A0A0F]/90 backdrop-blur-md overflow-hidden cursor-pointer"
        >
          {/* Layer 3: Ken Burns Idle Motion Container (scale drift + vertical drift) */}
          <div
            ref={kenBurnsRef}
            className="relative w-full h-full will-change-transform"
            style={{ transformOrigin: "center 35%" }}
          >
            <Image
              src="/images/illustrations/spiderman-about.png"
              alt="Superior Spider-Man Portrait - Srijan Setu"
              width={1342}
              height={2048}
              priority
              className="w-full h-full object-cover object-top"
              sizes="(max-width: 640px) 360px, (max-width: 1024px) 500px, 540px"
            />
          </div>

          {/* 1. IMAGE TREATMENT A: Soft Vignette (Radial gradient dark at edges) */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, transparent 35%, rgba(10, 10, 15, 0.35) 70%, rgba(10, 10, 15, 0.9) 100%)",
            }}
            aria-hidden="true"
          />

          {/* 1. IMAGE TREATMENT B: Subtle Duotone / Color-Grade Overlay (mix-blend-color with spidey red/blue) */}
          <motion.div
            variants={duotoneVariants}
            className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-t from-spidey-red/20 via-transparent to-spidey-blue/10 mix-blend-color"
            aria-hidden="true"
          />

          {/* Corner Tech Web Accent Lines (Site Hero Language) */}
          <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t border-l border-spidey-red/70 pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t border-r border-spidey-red/70 pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b border-l border-spidey-red/70 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b border-r border-spidey-red/70 pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
}
