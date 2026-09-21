import { timeline } from "@/data";
import type { TimelineEvent } from "@/types/event";
import Button from "@/components/ui/Button";

interface TimelineProps {
  preview?: boolean;
}

export default function Timeline({ preview = false }: TimelineProps) {
  const visibleEvents = preview ? timeline.slice(0, 3) : timeline;

  return (
    <section
      id="timeline"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center mb-16 sm:mb-20">
        <h2 className="section-heading text-display-lg leading-tight">
          TIMELINE
        </h2>
        <div className="w-24 h-1 bg-spidey-red mx-auto mt-4 mb-4 rounded-full" />
        <p className="text-white/75 font-body text-body-base sm:text-body-lg max-w-2xl mx-auto leading-relaxed font-normal">
          Navigate through every phase of Srijan Setu from kickoff to the final awards presentation.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative">
        {/* Central vertical line on desktop */}
        <div
          className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-spidey-red via-spidey-blue to-spidey-red -translate-x-1/2"
          aria-hidden="true"
        />

        {/* Vertical stepper line on mobile */}
        <div
          className="block md:hidden absolute left-4 sm:left-7 top-4 bottom-4 w-0.5 bg-gradient-to-b from-spidey-red to-spidey-blue"
          aria-hidden="true"
        />

        {/* Timeline Items */}
        <div className="space-y-8 sm:space-y-10 md:space-y-16">
          {visibleEvents.map((item: TimelineEvent, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id || `${item.day || item.date}-${item.time}-${index}`}
                className="relative flex items-start md:items-center"
              >
                {/* Node / Marker on Desktop */}
                <div
                  className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-web-black border-2 border-spidey-red items-center justify-center shadow-[0_0_12px_#E32636] z-10"
                  aria-hidden="true"
                >
                  <div className="w-2 h-2 rounded-full bg-spidey-red" />
                </div>

                {/* Node / Marker on Mobile */}
                <div
                  className="flex md:hidden absolute left-4 sm:left-7 top-6 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-web-black border-2 border-spidey-red items-center justify-center shadow-[0_0_10px_#E32636] z-10"
                  aria-hidden="true"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-spidey-red" />
                </div>

                {/* Content Container */}
                <div
                  className={`w-full md:w-1/2 pl-9 sm:pl-16 md:pl-0 ${
                    isEven
                      ? "md:pr-12 md:text-right md:ml-0"
                      : "md:pl-12 md:text-left md:ml-auto"
                  }`}
                >
                  <div className="p-5 sm:p-6 rounded-xl bg-[#0F0F17] border border-white/10 hover:border-spidey-red/60 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(227,38,54,0.2)] group">
                    {/* Day & Time Badges */}
                    <div
                      className={`flex flex-wrap items-center gap-2 mb-3 ${
                        isEven ? "md:justify-end" : "md:justify-start"
                      }`}
                    >
                      <span className="pill-badge pill-badge-red py-0.5">
                        {item.day}
                      </span>
                      <span className="pill-badge pill-badge-neutral py-0.5">
                        {item.time}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-display-md font-bold text-web-white group-hover:text-spidey-red transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 card-desc max-w-prose">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {preview && (
        <div className="mt-10 flex justify-center">
          <Button href="/timeline" variant="outline">
            View Full Timeline
          </Button>
        </div>
      )}
    </section>
  );
}
