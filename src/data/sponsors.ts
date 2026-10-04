import type { Sponsor } from "@/types/event";

export type SponsorTier = "Corporate" | "Innovation" | "Community" | "Media" | "Media/Platform";

export const sponsors: Sponsor[] = [
  {
    id: "partner-001",
    name: "Viziane",
    logo: "/images/partners/viziane.png",
    logoUrl: "/images/partners/viziane.png",
    website: "https://viziane.com",
    category: "partner",
    order: 1,
  },
  {
    id: "partner-002",
    name: "Innovation Mission Punjab",
    logo: "/images/partners/innovation-mission-punjab.jpeg",
    logoUrl: "/images/partners/innovation-mission-punjab.jpeg",
    website: "",
    category: "partner",
    order: 2,
  },
  {
    id: "corporate-002",
    name: "ElevenLabs",
    logo: "/images/logos/sponsors/elevenlabs.png",
    logoUrl: "/images/logos/sponsors/elevenlabs.png",
    website: "https://elevenlabs.io",
    tier: "Corporate",
    category: "sponsor",
    order: 3,
  },
  {
    id: "innovation-001",
    name: "Accommodation Partner",
    logo: "",
    logoUrl: "",
    website: "",
    tier: "Innovation",
    category: "sponsor",
    order: 4,
  },
];

export default sponsors;