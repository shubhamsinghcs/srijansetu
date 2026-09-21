import type { Partner } from "@/types/event";
import { communityPartners } from "./communityPartners";
import { sponsors } from "./sponsors";

export interface SponsorTierSection {
  id: string;
  title: string;
  subtitle: string;
  partners: Partner[];
}

const sponsorPartners: Partner[] = sponsors.map((sponsor) => ({
  id: sponsor.id,
  name: sponsor.name,
  logo: sponsor.logo,
  website: sponsor.website,
  order: sponsor.order,
}));

export const sponsorTiers: SponsorTierSection[] = [
  {
    id: "community",
    title: "COMMUNITY PARTNERS",
    subtitle: "Communities coming together to spread the word, connect builders, and grow the Srijan Setu ecosystem.",
    partners: communityPartners,
  },
  {
    id: "sponsors",
    title: "SPONSORS",
    subtitle: "Backed by forward-thinking organizations, industry leaders, and vibrant developer communities.",
    partners: sponsorPartners,
  },
];

export default sponsorTiers;