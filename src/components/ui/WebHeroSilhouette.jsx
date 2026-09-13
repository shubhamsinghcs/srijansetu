"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * WebHeroSilhouette
 * An original spider-hero silhouette emerging from shadow on the right side of the About section.
 * Lit from within by pulsing red bioluminescent veins and glowing fissures.
 * Blended softly into the background with radial fade gradients.
 *
 * Layers:
 * 1. Deep ambient red aura & back-glow (radial blur)
 * 2. Dark semi-transparent base silhouette with elongated spider-hero proportions
 * 3. Spider-web dermal surface matrix texture
 * 4. Bioluminescent red energy fissures / cracked vein conduits running through torso, limbs & hands
 * 5. Focal red chest spider-node insignia
 * 6. Top edge specular rim lighting (red/blue edge rim highlight)
 *
 * Animations:
 * - Idle breathing scale oscillation (1.0 -> 1.015, ~4s loop) via GSAP
 * - Continuous pulsing energy waves flowing through limbs & veins via GSAP timeline
 * - ScrollTrigger scrub fade-in from 0 to 70% opacity + slight upward emergence
 * - Framer Motion mouse tilt (max 4-5 degrees) toward cursor for a subtle "watching you" effect
 */
export default function WebHeroSilhouette({ className = "" }) {
  const containerRef = useRef(null);
  const figureGroupRef = useRef(null);
  const glowVeinsRef = useRef(null);
  const energyPulseRef = useRef(null);

  // Framer motion mouse tilt values (-4.5 to +4.5 degrees)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useTransform(mouseX, [-1, 1], [-4.5, 4.5]);
  const rotateX = useTransform(mouseY, [-1, 1], [4.5, -4.5]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Track mouse within section / container for subtle tilt
    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseX.set(Math.max(-1, Math.min(1, x)));
      mouseY.set(Math.max(-1, Math.min(1, y)));
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const ctx = gsap.context(() => {
      // 1. Scroll-driven entrance: fades from 0 to ~70% and shifts up slightly
      // Scrub is tied strictly to scroll position through the About section
      gsap.fromTo(
        container,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 0.72,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            end: "center 50%",
            scrub: 0.8,
          },
        }
      );

      // 2. Idle state: slow breathing-like scale pulse (1.0 to 1.015, ~4s loop)
      if (figureGroupRef.current) {
        gsap.to(figureGroupRef.current, {
          scaleX: 1.015,
          scaleY: 1.018,
          transformOrigin: "50% 90%",
          duration: 3.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // 3. Red glow/vein layer: continuous pulsing energy waves moving through limbs
      if (glowVeinsRef.current) {
        gsap.to(glowVeinsRef.current, {
          opacity: 0.45,
          filter: "drop-shadow(0 0 16px #E62429) drop-shadow(0 0 4px #FF4D52)",
          duration: 2.2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // 4. Energy pulse node along central core
      if (energyPulseRef.current) {
        gsap.to(energyPulseRef.current, {
          r: 32,
          opacity: 0.8,
          duration: 1.9,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, container);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      ctx.revert();
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full h-full flex items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Ambient Red Bioluminescence Core Diffusion Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[85%] h-[80%] rounded-full bg-radial-gradient from-[#E62429]/25 via-[#E62429]/08 to-transparent blur-3xl opacity-75 animate-pulse" />
      </div>

      <svg
        viewBox="0 0 520 820"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[750px] object-contain overflow-visible"
        style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))" }}
      >
        <defs>
          {/* Linear gradient for silhouette dark body fading seamlessly into shadows at bottom/edges */}
          <linearGradient id="bodyDarkGrad" x1="260" y1="50" x2="260" y2="820" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#14141E" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#0B0B12" stopOpacity="0.92" />
            <stop offset="75%" stopColor="#08080D" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0A0A0F" stopOpacity="0.0" />
          </linearGradient>

          {/* Red rim lighting gradient */}
          <linearGradient id="rimRedGrad" x1="100" y1="100" x2="420" y2="700" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E62429" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FF3338" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.5" />
          </linearGradient>

          {/* Bioluminescent vein glow filter */}
          <filter id="veinGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft inner core gradient */}
          <radialGradient id="coreGlow" cx="260" cy="330" r="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E62429" stopOpacity="0.75" />
            <stop offset="40%" stopColor="#E62429" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#E62429" stopOpacity="0" />
          </radialGradient>

          {/* Spider-Web Dermal Matrix Pattern */}
          <pattern id="webSkinPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 20 40 M 0 20 L 40 20 M 0 0 L 40 40 M 40 0 L 0 40"
              stroke="#E62429"
              strokeWidth="0.5"
              strokeOpacity="0.12"
            />
            <circle cx="20" cy="20" r="8" stroke="#E62429" strokeWidth="0.4" strokeOpacity="0.10" fill="none" />
            <circle cx="20" cy="20" r="14" stroke="#F5F5F5" strokeWidth="0.4" strokeOpacity="0.08" fill="none" />
          </pattern>
        </defs>

        {/* ========================================================
            FIGURE GROUP WITH ANIMATED IDLE BREATHING SCALE
            ======================================================== */}
        <g ref={figureGroupRef} id="silhouette-figure">
          {/* 1. BACKDROP AMBIENT GLOW LAYER BEHIND BODY */}
          <ellipse cx="260" cy="350" rx="130" ry="210" fill="url(#coreGlow)" opacity="0.8" />

          {/* 2. BASE SILHOUETTE BODY (Original Humanoid with Elongated Agile Limbs & Crouched/Emerging Stance) */}
          <g id="base-silhouette-geometry">
            {/* Head & Neck */}
            <path
              d="M 260 90 
                 C 238 90 224 110 224 135 
                 C 224 165 240 195 260 205 
                 C 280 195 296 165 296 135 
                 C 296 110 282 90 260 90 Z"
              fill="url(#bodyDarkGrad)"
              stroke="#E62429"
              strokeWidth="1.2"
              strokeOpacity="0.6"
            />
            {/* Trapezoids / Neck */}
            <path
              d="M 242 195 L 210 230 L 310 230 L 278 195 Z"
              fill="url(#bodyDarkGrad)"
              opacity="0.9"
            />

            {/* Torso & Abdomen (Athletic, Elongated Spider Hero proportions) */}
            <path
              d="M 210 230 
                 C 190 245 175 275 185 320 
                 C 192 355 205 390 220 440 
                 C 228 468 235 510 240 540
                 L 280 540
                 C 285 510 292 468 300 440
                 C 315 390 328 355 335 320
                 C 345 275 330 245 310 230
                 Z"
              fill="url(#bodyDarkGrad)"
              stroke="url(#rimRedGrad)"
              strokeWidth="1.2"
              strokeOpacity="0.75"
            />

            {/* Left Arm (Elongated limb flexing forward into space) */}
            <path
              d="M 195 245 
                 C 165 270 135 315 118 375 
                 C 105 425 90 490 75 550 
                 C 68 578 58 605 52 625 
                 C 58 630 72 625 82 605 
                 C 98 555 120 460 138 410 
                 C 152 370 180 320 202 285 Z"
              fill="url(#bodyDarkGrad)"
              stroke="#E62429"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            {/* Left Hand / Splayed Claws gripping web tension */}
            <path
              d="M 52 625 C 42 642 35 660 30 672 C 34 670 42 654 48 642 Z"
              fill="#E62429"
              opacity="0.7"
            />
            <path
              d="M 54 628 C 48 648 45 668 44 682 C 48 678 53 660 56 644 Z"
              fill="#E62429"
              opacity="0.8"
            />
            <path
              d="M 58 626 C 60 646 64 668 68 680 C 70 674 68 656 64 640 Z"
              fill="#E62429"
              opacity="0.65"
            />

            {/* Right Arm (Elongated limb angled backward/holding line) */}
            <path
              d="M 325 245 
                 C 355 270 385 315 402 375 
                 C 415 425 430 490 445 550 
                 C 452 578 462 605 468 625 
                 C 462 630 448 625 438 605 
                 C 422 555 400 460 382 410 
                 C 368 370 340 320 318 285 Z"
              fill="url(#bodyDarkGrad)"
              stroke="#E62429"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            {/* Right Hand / Fingertips */}
            <path
              d="M 468 625 C 478 642 485 660 490 672 C 486 670 478 654 472 642 Z"
              fill="#E62429"
              opacity="0.7"
            />
            <path
              d="M 466 628 C 472 648 475 668 476 682 C 472 678 467 660 464 644 Z"
              fill="#E62429"
              opacity="0.8"
            />
            <path
              d="M 462 626 C 460 646 456 668 452 680 C 450 674 452 656 456 640 Z"
              fill="#E62429"
              opacity="0.65"
            />

            {/* Left Thigh & Lower Leg (crouched stealth pose, vanishing into dark fog) */}
            <path
              d="M 238 520 
                 C 210 560 178 625 155 690 
                 C 140 735 125 780 115 820 
                 L 165 820 
                 C 180 770 205 700 235 640 
                 C 255 600 265 560 262 530 Z"
              fill="url(#bodyDarkGrad)"
              stroke="url(#rimRedGrad)"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />

            {/* Right Thigh & Lower Leg */}
            <path
              d="M 282 520 
                 C 310 560 342 625 365 690 
                 C 380 735 395 780 405 820 
                 L 355 820 
                 C 340 770 315 700 285 640 
                 C 265 600 255 560 258 530 Z"
              fill="url(#bodyDarkGrad)"
              stroke="url(#rimRedGrad)"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
          </g>

          {/* 3. SUBTLE WEB-LINE DERMAL TEXTURE OVERLAY ACROSS BODY */}
          <g id="web-skin-matrix" opacity="0.65">
            {/* Masked by body contours */}
            <path
              d="M 224 135 C 224 195 240 205 260 205 C 280 205 296 195 296 135 Z"
              fill="url(#webSkinPattern)"
              opacity="0.3"
            />
            <path
              d="M 200 240 C 180 280 190 350 220 440 L 300 440 C 330 350 340 280 320 240 Z"
              fill="url(#webSkinPattern)"
              opacity="0.35"
            />
          </g>

          {/* 4. BIOLUMINESCENT RED-VEINED CRACKS OF LIGHT (Energy Conduits) */}
          <g ref={glowVeinsRef} id="red-vein-energy-matrix" filter="url(#veinGlow)">
            {/* Core Neural / Spine Fissure */}
            <path
              d="M 260 110 L 260 170 Q 258 190 260 215 L 260 320 Q 262 360 258 410 L 260 480 Q 260 520 260 540"
              stroke="#E62429"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="14 4"
            />
            <path
              d="M 260 130 L 254 150 L 266 175 L 260 200 L 257 260 L 264 310 L 258 380 L 262 450"
              stroke="#FF4D52"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Cranial Vein Branches */}
            <path
              d="M 260 120 Q 242 125 235 140 M 260 120 Q 278 125 285 140"
              stroke="#E62429"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M 260 150 Q 240 160 232 175 M 260 150 Q 280 160 288 175"
              stroke="#E62429"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Chest / Sternal Spider Branching Conduits */}
            <path
              d="M 260 270 Q 225 280 195 295 L 165 315 M 260 270 Q 295 280 325 295 L 355 315"
              stroke="#E62429"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M 260 310 Q 220 325 185 350 L 150 380 M 260 310 Q 300 325 335 350 L 370 380"
              stroke="#E62429"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M 260 350 Q 230 375 205 410 L 180 450 M 260 350 Q 290 375 315 410 L 340 450"
              stroke="#E62429"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Left Arm Energy Veins (running down elongated limb) */}
            <path
              d="M 195 255 Q 165 290 145 350 Q 125 410 105 480 Q 90 540 70 610"
              stroke="#E62429"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="20 6"
            />
            <path
              d="M 145 350 L 132 385 L 140 420 L 120 470 L 105 520 L 80 580 L 58 630"
              stroke="#FF3338"
              strokeWidth="1"
              strokeLinecap="round"
            />

            {/* Right Arm Energy Veins */}
            <path
              d="M 325 255 Q 355 290 375 350 Q 395 410 415 480 Q 430 540 450 610"
              stroke="#E62429"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="20 6"
            />
            <path
              d="M 375 350 L 388 385 L 380 420 L 400 470 L 415 520 L 440 580 L 462 630"
              stroke="#FF3338"
              strokeWidth="1"
              strokeLinecap="round"
            />

            {/* Left Leg Fissure Veins */}
            <path
              d="M 240 540 Q 215 600 190 670 Q 165 740 140 810"
              stroke="#E62429"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="18 5"
            />
            <path
              d="M 215 600 L 225 640 L 205 690 L 180 750 L 155 810"
              stroke="#FF4D52"
              strokeWidth="1"
              strokeLinecap="round"
            />

            {/* Right Leg Fissure Veins */}
            <path
              d="M 280 540 Q 305 600 330 670 Q 355 740 380 810"
              stroke="#E62429"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="18 5"
            />
            <path
              d="M 305 600 L 295 640 L 315 690 L 340 750 L 365 810"
              stroke="#FF4D52"
              strokeWidth="1"
              strokeLinecap="round"
            />

            {/* Central Bio-luminescent Energy Core Node */}
            <circle
              ref={energyPulseRef}
              cx="260"
              cy="295"
              r="22"
              fill="#E62429"
              opacity="0.65"
              filter="drop-shadow(0 0 12px #E62429)"
            />
            <circle cx="260" cy="295" r="10" fill="#FFFFFF" opacity="0.85" />
          </g>

          {/* 5. TENSILE WEB FILAMENT SUSPENSION (Gripped in hands, framing figure) */}
          <g id="filament-lines" opacity="0.45">
            {/* Web line from left hand into upper darkness */}
            <path
              d="M 52 625 Q 120 400 210 0"
              stroke="#F5F5F5"
              strokeWidth="1"
              strokeDasharray="12 4"
            />
            <path
              d="M 52 625 Q 100 420 180 0"
              stroke="#E62429"
              strokeWidth="0.8"
            />

            {/* Web line from right hand into upper right ceiling */}
            <path
              d="M 468 625 Q 400 400 310 0"
              stroke="#F5F5F5"
              strokeWidth="1"
              strokeDasharray="12 4"
            />
            <path
              d="M 468 625 Q 420 420 340 0"
              stroke="#E62429"
              strokeWidth="0.8"
            />
          </g>
        </g>
      </svg>
    </motion.div>
  );
}
