"use client";

import { useState } from "react";
import Image from "next/image";
import { team } from "@/data";
import type { TeamMember } from "@/types/event";
import Card from "@/components/ui/Card";

export default function TechTeam() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="team"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <span id="tech-team" className="absolute -top-20 pointer-events-none" aria-hidden="true" />
      {/* Section Header */}
      <div className="text-center mb-16 sm:mb-20">
        <h2 className="section-heading text-display-lg leading-tight">
          TECH TEAM
        </h2>
        <div className="w-24 h-1 bg-spidey-red mx-auto mt-4 mb-4 rounded-full" />
        <p className="text-white/75 font-body text-body-base sm:text-body-lg max-w-2xl mx-auto leading-relaxed font-normal">
          The operatives engineering the platform, orchestrating infrastructure, and powering the Srijan Setu experience.
        </p>
      </div>

      {/* Compact Operative Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {team.map((member: TeamMember) => {
          const hasImageError = imageErrors[member.id];
          const photo = member.image || "";

          return (
            <Card
              key={member.id}
              variant="default"
              className="p-4 sm:p-5 rounded-xl bg-[#0F0F17] border border-white/10 hover:border-spidey-red/70 transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(227,38,54,0.25)] group"
            >
              <div className="flex items-center gap-3.5 sm:gap-4">
                {/* Operative Avatar / Fallback Placeholder */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1A1A24] border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                  {photo && !hasImageError ? (
                    <Image
                      src={photo}
                      alt={member.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                      onError={() => handleImageError(member.id)}
                    />
                  ) : (
                    <span className="font-accent font-bold text-xs sm:text-sm text-spidey-red">
                      {member.id}
                    </span>
                  )}
                </div>

                {/* Member Info & Quote/Bio */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-accent text-label font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded bg-spidey-red/15 text-spidey-red border border-spidey-red/30">
                      {member.id}
                    </span>
                  </div>

                  <h3 className="font-body font-bold text-body-base text-web-white truncate group-hover:text-spidey-red transition-colors">
                    {member.name}
                  </h3>

                  {member.bio && (
                    <p className="mt-1 font-body text-xs text-web-gray leading-relaxed line-clamp-2 font-normal">
                      &ldquo;{member.bio}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
