"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/types/event";
import Card from "@/components/ui/Card";

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  const [imageError, setImageError] = useState(false);
  const isOrganizer = member.tier === "organizers";

  return (
    <Card
      variant="default"
      className={`text-center items-center p-5 sm:p-6 transition-all duration-300 group ${
        isOrganizer
          ? "bg-gradient-to-br from-[#1a0d12] to-[#0F0F17] border-spidey-red/50 shadow-[0_0_18px_rgba(230,36,41,0.12)] hover:border-spidey-red hover:shadow-[0_0_28px_rgba(230,36,41,0.3)]"
          : "hover:border-spidey-red/70"
      }`}
    >
      <div
        className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-5 overflow-hidden flex items-center justify-center bg-[#171822] border-2 transition-colors shadow-[0_0_15px_rgba(227,38,54,0.2)] ${
          isOrganizer
            ? "border-spidey-red/60 group-hover:border-spidey-red"
            : "border-white/15 group-hover:border-spidey-red"
        }`}
      >
        {member.image && !imageError ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="112px"
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="font-accent text-2xl sm:text-3xl font-bold text-spidey-red">
            {member.name
              .split(" ")
              .map((name) => name[0])
              .join("")}
          </span>
        )}
      </div>

      <h3 className="font-body text-heading-sm sm:text-heading-md font-bold text-web-white group-hover:text-spidey-red transition-colors">
        {member.name}
      </h3>
      <p
        className={`font-accent text-sm font-semibold mt-1 ${
          isOrganizer ? "text-spidey-red" : "text-spidey-blue"
        }`}
      >
        {member.role}
      </p>

      {member.socials && (
        <div className="mt-6 pt-4 border-t border-white/10 w-full flex justify-center">
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(member.socials)
              .filter(([, url]) => Boolean(url))
              .map(([platform, url]) => (
                <Link
                  key={platform}
                  href={url as string}
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
  );
}