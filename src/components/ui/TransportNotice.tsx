"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";

const STORAGE_KEY = "srijansetu_transport_notice_shown";

export default function TransportNotice() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Trigger notice when #resources scrolls into view (once per session)
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "true") {
        return;
      }
    } catch {
      // sessionStorage unavailable (e.g. private mode)
    }

    const target = document.getElementById("resources");
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsOpen(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleDismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // sessionStorage blocked or unavailable
    }
    setIsOpen(false);
    if (
      previousActiveElementRef.current &&
      typeof previousActiveElementRef.current.focus === "function"
    ) {
      previousActiveElementRef.current.focus();
    }
  };

  // Focus trap, body scroll lock, Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElementRef.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus to primary "Got it" button
    const focusTimer = requestAnimationFrame(() => {
      buttonRef.current?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleDismiss();
        return;
      }

      if (e.key === "Tab") {
        if (!modalRef.current) return;
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusTimer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Framer motion variants respecting prefers-reduced-motion
  const backdropVariants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
        exit: { opacity: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.25 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
      };

  const modalVariants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
        exit: { opacity: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, scale: 0.94, y: 12 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.25, ease: "easeOut" },
        },
        exit: {
          opacity: 0,
          scale: 0.94,
          y: 8,
          transition: { duration: 0.2, ease: "easeIn" },
        },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Blocking Backdrop (~70% black overlay, clicking does NOT dismiss) */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="transport-notice-heading"
            aria-describedby="transport-notice-description"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-md rounded-2xl bg-[#0F0F17]/95 border border-spidey-red/50 shadow-[0_0_35px_rgba(227,38,54,0.25)] p-6 sm:p-8 backdrop-blur-xl text-left"
          >
            {/* Bus / Travel Icon Header */}
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-xl bg-spidey-red/15 border border-spidey-red/35 flex items-center justify-center text-spidey-red flex-shrink-0">
                <svg
                  className="w-6 h-6 text-spidey-red"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="4" y="3" width="16" height="15" rx="3" />
                  <path d="M4 11h16" />
                  <path d="M8 15h.01" />
                  <path d="M16 15h.01" />
                  <path d="M6 18v2" />
                  <path d="M18 18v2" />
                </svg>
              </div>
              <span className="pill-badge pill-badge-red text-[11px] sm:text-xs">
                Travel Announcement
              </span>
            </div>

            {/* Heading */}
            <h3
              id="transport-notice-heading"
              className="font-accent font-bold text-xl sm:text-2xl text-white tracking-wide"
            >
              Travel Notice
            </h3>

            {/* Message Body */}
            <p
              id="transport-notice-description"
              className="font-body text-sm sm:text-base text-white/80 mt-2.5 leading-relaxed"
            >
              Bus service will be available from PGI to Indo Global Colleges for smooth travel on the day of the event.
            </p>

            {/* "Got it" Action Button */}
            <button
              ref={buttonRef}
              type="button"
              onClick={handleDismiss}
              className="w-full mt-6 py-3 px-6 rounded-lg bg-spidey-red hover:bg-[#c9181d] text-white font-accent font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(230,36,41,0.4)] hover:shadow-[0_0_25px_rgba(230,36,41,0.6)] focus:outline-none focus:ring-2 focus:ring-spidey-red focus:ring-offset-2 focus:ring-offset-[#0F0F17]"
            >
              Got it
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
