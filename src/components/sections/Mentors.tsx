"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { mentors } from "@/data";
import type { Mentor } from "@/types/event";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function Mentors() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  if (mentors.length === 0) {
    return (
      <section
        id="mentors"
        className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
      >
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="section-heading text-display-lg leading-tight">MENTORS</h2>
          <div className="w-24 h-1 bg-spidey-red mx-auto mt-4 mb-4 rounded-full" />
        </div>
        <p className="text-center text-web-gray font-body">Mentor details coming soon.</p>
      </section>
    );
  }

  return (
    <section
      id="mentors"
      className="relative py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-spidey-blue/5 rounded-full blur-[100px] pointer-events-none -z-10" aria-hidden="true" />

      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="section-heading text-display-lg leading-tight">
          MENTORS
        </h2>
        <div className="w-24 h-1 bg-spidey-red mx-auto mt-4 mb-4 rounded-full" />
        <p className="text-white/75 font-body text-body-base sm:text-body-lg max-w-2xl mx-auto leading-relaxed font-normal">
          Learn from seasoned engineering leaders, tech founders, and domain specialists.
        </p>
      </div>

      {/* Responsive Mentor Cards Grid */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
        {mentors.map((mentor: Mentor) => {
          const hasImageError = imageErrors[mentor.id || mentor.name];
          const photo = mentor.image || "";
          const socialLinks = Object.entries(mentor.socials || {}).filter(
            ([, url]) => Boolean(url)
          ) as [string, string][];

          return (
            <div
              key={mentor.id || mentor.name}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] max-w-[400px] flex"
            >
              <Card
                variant="default"
                className="w-full text-center items-center p-5 sm:p-8 hover:border-spidey-red/70 transition-all duration-300 group shadow-sm hover:shadow-[0_0_25px_rgba(227,38,54,0.25)]"
              >
                {/* Photo / Avatar with fallback */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-5 overflow-hidden border-2 border-spidey-red/60 group-hover:border-spidey-red shadow-[0_0_15px_rgba(227,38,54,0.3)] transition-colors bg-[#171822] flex items-center justify-center">
                  {photo && !hasImageError ? (
                    <Image
                      src={photo}
                      alt={mentor.name}
                      fill
                      sizes="(max-width: 768px) 96px, 112px"
                      className="object-cover"
                      onError={() => handleImageError(mentor.id || mentor.name)}
                    />
                  ) : (
                    <span className="font-accent text-2xl sm:text-3xl font-bold text-spidey-red">
                      {mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>

                {/* Name */}
                <h3 className="text-heading-sm sm:text-heading-md font-bold text-web-white group-hover:text-spidey-red transition-colors">
                  {mentor.name}
                </h3>

                {/* Role / Designation */}
                {mentor.designation && (
                  <p className="font-accent text-sm font-semibold text-spidey-red mt-1">
                    {mentor.designation}
                  </p>
                )}

                {/* Company */}
                {mentor.company && (
                  <p className="font-accent text-xs uppercase tracking-widest text-web-gray mt-1">
                    {mentor.company}
                  </p>
                )}

                {/* Render every social link supplied by the mentor data. */}
                {socialLinks.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-white/10 w-full flex justify-center">
                    <div className="flex flex-wrap justify-center gap-3">
                      {socialLinks.map(([platform, url]) => (
                        <Link
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-accent text-xs font-bold uppercase tracking-wider text-web-gray hover:text-spidey-red transition-colors"
                        >
                          {platform}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>
          );
        })}
      </div>

      {/* Become a Mentor CTA */}
      <div className="mt-16 sm:mt-24 text-center">
        <p className="text-sm sm:text-base text-web-gray mb-4">
          Want to guide ambitious innovators and help teams turn ideas into working solutions?
        </p>
        <Button href="#become-a-mentor" variant="primary">
          Become a Mentor
        </Button>
      </div>
    </section>
  );
}
