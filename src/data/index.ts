import sponsorsData from "@data/sponsors.json";
import teamData from "@data/team.json";
import mentorsData from "@data/mentors.json";
import judgesData from "@data/judges.json";
import communityPartnersData from "@data/community-partners.json";
import innovationPartnersData from "@data/innovation-partners.json";
import mediaPlatformPartnersData from "@data/media-platform-partners.json";
import corporatePartnersData from "@data/corporate-partners.json";
import timelineDataJson from "@data/timeline.json";
import themesData from "@data/themes.json";

import type {
  Sponsor,
  Partner,
  TeamMember,
  Mentor,
  Judge,
  TimelineEvent,
  HackathonTheme,
  SocialLinks,
} from "@/types/event";

// Sort helper guaranteeing items are ordered ascending by the "order" field
export const sortByOrder = <T extends { order: number }>(items: T[]): T[] => {
  return [...items].sort((a, b) => a.order - b.order);
};

export const sponsors: Sponsor[] = sortByOrder(sponsorsData as Sponsor[]);
export const team: TeamMember[] = sortByOrder(teamData as TeamMember[]);
export const mentors: Mentor[] = sortByOrder(mentorsData as Mentor[]);
export const judges: Judge[] = sortByOrder(judgesData as Judge[]);
export const communityPartners: Partner[] = sortByOrder(communityPartnersData as Partner[]);
export const innovationPartners: Partner[] = sortByOrder(innovationPartnersData as Partner[]);
export const mediaPlatformPartners: Partner[] = sortByOrder(mediaPlatformPartnersData as Partner[]);
export const corporatePartners: Partner[] = sortByOrder(corporatePartnersData as Partner[]);
export const timeline: TimelineEvent[] = sortByOrder(timelineDataJson as TimelineEvent[]);
export const themes: HackathonTheme[] = sortByOrder(themesData as HackathonTheme[]);

// Re-export raw JSON default bindings
export { default as sponsorsJson } from "@data/sponsors.json";
export { default as teamJson } from "@data/team.json";
export { default as mentorsJson } from "@data/mentors.json";
export { default as judgesJson } from "@data/judges.json";
export { default as communityPartnersJson } from "@data/community-partners.json";
export { default as innovationPartnersJson } from "@data/innovation-partners.json";
export { default as mediaPlatformPartnersJson } from "@data/media-platform-partners.json";
export { default as corporatePartnersJson } from "@data/corporate-partners.json";
export { default as timelineJson } from "@data/timeline.json";
export { default as themesJson } from "@data/themes.json";

// Type exports
export type {
  Sponsor,
  Partner,
  TeamMember,
  Mentor,
  Judge,
  TimelineEvent,
  HackathonTheme,
  SocialLinks,
};
