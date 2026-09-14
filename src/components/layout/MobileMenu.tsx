"use client";

import { useEffect } from "react";
import Link from "next/link";
import { navItems, NavItem } from "@/data/nav";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection?: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  activeSection,
}: MobileMenuProps) {
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-web-black/98 backdrop-blur-xl px-6"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-6 right-6 p-2 text-web-white hover:text-spidey-red focus:outline-none transition-colors"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Navigation links stacked vertically */}
      <nav className="flex flex-col items-center gap-8 text-center">
        {navItems.map((item: NavItem) => {
          const isActive = activeSection === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`font-accent text-2xl font-bold uppercase tracking-wider transition-all duration-200 pb-1 ${
                isActive
                  ? "text-web-white border-b-2 border-spidey-red"
                  : "text-web-gray hover:text-web-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
