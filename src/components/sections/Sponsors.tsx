"use client";

import { sponsors, SponsorTier, Sponsor } from "@/data/sponsors";
import Button from "@/components/ui/Button";

const TIER_CONFIG: { tier: SponsorTier; title: string; subtitle: string }[] = [
  {
    tier: "Corporate",
    title: "CORPORATE PARTNERS",
    subtitle: "Anchor organizations spearheading technology and industrial innovation.",
  },
  {
    tier: "Innovation",
    title: "INNOVATION PARTNERS",
    subtitle: "Trailblazing ventures driving breakthroughs in AI, cloud, and cybersecurity.",
  },
  {
    tier: "Community",
    title: "COMMUNITY PARTNERS",
    subtitle: "Developer ecosystems and grassroots coding collectives fueling collaboration.",
  },
  {
    tier: "Media",
    title: "MEDIA PARTNERS",
    subtitle: "Outlets amplifying developer impact and broadcast outreach.",
  },
];

export default function Sponsors() {
  const getSponsorsByTier = (tier: SponsorTier): Sponsor[] => {
    return sponsors.filter((s) => s.tier === tier);
  };

  return (
    <section
      id="sponsors"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center mb-16 sm:mb-20">
        <h2 className="section-heading text-display-lg tracking-wider">
          SPONSORS & PARTNERS
        </h2>
        <div className="w-24 h-1 bg-spidey-red mx-auto mt-4 mb-4 rounded-full" />
        <p className="text-white/75 text-body-base sm:text-body-lg max-w-2xl mx-auto leading-relaxed">
          Backed by forward-thinking organizations, industry leaders, and vibrant developer communities.
        </p>
      </div>

      {/* Tiers Container */}
      <div className="space-y-16 sm:space-y-20">
        {TIER_CONFIG.map(({ tier, title, subtitle }) => {
          const tierSponsors = getSponsorsByTier(tier);
          if (tierSponsors.length === 0) return null;

          return (
            <div key={tier} className="text-center">
              {/* Tier Subheading */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-display-md font-bold uppercase tracking-[0.14em] text-web-white">
                  {title}
                </h3>
                <p className="text-body-sm text-white/70 mt-1 max-w-lg mx-auto">
                  {subtitle}
                </p>
              </div>

              {/* Responsive Grid of Logos */}
              <div
                className={`grid gap-4 sm:gap-6 mx-auto ${
                  tier === "Corporate"
                    ? "grid-cols-1 sm:grid-cols-2 max-w-3xl"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl"
                }`}
              >
                {tierSponsors.map((sponsor) => (
                  <div
                    key={sponsor.name}
                    className="relative flex items-center justify-center p-4 sm:p-8 rounded-xl bg-[#0F0F17] border border-white/10 hover:border-spidey-red/70 transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(227,38,54,0.3)] group h-24 sm:h-32"
                  >
                    {/* Grayscale by default, full color on hover */}
                    <div className="flex items-center justify-center gap-3 filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300">
                      {/* Logo Icon Mark */}
                      <div className="w-8 h-8 rounded-lg bg-spidey-red/20 border border-spidey-red/40 flex items-center justify-center text-spidey-red font-bold text-sm flex-shrink-0">
                        {sponsor.name.charAt(0)}
                      </div>
                      {/* Sponsor Name Text / Logo */}
                      <span className="font-bold text-sm sm:text-base md:text-lg text-web-white tracking-wide group-hover:text-spidey-red transition-colors truncate">
                        {sponsor.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
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
