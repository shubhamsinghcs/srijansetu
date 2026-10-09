import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { faculty, team } from "@/data";
import type { TeamTier } from "@/types/event";
import TeamMemberGrid from "@/components/ui/TeamMemberGrid";

const allTiers: { id: TeamTier; title: string; description: string }[] = [
  {
    id: "ceo",
    title: "Young Dynamic Visionary Leader",
    description: "The executive leadership steering Indo Global Colleges towards excellence and innovation.",
  },
  {
    id: "principal",
    title: "PRINCIPALS",
    description: "The academic leaders guiding the colleges and supporting student-driven initiatives.",
  },
  {
    id: "faculty",
    title: "FACULTY",
    description: "The dedicated faculty members mentoring and empowering students to push boundaries.",
  },
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
  // Combine faculty and team arrays so we can filter from one source
  const allMembers = [...faculty, ...team];

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
        </div>

        <div className="space-y-16 sm:space-y-20">
          {allTiers.map((tier) => {
            const members = allMembers.filter((member) => member.tier === tier.id);
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
                  <p className="text-center text-web-gray font-body">Details coming soon.</p>
                )}
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}