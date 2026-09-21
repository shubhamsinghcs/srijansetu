import type { TeamMember } from "@/types/event";
import TeamMemberCard from "@/components/ui/TeamMemberCard";

export default function TeamMemberGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {members.map((member) => (
        <div
          key={member.id}
          className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-[400px] flex"
        >
          <div className="w-full h-full flex flex-col">
            <TeamMemberCard member={member} />
          </div>
        </div>
      ))}
    </div>
  );
}