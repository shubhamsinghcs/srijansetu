import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { navItems, NavItem } from "@/data/nav";
import { socials } from "@/data/socials";
import Button from "@/components/ui/Button";

interface SocialLinkItem {
  platform: string;
  url: string;
}

export default function Footer() {
  const renderSocialIcon = (platform: string) => {
    const key = platform.toLowerCase();
    switch (key) {
      case "linkedin":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8m1.39 9.74v-8.37H5.07v8.37h2.78z" />
          </svg>
        );
      case "twitter":
      case "x":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "instagram":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="relative bg-[#07070B] border-t border-spidey-red/40 text-web-white mt-20 sm:mt-28 overflow-hidden">
      {/* Background Soft Glow Aura */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-3/4 h-32 bg-radial-gradient from-spidey-red/10 via-spidey-blue/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Footer Content — Peak-End High Craft Anchor */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          {/* Left (5 cols): Large Wordmark + Tagline + Final CTA Repeat */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <Link href="#home" className="inline-block group">
              <span className="font-brand text-4xl sm:text-5xl text-spidey-red tracking-normal group-hover:text-white transition-colors">
                {SITE_NAME.toUpperCase()}
              </span>
            </Link>
            <p className="mt-2 text-sm sm:text-base font-semibold uppercase tracking-wider text-web-white/95 font-body">
              {SITE_TAGLINE}
            </p>
            <p className="mt-2 text-xs sm:text-body-sm text-web-gray leading-relaxed max-w-sm mx-auto lg:mx-0 font-body font-normal">
              Fostering ground-level innovation, empowering visionary problem-solvers, and building breakthrough technological prototypes.
            </p>

            {/* Peak-End Rule: Final Small CTA Repeat (Outlined style to preserve Von Restorff primary uniqueness) */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Button href="#home" variant="outline" className="text-xs py-2 px-5">
                Registrations open 10th Oct
              </Button>
            </div>
          </div>

          {/* Center (4 cols): Quick Navigation (reused from nav.ts) */}
          <div className="lg:col-span-4 text-center">
            <h4 className="font-accent text-xs font-bold uppercase tracking-widest text-spidey-red mb-4">
              QUICK NAVIGATION
            </h4>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2.5 max-w-xs mx-auto">
              {navItems.map((item: NavItem) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-accent text-xs sm:text-sm text-web-gray hover:text-spidey-red transition-colors font-medium uppercase tracking-wider"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right (3 cols): Real Brand Social Icons (LinkedIn, Instagram, X) */}
          <div className="lg:col-span-3 text-center lg:text-right">
            <h4 className="font-accent text-xs font-bold uppercase tracking-widest text-spidey-red mb-4">
              CONNECT WITH US
            </h4>
            <div className="flex items-center justify-center lg:justify-end gap-3.5">
              {socials.map((social: SocialLinkItem) => (
                <Link
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-web-gray hover:text-spidey-red hover:border-spidey-red/60 hover:shadow-[0_0_15px_rgba(230,36,41,0.4)] transition-all duration-200 group"
                >
                  {renderSocialIcon(social.platform)}
                </Link>
              ))}
            </div>
            <p className="mt-3 text-xs text-web-gray font-body font-normal">
              Official channels for live Conclave updates & cohorts.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/30 backdrop-blur-sm py-6 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-web-gray">
          <p className="font-accent tracking-wider">
            &copy; 2026 {SITE_NAME.toUpperCase()}. ALL RIGHTS RESERVED.
          </p>
          <p className="font-body tracking-wide text-web-gray/80 font-normal">
            Indo Global College of Engineering
          </p>
        </div>
      </div>
    </footer>
  );
}
