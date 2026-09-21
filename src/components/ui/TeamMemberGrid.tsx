import type { TeamMember } from "@/types/event";
import TeamMemberCard from "@/components/ui/TeamMemberCard";

export default function TeamMemberGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}