"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface DevfolioButtonProps {
  href?: string;
  hackathonSlug?: string;
  className?: string;
}

export default function DevfolioButton({
  href,
  hackathonSlug = "srijan-setu",
  className = "",
}: DevfolioButtonProps) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const targetHref = href || `https://${hackathonSlug}.devfolio.co/`;

  // Magnetic cursor interaction using Framer Motion springs
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Subtle magnetic attraction
    x.set(distanceX * 0.18);
    y.set(distanceY * 0.18);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.a
        ref={btnRef}
        href={targetHref}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative inline-flex items-center justify-center h-[44px] px-6 sm:px-8 rounded-[4px] bg-white text-[#0A0A0F] font-semibold text-[17px] sm:text-[18px] tracking-normal shadow-[0_4px_24px_rgba(0,0,0,0.6),0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_4px_30px_rgba(230,36,41,0.55),0_0_30px_rgba(255,255,255,0.6)] transition-all duration-300 select-none cursor-pointer ${className}`}
        aria-label="Apply with Devfolio"
      >
        {/* Official Devfolio Folded Logo */}
        <svg
          className="w-[26px] h-[26px] mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 115.46 123.46"
          fill="#000000"
        >
          <path
            d="M115.46 68a55.43 55.43 0 0 1-50.85 55.11S28.12 124 16 123a12.6 12.6 0 0 1-10.09-7.5 15.85 15.85 0 0 0 5.36 1.5c4 .34 10.72.51 20.13.51 13.82 0 28.84-.38 29-.38h.26a60.14 60.14 0 0 0 54.72-52.47c.05 1.05.08 2.18.08 3.34z"
          />
          <path
            d="M110.93 55.87A55.43 55.43 0 0 1 60.08 111s-36.48.92-48.58-.12C5 110.29.15 104.22 0 97.52l.2-83.84C.38 7 5.26.94 11.76.41c12.11-1 48.59.12 48.59.12a55.41 55.41 0 0 1 50.58 55.34z"
          />
        </svg>

        <span className="font-accent font-bold text-[#111118]">
          Apply with Devfolio
        </span>
      </motion.a>
    </motion.div>
  );
}
