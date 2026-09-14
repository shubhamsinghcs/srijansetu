"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { navItems, NavItem } from "@/data/nav";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      // Toggle glassmorphism after scrolling past 40px
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section based on scroll position
      const allSections = ["home", ...navItems.map((item) => item.href.replace("#", ""))];
      const scrollPosition = window.scrollY + 140;

      for (let i = allSections.length - 1; i >= 0; i--) {
        const element = document.getElementById(allSections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(`#${allSections[i]}`);
          return;
        }
      }

      if (window.scrollY < 100) {
        setActiveSection("#home");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0A0F]/85 backdrop-blur-xl border-b border-spidey-red/30 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Left: Text-based wordmark logo (spider-hero aesthetic) */}
          <Link
            href="#home"
            className="flex items-center gap-2.5 group transition-transform duration-200 hover:scale-105 select-none"
            aria-label="Srijan Setu Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-spidey-red/15 border border-spidey-red/50 flex items-center justify-center p-1 shadow-[0_0_12px_rgba(230,36,41,0.35)] group-hover:border-spidey-red transition-colors overflow-hidden">
              <Image
                src="/images/partners/Tom-HollandSrijan-Setu.png"
                alt="Srijan Setu Logo"
                width={40}
                height={40}
                unoptimized
                priority
                className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
              />
            </div>
            <span className="font-samarkan text-xl sm:text-2xl tracking-normal text-web-white group-hover:text-spidey-red transition-colors">
              SRIJAN <span className="text-spidey-red">SETU</span>
            </span>
          </Link>

          {/* Right (Desktop): Navigation links (Hick's Law: 6 explicit destinations) */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-5">
            {navItems.map((item: NavItem) => {
              const isActive = activeSection === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-body-sm lg:text-body-base font-medium px-2.5 py-1.5 transition-colors duration-200 ${
                    isActive ? "text-web-white font-semibold" : "text-web-gray hover:text-web-white"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Framer Motion animated active underline transition */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-spidey-red shadow-[0_0_8px_rgba(230,36,41,0.8)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right (Mobile): Hamburger button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-web-white hover:text-spidey-red focus:outline-none transition-colors"
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Menu overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
