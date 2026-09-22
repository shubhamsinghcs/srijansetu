"use client";

import { faculty } from "@/data";
import Button from "@/components/ui/Button";
import TeamMemberGrid from "@/components/ui/TeamMemberGrid";

export default function Team() {
  return (
    <section
      id="team"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <span id="tech-team" className="absolute -top-20 pointer-events-none" aria-hidden="true" />
      {/* Section Header */}
      <div className="text-center mb-16 sm:mb-20">
        <h2 className="section-heading text-display-lg leading-tight">
          FACULTY AND ADMINISTRATION
        </h2>
        <div className="w-24 h-1 bg-spidey-red mx-auto mt-4 mb-4 rounded-full" />
        <p className="text-white/75 font-body text-body-base sm:text-body-lg max-w-2xl mx-auto leading-relaxed font-normal">
          Thank you to the faculty members whose guidance and encouragement make Srijan Setu possible.
        </p>
      </div>

      <TeamMemberGrid members={faculty} />

      <div className="mt-10 flex justify-center">
        <Button href="/team" variant="outline">
          View Full Team
        </Button>
      </div>
    </section>
  );
}
