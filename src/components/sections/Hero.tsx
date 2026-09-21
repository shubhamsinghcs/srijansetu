"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_TAGLINE, REGISTRATION_START } from "@/lib/constants";
import { heroPartnerLogos } from "@/data";
import DevfolioButton from "@/components/ui/DevfolioButton";
import Countdown from "@/components/ui/Countdown";
import WebDivider from "@/components/ui/WebDivider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  eventDate?: string;
}

export default function Hero({ eventDate = REGISTRATION_START }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<SVGSVGElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 1. GSAP ScrollTrigger entrance animation (runs once on first scroll into view)
  useEffect(() => {
    if (!sectionRef.current || !heroContentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(heroContentRef.current, {
        y: 35,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        once: true,
      });

      // Subtle particle drift using GSAP (Peak-End Rule: Hero craft)
      if (particlesRef.current) {
        gsap.to(particlesRef.current.querySelectorAll(".drift-node"), {
          y: "-=25",
          x: "+=12",
          duration: 4.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.4,
            from: "random",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Subtle mouse movement parallax calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientWidth, clientHeight } = e.currentTarget;
    const x = (e.clientX / clientWidth - 0.5) * 16;
    const y = (e.clientY / clientHeight - 0.5) * 16;
    setMousePos({ x, y });
  };

  // Diagonal web-shooter lines
  const webShooterLines = [
    { id: "line-1", d: "M -40 -40 L 580 420", stroke: "#E62429", delay: 0.15, duration: 0.9 },
    { id: "line-2", d: "M 1150 -60 L 380 620", stroke: "#F5F5F5", delay: 0.35, duration: 1.1 },
    { id: "line-3", d: "M -60 580 L 720 -40", stroke: "#E62429", delay: 0.55, duration: 1.0 },
    { id: "line-4", d: "M 1080 760 L 220 140", stroke: "#F5F5F5", delay: 0.75, duration: 1.2 },
    { id: "line-5", d: "M 120 -40 L 840 680", stroke: "#E62429", delay: 0.45, duration: 0.95 },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col items-center justify-between text-center px-4 sm:px-6 lg:px-8 pt-2 sm:pt-2 md:pt-2 pb-2 overflow-hidden"
    >
      {/* 4. Radial Spotlight Vignette: Bright/transparent at center, fading to web-black at viewport edges */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 48%, rgba(230, 36, 41, 0.12) 0%, rgba(29, 78, 216, 0.05) 35%, rgba(10, 10, 15, 0.85) 75%, #0A0A0F 100%)",
        }}
        aria-hidden="true"
      />

      {/* 7. Camera-Viewfinder Corner-Bracket Accents (pure accents, no HUD text labels) */}
      <div className="corner-bracket top-3 left-3 sm:top-6 sm:left-6 border-t-2 border-l-2" />
      <div className="corner-bracket top-3 right-3 sm:top-6 sm:right-6 border-t-2 border-r-2" />
      <div className="corner-bracket bottom-14 left-3 sm:bottom-16 sm:left-6 border-b-2 border-l-2" />
      <div className="corner-bracket bottom-14 right-3 sm:bottom-16 sm:right-6 border-b-2 border-r-2" />

      {/* 2. Subtle Web Parallax Layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15 scale-105"
        style={{
          backgroundImage: "url('/images/backgrounds/web-pattern.svg')",
          backgroundRepeat: "repeat",
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: "transform 0.25s cubic-bezier(0.15, 0.85, 0.35, 1)",
        }}
        aria-hidden="true"
      />

      {/* 3. Subtle GSAP Drifting Particle Nodes */}
      <svg
        ref={particlesRef}
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
        fill="none"
        aria-hidden="true"
      >
        <circle className="drift-node" cx="15%" cy="25%" r="2" fill="#E62429" opacity="0.4" />
        <circle className="drift-node" cx="82%" cy="30%" r="2.5" fill="#E62429" opacity="0.35" />
        <circle className="drift-node" cx="28%" cy="70%" r="1.5" fill="#F5F5F5" opacity="0.3" />
        <circle className="drift-node" cx="75%" cy="65%" r="2" fill="#F5F5F5" opacity="0.3" />
        <circle className="drift-node" cx="50%" cy="18%" r="1.8" fill="#1D4ED8" opacity="0.4" />
        <circle className="drift-node" cx="88%" cy="80%" r="2.2" fill="#1D4ED8" opacity="0.35" />
      </svg>

      {/* 4. Diagonal Web-Shooter Filament Animation */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
        viewBox="0 0 1000 700"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        {webShooterLines.map((line) => (
          <motion.path
            key={line.id}
            d={line.d}
            stroke={line.stroke}
            strokeWidth="1.5"
            strokeDasharray="20 10"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1],
              opacity: [0, 0.9, 0.2],
            }}
            transition={{
              duration: line.duration,
              delay: line.delay,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 4.5,
            }}
          />
        ))}
      </svg>

      {/* Central Danger Sense Glow */}
      <div className="danger-sense-glow top-1/2" aria-hidden="true" />

      {/* 5. Hero Content Container */}
      <div ref={heroContentRef} className="relative z-10 max-w-5xl mx-auto flex flex-col items-center w-full my-auto">
        {/* Partner / Organizing Bodies Logos — Ultra-4K HD, Only Logos directly on background */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-2 sm:mb-4 w-full max-w-4xl lg:max-w-5xl px-4 flex items-center justify-center gap-3 xs:gap-5 sm:gap-7 md:gap-10 lg:gap-12 flex-wrap sm:flex-nowrap"
        >
          {heroPartnerLogos.map((sponsor) => (
            <motion.div
              key={sponsor.name}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center flex-shrink-0 cursor-pointer"
            >
              <Image
                src={sponsor.src}
                alt={sponsor.name}
                width={240}
                height={120}
                unoptimized
                priority
                className={`${sponsor.heightClass} w-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Eyebrow Tag */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mb-2 sm:mb-3"
        >
          <span className="pill-badge pill-badge-red">
            24-HOUR NATIONAL HACKATHON
          </span>
        </motion.div>

        {/* H1 Display Heading with Soft Drop-Shadow Glow */}
        <div className="relative">
          {/* Soft ambient glow beneath SRIJAN SETU wordmark to lift it off the background */}
          <div
            className="absolute inset-0 -inset-y-4 bg-spidey-red/20 filter blur-3xl rounded-full pointer-events-none -z-10"
            aria-hidden="true"
          />
          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="font-samarkan text-display-2xl leading-tight tracking-normal max-w-full text-spidey-red drop-shadow-[0_8px_32px_rgba(230,36,41,0.65)] hover:text-web-white transition-colors duration-300 select-none"
          >
            SRIJAN SETU
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mt-2 sm:mt-3 text-display-md font-semibold uppercase tracking-[0.14em] text-web-white px-2"
        >
          {SITE_TAGLINE}
        </motion.h2>

        {/* 5. Supporting Description Line: web-white at 75% opacity for crisp text contrast */}
        {/* <p className="mt-2 sm:mt-3 max-w-2xl text-body-sm sm:text-body-md text-white/75 leading-relaxed px-2">
          {EVENT_TYPE} &bull; Registration opens 10th Oct, 7:30 AM. Uniting visionary developers, designers, and innovators to transform complex challenges into breakthrough technological realities.
        </p> */}

        {/* 6. Hero-Anchored Glassmorphic Digital Countdown Display */}
        <div className="mt-4 sm:mt-6 w-full flex justify-center px-2">
          <Countdown targetDate={eventDate} />
        </div>

        {/* 8. Focal Point CTA: Apply with Devfolio */}
        <div className="mt-4 sm:mt-6 flex flex-col items-center">
          <DevfolioButton />

          {/* Scarcity / Urgency Microcopy */}
          <span className="mt-6 font-accent text-caption-xs font-bold uppercase tracking-widest text-white/60 select-none">
            Limited team slots
          </span>
        </div>
      </div>

      {/* Section Transition Web Divider */}
      <div className="relative z-10 w-full mt-4 sm:mt-6">
        <WebDivider />
      </div>
    </section>
  );
}
