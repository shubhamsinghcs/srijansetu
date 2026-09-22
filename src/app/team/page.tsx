import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { faculty, heroPartnerLogos, team } from "@/data";
import type { TeamTier } from "@/types/event";
import TeamMemberGrid from "@/components/ui/TeamMemberGrid";

const tiers: { id: TeamTier; title: string; description: string }[] = [
  {
    id: "organizers",
    title: "ORGANIZERS",
    description: "The people shaping the event, coordinating every moving part, and welcoming the community.",
  },
  {
    id: "core-team",
    title: "CORE TEAM",
    description: "The builders responsible for the systems, design, security, and delivery behind Srijan Setu.",
  },
  {
    id: "volunteers",
    title: "VOLUNTEERS",
    description: "The people supporting participants, sessions, communication, and the event on the ground.",
  },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen text-web-white overflow-x-hidden">
      <Navbar />
      <section className="relative py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              href="/"
              className="inline-flex items-center rounded-md border border-spidey-red/70 bg-spidey-red/10 px-3 py-2 font-accent text-xs sm:text-sm font-bold uppercase tracking-wider text-web-white hover:bg-spidey-red/20 hover:border-spidey-red transition-colors"
            >
              <span aria-hidden="true" className="mr-2">&larr;</span>
              Back to home
            </Link>
            <span className="font-accent text-[10px] sm:text-xs uppercase tracking-[0.24em] text-web-gray">
              Srijan Setu / Team
            </span>
          </div>

          {/* <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-9 py-4 border-y border-white/10">
            {heroPartnerLogos.map((logo) => (
              <Image
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                width={120}
                height={48}
                unoptimized
                className="h-7 sm:h-9 w-auto max-w-[100px] object-contain opacity-75"
              />
            ))}
          </div> */}

          {/* <div className="text-center mt-10">
            <p className="font-accent text-xs uppercase tracking-[0.28em] text-spidey-red mb-3">
              The people behind the experience
            </p>
            <h1 className="section-heading text-display-lg sm:text-display-xl leading-tight">THE TEAM</h1>
            <p className="text-white/75 font-body text-body-base sm:text-body-lg max-w-2xl mx-auto mt-4">
            Meet the people building, coordinating, and supporting Srijan Setu.
            </p>
          </div> */}
        </div>

        <div className="space-y-16 sm:space-y-20">
          <section aria-labelledby="faculty-heading">
            <div className="text-center mb-8">
              <h2 id="faculty-heading" className="section-heading text-display-lg leading-tight">
                FACULTY AND ADMINISTRATION
              </h2>
              <p className="text-white/70 font-body max-w-2xl mx-auto mt-3">
                Thank you to the faculty members whose guidance and encouragement make Srijan Setu possible.
              </p>
            </div>
            {faculty.length > 0 ? (
              <TeamMemberGrid members={faculty} />
            ) : (
              <p className="text-center text-web-gray font-body">Faculty details coming soon.</p>
            )}
          </section>

          {tiers.map((tier) => {
            const members = team.filter((member) => member.tier === tier.id);
            return (
              <section key={tier.id} aria-labelledby={`${tier.id}-heading`}>
                <div className="text-center mb-8">
                  <h2 id={`${tier.id}-heading`} className="section-heading text-display-lg leading-tight">
                    {tier.title}
                  </h2>
                  <p className="text-white/70 font-body max-w-2xl mx-auto mt-3">{tier.description}</p>
                </div>
                {members.length > 0 ? (
                  <TeamMemberGrid members={members} />
                ) : (
                  <p className="text-center text-web-gray font-body">Team details coming soon.</p>
                )}
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}