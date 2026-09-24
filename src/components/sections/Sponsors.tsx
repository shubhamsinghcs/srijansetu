"use client";

import Image from "next/image";
import { sponsorTiers } from "@/data";
import Button from "@/components/ui/Button";

export default function Sponsors() {
  const visibleTiers = sponsorTiers.filter(({ partners }) => partners && partners.length > 0);

  if (visibleTiers.length === 0) {
    return (
      <section
        id="sponsors"
        className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
      >
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="section-heading text-display-lg leading-tight">SPONSORS & PARTNERS</h2>
          <div className="w-24 h-1 bg-spidey-red mx-auto mt-4 mb-4 rounded-full" />
        </div>
        <p className="text-center text-web-gray font-body">Sponsor details coming soon.</p>
      </section>
    );
  }

  return (
    <section
      id="sponsors"
      className="relative py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-spidey-blue/5 rounded-full blur-[100px] pointer-events-none -z-10" aria-hidden="true" />

      {/* Tiers Container */}
      <div className="space-y-10 sm:space-y-12">
        {visibleTiers.map(({ id, title, subtitle, partners }) => {

          return (
            <div key={id} className="text-center">
              {/* Tier Subheading */}
              <div className="mb-4 sm:mb-6">
                <h3 className="section-heading text-display-lg leading-tight">
                  {title}
                </h3>
                <p className="text-blue-400 font-body text-body-base sm:text-body-lg max-w-2xl mx-auto leading-relaxed font-normal mt-2">
                  {subtitle}
                </p>
              </div>

              {/* Responsive Grid of Logos */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mx-auto max-w-5xl">
                {partners.map((partner) => {
                  const cardContent = (
                    <div
                      className="flex items-center justify-center gap-3 transition-all duration-300 w-full h-full px-2 filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                    >
                      {partner.logo ? (
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
                    "relative flex items-center justify-center p-4 sm:p-6 rounded-xl bg-[#0F0F17] border border-white/10 hover:border-spidey-red/70 transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(227,38,54,0.3)] group h-24 sm:h-32 w-full";

                  if (partner.website) {
                    return (
                      <div
                        key={partner.id}
                        className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-[320px] flex"
                      >
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
                    <div
                      key={partner.id || partner.name}
                      className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-[320px] flex"
                    >
                      <div className={cardClasses}>
                        {cardContent}
                      </div>
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
