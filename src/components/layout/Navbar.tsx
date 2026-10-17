"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navItems, NavItem } from "@/data/nav";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const homeHref = pathname === "/" ? "/" : "/";

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

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setIsResourcesDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsResourcesDropdownOpen(false);
    }, 150);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsResourcesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
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
            href={homeHref}
            className="flex items-center gap-2.5 group transition-transform duration-200 hover:scale-105 select-none"
            aria-label="Srijan Setu Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-spidey-red/15 border border-spidey-red/50 flex items-center justify-center p-1 shadow-[0_0_12px_rgba(230,36,41,0.35)] group-hover:border-spidey-red transition-colors overflow-hidden">
              <Image
                src="/images/branding/tom-holland-srijan-setu.png"
                alt="Srijan Setu Logo"
                width={40}
                height={40}
                unoptimized
                priority
                className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
              />
            </div>
            <span className="font-brand text-xl sm:text-2xl tracking-normal text-web-white group-hover:text-spidey-red transition-colors">
              SRIJAN <span className="text-spidey-red">SETU</span>
            </span>
          </Link>

          {/* Right (Desktop): Navigation links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3 xl:space-x-5">
            {navItems.map((item: NavItem) => {
              const isActive = activeSection === item.href;
              const isResources = item.href === "#resources";
              const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);

              if (hasSubItems) {
                return (
                  <div
                    key={item.href}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      type="button"
                      onClick={() => setIsResourcesDropdownOpen((prev) => !prev)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setIsResourcesDropdownOpen(false);
                      }}
                      aria-haspopup="true"
                      aria-expanded={isResourcesDropdownOpen}
                      className={`relative flex items-center font-accent text-xs lg:text-body-sm xl:text-body-base font-medium px-2 lg:px-2.5 py-1.5 transition-colors duration-200 ${
                        isActive
                          ? "text-web-white font-semibold"
                          : isResources
                            ? "text-white/45 hover:text-spidey-red"
                            : "text-web-gray hover:text-web-white"
                      }`}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <svg
                        className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                          isResourcesDropdownOpen ? "rotate-180 text-spidey-red" : "text-white/40"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>

                      {/* Framer Motion animated active underline transition */}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavUnderline"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-spidey-red shadow-[0_0_8px_rgba(230,36,41,0.8)]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    {/* Small dropdown panel */}
                    <AnimatePresence>
                      {isResourcesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute top-full right-0 sm:left-1/2 sm:-translate-x-1/2 pt-2 z-50 min-w-[175px]"
                        >
                          <div className="rounded-xl bg-[#0F0F17]/95 backdrop-blur-xl border border-white/10 p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.8)] flex flex-col gap-0.5">
                            {item.subItems?.map((subItem) => {
                              if (subItem.external) {
                                return (
                                  <a
                                    key={subItem.label}
                                    href={subItem.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsResourcesDropdownOpen(false)}
                                    className="flex items-center justify-between px-3 py-2 rounded-lg font-accent text-xs lg:text-body-sm font-medium text-white/55 hover:text-white hover:bg-spidey-red/15 transition-all duration-150 group/sub"
                                  >
                                    <span>{subItem.label}</span>
                                    <svg
                                      className="w-3.5 h-3.5 text-white/40 group-hover/sub:text-spidey-red transition-colors shrink-0"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                      aria-hidden="true"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                      />
                                    </svg>
                                  </a>
                                );
                              }

                              return (
                                <Link
                                  key={subItem.label}
                                  href={
                                    pathname === "/"
                                      ? subItem.href
                                      : subItem.href.startsWith("#")
                                        ? `/${subItem.href}`
                                        : subItem.href
                                  }
                                  onClick={() => setIsResourcesDropdownOpen(false)}
                                  className="flex items-center justify-between px-3 py-2 rounded-lg font-accent text-xs lg:text-body-sm font-medium text-white/55 hover:text-white hover:bg-spidey-red/15 transition-all duration-150"
                                >
                                  <span>{subItem.label}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={
                    pathname === "/"
                      ? item.href
                      : item.href.startsWith("#")
                        ? `/${item.href}`
                        : item.href
                  }
                  className={`relative font-accent text-xs lg:text-body-sm xl:text-body-base font-medium px-2 lg:px-2.5 py-1.5 transition-colors duration-200 ${
                    isActive
                      ? "text-web-white font-semibold"
                      : isResources
                        ? "text-white/45 hover:text-spidey-red"
                        : "text-web-gray hover:text-web-white"
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
