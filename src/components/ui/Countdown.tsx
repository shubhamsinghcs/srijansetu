"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useCountdown } from "@/hooks/useCountdown";

interface CountdownProps {
  targetDate?: string | Date;
  className?: string;
}

export default function Countdown({ targetDate, className = "" }: CountdownProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const daysBoxRef = useRef<HTMLDivElement>(null);
  const hoursBoxRef = useRef<HTMLDivElement>(null);
  const minutesBoxRef = useRef<HTMLDivElement>(null);
  const secondsBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // GSAP flash/glow pulse on seconds tick
  useEffect(() => {
    if (!isMounted || !secondsBoxRef.current) return;
    gsap.fromTo(
      secondsBoxRef.current,
      {
        borderColor: "rgba(230, 36, 41, 0.9)",
        boxShadow: "inset 0 0 22px rgba(230, 36, 41, 0.75), 0 0 16px rgba(230, 36, 41, 0.4)",
      },
      {
        borderColor: "rgba(230, 36, 41, 0.4)",
        boxShadow: "inset 0 0 14px rgba(230, 36, 41, 0.25), 0 0 0px rgba(0, 0, 0, 0)",
        duration: 0.5,
        ease: "power2.out",
      }
    );
  }, [seconds, isMounted]);

  // GSAP flash/glow pulse on minutes tick
  useEffect(() => {
    if (!isMounted || !minutesBoxRef.current) return;
    gsap.fromTo(
      minutesBoxRef.current,
      {
        borderColor: "rgba(230, 36, 41, 0.9)",
        boxShadow: "inset 0 0 24px rgba(230, 36, 41, 0.8), 0 0 18px rgba(230, 36, 41, 0.4)",
      },
      {
        borderColor: "rgba(230, 36, 41, 0.4)",
        boxShadow: "inset 0 0 14px rgba(230, 36, 41, 0.25), 0 0 0px rgba(0, 0, 0, 0)",
        duration: 0.6,
        ease: "power2.out",
      }
    );
  }, [minutes, isMounted]);

  // GSAP flash/glow pulse on hours tick
  useEffect(() => {
    if (!isMounted || !hoursBoxRef.current) return;
    gsap.fromTo(
      hoursBoxRef.current,
      {
        borderColor: "rgba(230, 36, 41, 0.9)",
        boxShadow: "inset 0 0 24px rgba(230, 36, 41, 0.8), 0 0 18px rgba(230, 36, 41, 0.4)",
      },
      {
        borderColor: "rgba(230, 36, 41, 0.4)",
        boxShadow: "inset 0 0 14px rgba(230, 36, 41, 0.25), 0 0 0px rgba(0, 0, 0, 0)",
        duration: 0.6,
        ease: "power2.out",
      }
    );
  }, [hours, isMounted]);

  // GSAP flash/glow pulse on days tick
  useEffect(() => {
    if (!isMounted || !daysBoxRef.current) return;
    gsap.fromTo(
      daysBoxRef.current,
      {
        borderColor: "rgba(230, 36, 41, 0.9)",
        boxShadow: "inset 0 0 24px rgba(230, 36, 41, 0.8), 0 0 18px rgba(230, 36, 41, 0.4)",
      },
      {
        borderColor: "rgba(230, 36, 41, 0.4)",
        boxShadow: "inset 0 0 14px rgba(230, 36, 41, 0.25), 0 0 0px rgba(0, 0, 0, 0)",
        duration: 0.6,
        ease: "power2.out",
      }
    );
  }, [days, isMounted]);

  const formatNumber = (num: number) => {
    return String(num).padStart(2, "0");
  };

  const counterItems = [
    { label: "Days", value: isMounted ? formatNumber(days) : "00", ref: daysBoxRef },
    { label: "Hours", value: isMounted ? formatNumber(hours) : "00", ref: hoursBoxRef },
    { label: "Minutes", value: isMounted ? formatNumber(minutes) : "00", ref: minutesBoxRef },
    { label: "Seconds", value: isMounted ? formatNumber(seconds) : "00", ref: secondsBoxRef },
  ];

  return (
    <div
      className={`relative flex items-center justify-center p-2.5 sm:p-4 rounded-2xl bg-web-black/70 backdrop-blur-xl border border-spidey-red/30 shadow-[0_0_35px_rgba(230,36,41,0.22)] gap-2 sm:gap-3.5 md:gap-5 ${className}`}
    >
      {/* Background subtle radial red beacon glow */}
      <div
        className="absolute inset-0 rounded-2xl bg-radial-gradient from-spidey-red/15 via-transparent to-transparent pointer-events-none blur-xl"
        aria-hidden="true"
      />

      {counterItems.map((item, idx) => (
        <div key={item.label} className="flex items-center">
          <div
            ref={item.ref}
            className="flex flex-col items-center justify-center w-14 h-16 xs:w-16 xs:h-18 sm:w-20 sm:h-22 md:w-24 md:h-26 rounded-xl bg-white/5 backdrop-blur-md border border-spidey-red/40 shadow-[inset_0_0_14px_rgba(230,36,41,0.25)] transition-colors duration-200 group"
          >
            <span className="font-accent text-2xl xs:text-3xl sm:text-3xl md:text-4xl font-black text-web-white tracking-tight group-hover:text-spidey-red transition-colors">
              {item.value}
            </span>
            <span className="text-[9px] xs:text-[10px] sm:text-xs font-accent font-bold uppercase tracking-widest text-white/70 group-hover:text-web-white transition-colors mt-0.5">
              {item.label}
            </span>
          </div>

          {/* Colon divider between digital modules */}
          {idx < counterItems.length - 1 && (
            <span
              className="font-accent text-spidey-red/60 font-black text-base sm:text-xl md:text-2xl mx-1 sm:mx-1.5 animate-pulse select-none"
              aria-hidden="true"
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
