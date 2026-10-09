"use client";

import TransportNotice from "@/components/ui/TransportNotice";

export default function EventResources() {
  return (
    <section
      id="resources"
      aria-labelledby="resources-heading"
      className="relative mx-auto max-w-7xl px-4 py-10 sm:py-14 lg:py-16 scroll-mt-20 overflow-hidden"
    >
      <TransportNotice />

      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-spidey-red/5 rounded-full blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2
          id="resources-heading"
          className="section-heading text-display-lg leading-tight"
        >
          EVENT RESOURCES
        </h2>
        <div className="w-24 h-1 bg-spidey-red mx-auto mt-3 mb-3 rounded-full" />
        <p className="text-white/75 font-body text-body-base sm:text-body-lg max-w-2xl mx-auto leading-relaxed font-normal">
          Everything you need to know before the hackathon.
        </p>
      </div>

      {/* Compact Horizontal Resource Panels: Side-by-side on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
        {/* PANEL 1 — Participant Guide (clickable download panel) */}
        <a
          href="https://drive.google.com/uc?export=download&id=14fIELrE9OMLnaGJJ-2I31Sl3WpYfqjUX"
          download
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-3 sm:gap-4 rounded-xl bg-[#0F0F17]/90 backdrop-blur-md border border-white/10 p-4 sm:p-5 shadow-sm hover:border-spidey-red/60 hover:shadow-[0_0_20px_rgba(227,38,54,0.2)] hover:-translate-y-0.5 transition-all duration-300 w-full"
          aria-label="Download Participant Guide PDF (Rules, schedule & FAQs)"
        >
          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
            {/* Small icon on left */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-spidey-red/15 border border-spidey-red/35 flex items-center justify-center text-spidey-red group-hover:scale-105 group-hover:border-spidey-red/60 transition-all duration-300 shrink-0">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            {/* Title & concise supporting text in center */}
            <div className="min-w-0">
              <h3 className="font-accent font-bold text-base sm:text-lg text-white group-hover:text-spidey-red transition-colors leading-tight">
                Participant Guide
              </h3>
              <p className="font-body text-xs sm:text-sm text-white/70 mt-0.5 leading-snug">
                Rules, schedule & FAQs
              </p>
            </div>
          </div>

          {/* Clear action on right */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-spidey-red/15 border border-spidey-red/40 text-spidey-red group-hover:bg-spidey-red group-hover:text-white font-accent font-bold text-xs uppercase tracking-wider transition-all duration-200 shrink-0 shadow-[0_0_12px_rgba(230,36,41,0.2)]">
            <span>Download PDF</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </div>
        </a>

        {/* PANEL 2 — Accommodation (compact notice-only panel) */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 rounded-xl bg-[#0F0F17]/80 backdrop-blur-md border border-white/10 p-4 sm:p-5 shadow-sm opacity-80 w-full">
          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
            {/* Small icon on left */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white/60 shrink-0">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>

            {/* Title & concise supporting text in center */}
            <div className="min-w-0">
              <h3 className="font-accent font-bold text-base sm:text-lg text-white leading-tight">
                Accommodation
              </h3>
              <p className="font-body text-xs sm:text-sm text-white/70 mt-0.5 leading-snug">
                Meals included · Request form coming soon
              </p>
            </div>
          </div>

          {/* Clear status on right */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/15 text-white/60 font-mono text-xs uppercase tracking-wider shrink-0 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Coming soon
          </span>
        </div>
      </div>
    </section>
  );
}
