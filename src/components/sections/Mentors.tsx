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

  return (
    <section
      id="mentors"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center mb-16 sm:mb-20">
        <h2 className="section-heading text-display-lg leading-tight">
          MENTORS & JUDGES
        </h2>
        <div className="w-24 h-1 bg-spidey-red mx-auto mt-4 mb-4 rounded-full" />
        <p className="text-white/75 font-body text-body-base sm:text-body-lg max-w-2xl mx-auto leading-relaxed font-normal">
          Learn from and be evaluated by seasoned engineering leaders, tech founders, and domain specialists.
        </p>
      </div>

      {/* Responsive Mentor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {mentors.map((mentor: Mentor) => {
          const hasImageError = imageErrors[mentor.id || mentor.name];
          const photo = mentor.image || "";
          const linkedin = mentor.socials?.linkedin;

          return (
            <Card
              key={mentor.id || mentor.name}
              variant="default"
              className="text-center items-center p-5 sm:p-8 hover:border-spidey-red/70 transition-all duration-300 group shadow-sm hover:shadow-[0_0_25px_rgba(227,38,54,0.25)]"
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
              <h3 className="font-body text-heading-sm sm:text-heading-md font-bold text-web-white group-hover:text-spidey-red transition-colors">
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

              {/* "Know More" Link to LinkedIn (Only rendered if URL exists) */}
              {linkedin && (
                <div className="mt-6 pt-4 border-t border-white/10 w-full flex justify-center">
                  <Link
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-accent inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-web-gray hover:text-spidey-red transition-colors group/link"
                  >
                    <span>Know More</span>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                    </svg>
                  </Link>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Become a Mentor CTA */}
      <div className="mt-16 sm:mt-24 text-center">
        <p className="text-sm sm:text-base text-web-gray mb-4">
          Want to guide ambitious innovators and evaluate breakthrough ideas?
        </p>
        <Button href="#become-a-mentor" variant="primary">
          Become a Mentor
        </Button>
      </div>
    </section>
  );
}
