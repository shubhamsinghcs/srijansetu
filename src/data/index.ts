import { sponsors as sponsorsData } from "./sponsors";
import { team as teamData } from "./team";
import { mentors as mentorsData } from "./mentors";
import { judges as judgesData } from "./judges";
import { timeline as timelineData } from "./timeline";
import { themes as themesData } from "./themes";
import { heroPartnerLogos as heroPartnerLogosData } from "./hero";
import { communityPartners as communityPartnersData } from "./communityPartners";
import { sponsorTiers as sponsorTiersData } from "./sponsorTiers";

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

export const sortByOrder = <T extends { order: number }>(items: T[]): T[] => {
  return [...items].sort((a, b) => a.order - b.order);
};

export const sponsors: Sponsor[] = sortByOrder(sponsorsData);
export const team: TeamMember[] = [...teamData];
export const mentors: Mentor[] = sortByOrder(mentorsData as Mentor[]);
export const judges: Judge[] = sortByOrder(judgesData as Judge[]);
export const communityPartners: Partner[] = sortByOrder(communityPartnersData);
export const timeline: TimelineEvent[] = sortByOrder(timelineData as TimelineEvent[]);
export const themes: HackathonTheme[] = sortByOrder(themesData as HackathonTheme[]);
export const heroPartnerLogos = heroPartnerLogosData;
export const sponsorTiers = sponsorTiersData;

export { sponsors as sponsorsDataExport } from "./sponsors";
export { team as teamDataExport } from "./team";
export { mentors as mentorsDataExport } from "./mentors";
export { judges as judgesDataExport } from "./judges";
export { timeline as timelineDataExport } from "./timeline";
export { themes as themesDataExport } from "./themes";
export { heroPartnerLogos as heroPartnerLogosDataExport } from "./hero";
export { sponsorTiers as sponsorTiersDataExport } from "./sponsorTiers";

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
