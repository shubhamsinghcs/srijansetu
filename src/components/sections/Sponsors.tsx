"use client";

import Image from "next/image";
import {
  communityPartners,
  mediaPlatformPartners,
  innovationPartners,
} from "@/data";
import type { Partner } from "@/types/event";
import Button from "@/components/ui/Button";

interface PartnerTierSection {
  id: string;
  title: string;
  subtitle: string;
  partners: Partner[];
}

export default function Sponsors() {
  const tierSections: PartnerTierSection[] = [
    {
      id: "community",
      title: "COMMUNITY PARTNERS",
      subtitle:
        "Communities coming together to spread the word, connect builders, and grow the Srijan Setu ecosystem.",
      partners: communityPartners,
    },
    {
      id: "silver-sponsors",
      title: "SILVER SPONSORS",
      subtitle:
        "Backed by forward-thinking organizations, industry leaders, and vibrant developer communities.",
      partners: mediaPlatformPartners,
    },
    {
      id: "innovation",
      title: "INNOVATION PARTNERS",
      subtitle:
        "Supporting bold ideas, creative thinking, and the builders turning real problems into practical solutions.",
      partners: innovationPartners,
    },
  ];

  return (
    <section
      id="sponsors"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      {/* <div className="text-center mb-16 sm:mb-20">
        <h2 className="section-heading text-display-lg leading-tight">
          SPONSORS & PARTNERS
        </h2>
        <div className="w-24 h-1 bg-spidey-red mx-auto mt-4 mb-4 rounded-full" />
        <p className="text-white/75 font-body text-body-base sm:text-body-lg max-w-2xl mx-auto leading-relaxed font-normal">
          Backed by forward-thinking organizations, industry leaders, and vibrant developer communities.
        </p>
      </div> */}

      {/* Tiers Container */}
      <div className="space-y-16 sm:space-y-20">
        {tierSections.map(({ id, title, subtitle, partners }) => {
          if (!partners || partners.length === 0) return null;

          return (
            <div key={id} className="text-center">
              {/* Tier Subheading */}
              <div className="mb-6 sm:mb-8">
                <h3 className="section-heading text-display-lg leading-tight">
                  {title}
                </h3>
                <p className="text-blue-400 font-body text-body-base sm:text-body-lg max-w-2xl mx-auto leading-relaxed font-normal mt-3">
                  {subtitle}
                </p>
              </div>

              {/* Responsive Grid of Logos */}
              <div className="grid gap-4 sm:gap-6 mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
                {partners.map((partner) => {
                  const isDevfolio = partner.name.toLowerCase() === "devfolio";
                  const href = isDevfolio
                    ? partner.website || "https://devfolio.co"
                    : partner.website;

                  const cardContent = (
                    <div
                      className={`flex items-center justify-center gap-3 transition-all duration-300 w-full h-full px-2 ${
                        isDevfolio
                          ? "opacity-100 filter-none"
                          : "filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                      }`}
                    >
                      {isDevfolio ? (
                        <div className="relative w-full h-full max-h-12 sm:max-h-14 flex items-center justify-center">
                          <Image
                            src={partner.logo || "/images/sponsors/devfolio.svg"}
                            alt="Devfolio"
                            width={220}
                            height={60}
                            unoptimized
                            priority
                            className="max-h-10 sm:max-h-12 w-auto object-contain drop-shadow-md"
                          />
                        </div>
                      ) : partner.logo && !partner.logo.endsWith(".svg") ? (
                        <div className="relative w-full h-full max-h-12 sm:max-h-14 flex items-center justify-center">
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            width={220}
                            height={60}
                            unoptimized
                            className="max-h-10 sm:max-h-12 w-auto object-contain drop-shadow-md"
                          />
                        </div>
                      ) : (
                        <>
                          {/* Logo Icon Mark */}
                          <div className="w-8 h-8 rounded-lg bg-spidey-red/20 border border-spidey-red/40 flex items-center justify-center text-spidey-red font-bold text-sm flex-shrink-0">
                            {partner.name.charAt(0)}
                          </div>
                          {/* Partner Name Text / Logo */}
                          <span className="font-bold text-sm sm:text-base md:text-lg text-web-white tracking-wide group-hover:text-spidey-red transition-colors truncate">
                            {partner.name}
                          </span>
                        </>
                      )}
                    </div>
                  );

                  const cardClasses =
                    "relative flex items-center justify-center p-4 sm:p-6 rounded-xl bg-[#0F0F17] border border-white/10 hover:border-spidey-red/70 transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(227,38,54,0.3)] group h-24 sm:h-32";

                  if (href) {
                    return (
                      <a
                        key={partner.id || partner.name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={partner.name}
                        className={cardClasses}
                      >
                        {cardContent}
                      </a>
                    );
                  }

                  return (
                    <div
                      key={partner.id || partner.name}
                      className={cardClasses}
                    >
                      {cardContent}
                    </div>
                  );
                })}
              </div>

              {/* Community Partner CTA Button */}
              {id === "community" && (
                <div className="mt-8 sm:mt-10 flex justify-center">
                  <Button
                    onClick={() =>
                      window.open(
                        "https://forms.gle/umNabkHSnmyipmYEA",
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    variant="primary"
                  >
                    Become a Community Partner
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Become a Partner CTA */}
      <div className="mt-16 sm:mt-24 text-center">
        <p className="text-sm sm:text-base text-web-gray mb-4">
          Interested in supporting the next generation of problem solvers?
        </p>
        <Button href="#become-a-partner" variant="primary">
          Become a Partner
        </Button>
      </div>
    </section>
  );
}
