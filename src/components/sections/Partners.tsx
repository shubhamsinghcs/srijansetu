"use client";

import { useState } from "react";
import Image from "next/image";
import { sponsors } from "@/data/sponsors";
import { communityPartners } from "@/data/communityPartners";

function PartnerCardItem({ partner }: { partner: any }) {
  const [imageError, setImageError] = useState(false);
  const logoSrc = partner.logo || partner.logoUrl;

  const cardContent = (
    <div className="flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 w-full h-full px-2 sm:px-3 opacity-100">
      {logoSrc && !imageError ? (
        <div className="relative w-full h-full max-h-12 sm:max-h-14 flex items-center justify-center">
          <Image
            src={logoSrc}
            alt={partner.name}
            width={220}
            height={60}
            unoptimized
            onError={() => setImageError(true)}
            className="max-h-10 sm:max-h-12 w-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <>
          <div className="w-8 h-8 rounded-lg bg-spidey-red/20 border border-spidey-red/40 flex items-center justify-center text-spidey-red font-bold text-sm flex-shrink-0">
            {partner.name.charAt(0)}
          </div>
          <span className="font-bold text-xs sm:text-sm text-web-white tracking-wide group-hover:text-spidey-red transition-colors line-clamp-2 leading-tight text-left">
            {partner.name}
          </span>
        </>
      )}
    </div>
  );

  const cardClasses =
    "relative flex items-center justify-center p-3 sm:p-5 rounded-xl bg-[#0F0F17] border border-white/10 hover:border-spidey-red/70 transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(227,38,54,0.3)] group h-22 sm:h-28 w-full";

  if (partner.website) {
    return (
      <div className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.85rem)] lg:w-[calc(25%-1rem)] max-w-[280px] flex">
        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={partner.name}
          className={cardClasses}
        >
          {cardContent}
        </a>
      </div>
    );
  }

  return (
    <div className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.85rem)] lg:w-[calc(25%-1rem)] max-w-[280px] flex">
      <div className={cardClasses}>{cardContent}</div>
    </div>
  );
}

export default function Partners() {
  const partners = [
    ...sponsors.filter((p) => p.category === "partner"),
    ...communityPartners.filter((p) => p.category === "partner"),
  ];

  return (
    <section
      id="partners"
      className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-spidey-blue/5 rounded-full blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="text-center">
        {/* Section Heading */}
        <div className="mb-6 sm:mb-8">
          <h2 className="section-heading text-display-lg leading-tight">
            PARTNERS
          </h2>
          <div className="w-24 h-1 bg-spidey-red mx-auto mt-4 mb-4 rounded-full" />
          <p className="text-blue-400 font-body text-body-base sm:text-body-lg max-w-2xl mx-auto leading-relaxed font-normal mt-2">
            Organizations and institutions supporting Srijan Setu.
          </p>
        </div>

        {/* Responsive Grid of Logos */}
        {partners.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-3.5 sm:gap-5 mx-auto max-w-6xl">
            {partners.map((partner) => (
              <PartnerCardItem key={partner.id || partner.name} partner={partner} />
            ))}
          </div>
        ) : (
          <p className="text-center text-web-gray font-body py-4">
            Partner details coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
