"use client";

import { useRef, useEffect } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  href,
  onClick,
  className = "",
  variant = "outline",
  type = "button",
}: ButtonProps) {
  const btnRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  // Magnetic cursor interaction using Framer Motion springs (Von Restorff / Primary CTA)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (variant !== "primary" || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Shift slightly toward cursor within a small radius (~12px)
    x.set(distanceX * 0.2);
    y.set(distanceY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // GSAP low-intensity subtle pulse glow on Primary CTA (~2s loop)
  useEffect(() => {
    if (variant !== "primary" || !glowRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, {
        boxShadow: "0 0 35px 8px rgba(230, 36, 41, 0.65), 0 0 15px 2px rgba(230, 36, 41, 0.8)",
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => ctx.revert();
  }, [variant]);

  const baseStyles =
    "relative inline-flex items-center justify-center font-accent font-bold uppercase tracking-wider text-xs sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-md transition-colors duration-200 focus:outline-none select-none";

  // Von Restorff rule: "primary" is the ONLY solid filled button on the entire page.
  // Every other button is outlined / ghost style.
  const variantStyles = {
    primary:
      "bg-spidey-red text-web-white shadow-[0_0_20px_rgba(230,36,41,0.5)] border border-spidey-red/80 hover:bg-[#c9181d]",
    secondary:
      "bg-transparent text-web-white border border-spidey-blue/70 hover:bg-spidey-blue/20 hover:border-spidey-blue hover:shadow-[0_0_20px_rgba(29,78,216,0.35)]",
    outline:
      "bg-transparent text-web-white border border-spidey-red/60 hover:bg-spidey-red/15 hover:border-spidey-red hover:shadow-[0_0_20px_rgba(230,36,41,0.35)]",
  };

  const content = (
    <motion.span
      style={variant === "primary" ? { x: springX, y: springY } : undefined}
      whileTap={{ scale: 0.96 }}
      className="inline-flex items-center justify-center gap-2 w-full h-full"
    >
      {variant === "primary" && (
        <span
          ref={glowRef}
          className="absolute inset-0 rounded-md pointer-events-none transition-shadow shadow-[0_0_18px_2px_rgba(230,36,41,0.4)]"
          aria-hidden="true"
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.span>
  );

  if (href) {
    return (
      <Link
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {content}
    </button>
  );
}
