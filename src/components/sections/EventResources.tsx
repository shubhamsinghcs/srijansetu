"use client";

export default function EventResources() {
  return (
    <section
      id="resources"
      aria-labelledby="resources-heading"
      className="relative mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-20 scroll-mt-20 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-spidey-red/5 rounded-full blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h2
          id="resources-heading"
          className="section-heading text-display-lg leading-tight"
        >
          EVENT RESOURCES
        </h2>
        <div className="w-24 h-1 bg-spidey-red mx-auto mt-4 mb-4 rounded-full" />
        <p className="text-white/75 font-body text-body-base sm:text-body-lg max-w-2xl mx-auto leading-relaxed font-normal">
          Everything you need to know before the hackathon.
        </p>
      </div>

      {/* Two Cards: Side-by-side on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* CARD 1 — Participant Guide (active, force-download) */}
        <a
          href="https://drive.google.com/uc?export=download&id=14fIELrE9OMLnaGJJ-2I31Sl3WpYfqjUX"
          download
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col justify-between rounded-card bg-[#0F0F17]/90 backdrop-blur-md border border-white/10 p-6 sm:p-8 shadow-card hover:border-spidey-red/60 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
          aria-label="Download Participant Guide PDF"
        >
          <div>
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-spidey-red/15 border border-spidey-red/35 flex items-center justify-center text-spidey-red group-hover:scale-105 group-hover:border-spidey-red/60 transition-all duration-300">
                <svg
                  className="w-6 h-6"
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
              <span className="pill-badge pill-badge-red text-[10px] sm:text-xs">
                Direct Download
              </span>
            </div>

            <h3 className="font-accent font-bold text-xl sm:text-2xl text-white group-hover:text-spidey-red transition-colors">
              Participant Guide
            </h3>
            <p className="font-body text-sm sm:text-base text-white/70 mt-2 leading-relaxed">
              Rules, schedule & FAQs
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-spidey-red group-hover:text-white transition-colors">
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download PDF Guide
            </span>
            <span
              className="text-white/40 group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </a>

        {/* 
          CARD 2 — Accommodation (notice-only, not a live link yet)
          -------------------------------------------------------------------------
          DROP REAL GOOGLE FORM LINK HERE WHEN READY:
          To activate this card, convert the <div> container into an <a> tag:
            <a
              href="https://forms.gle/YOUR_ACCOMMODATION_FORM_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-card bg-[#0F0F17]/90 backdrop-blur-md border border-white/10 p-6 sm:p-8 shadow-card hover:border-spidey-red/60 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
          -------------------------------------------------------------------------
        */}
        <div className="flex flex-col justify-between rounded-card bg-[#0F0F17]/90 backdrop-blur-md border border-white/10 p-6 sm:p-8 shadow-card opacity-70">
          <div>
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white/70">
                <svg
                  className="w-6 h-6"
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
              <span className="pill-badge pill-badge-blue text-[10px] sm:text-xs">
                Coming Soon
              </span>
            </div>

            <h3 className="font-accent font-bold text-xl sm:text-2xl text-white">
              Accommodation
            </h3>
            <p className="font-body text-sm sm:text-base text-white/70 mt-2 leading-relaxed">
              A minimal fee applies for accommodation only — lunch and dinner are provided
              free of charge. Request form coming soon.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50 uppercase tracking-wider">
            <span>Notice Only</span>
            <span>Request Form Pending</span>
          </div>
        </div>
      </div>
    </section>
  );
}
