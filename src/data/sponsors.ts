import type { Sponsor } from "@/types/event";

export type SponsorTier = "Corporate" | "Innovation" | "Community" | "Media" | "Media/Platform";

export const sponsors: Sponsor[] = [
  {
    id: "corporate-001",
    name: "Viziane",
    logo: "/images/logos/sponsors/viziane.png",
    website: "https://viziane.com",
    tier: "Corporate",
    order: 1,
  },
  {
    id: "corporate-002",
    name: "Kit Partner",
    logo: "",
    website: "",
    tier: "Corporate",
    order: 2,
  },
  {
    id: "innovation-001",
    name: "Accommodation Partner",
    logo: "",
    website: "",
    tier: "Innovation",
    order: 3,
  },
];

export default sponsors;