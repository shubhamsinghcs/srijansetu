"use client";

import { faculty } from "@/data";
import Button from "@/components/ui/Button";
import TeamMemberGrid from "@/components/ui/TeamMemberGrid";
import type { TeamTier } from "@/types/event";

const facultyTiers: { id: TeamTier; title: string }[] = [
  { id: "chairman", title: "CHAIRMAN" },
  { id: "principal", title: "PRINCIPALS" },
];

export default function Team() {
  return (
    <section
      id="team"
      className="relative py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-spidey-red/5 rounded-full blur-[100px] pointer-events-none -z-10" aria-hidden="true" />

      <span id="tech-team" className="absolute -top-20 pointer-events-none" aria-hidden="true" />
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="section-heading text-display-lg leading-tight">
          OUR GUIDING PILLARS
        </h2>
        <div className="w-24 h-1 bg-spidey-red mx-auto mt-4 mb-4 rounded-full" />
        <p className="text-white/75 font-body text-body-base sm:text-body-lg max-w-2xl mx-auto leading-relaxed font-normal">
          Srijan Setu is made possible by the vision and continued support of our administration and faculty — their belief in student-led innovation is what gives this hackathon its foundation.
        </p>
      </div>

      <div className="space-y-10 sm:space-y-12">
        {facultyTiers.map((tier) => {
          const members = faculty.filter((m) => m.tier === tier.id);
          if (members.length === 0) return null;
          return (
            <div key={tier.id} className="text-center">
              <h3 className="section-heading text-display-md leading-tight mb-6">
                {tier.title}
              </h3>
              <TeamMemberGrid members={members} />
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <Button href="/team" variant="outline">
          View Full Team
        </Button>
      </div>
    </section>
  );
}
