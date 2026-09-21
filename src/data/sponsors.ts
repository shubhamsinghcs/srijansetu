import type { Sponsor } from "@/types/event";

export type SponsorTier = "Corporate" | "Innovation" | "Community" | "Media" | "Media/Platform";

export const sponsors: Sponsor[] = [
  {
    id: "corporate-001",
    name: "Apex Global Systems",
    logo: "/images/logos/sponsors/apex-global.svg",
    tier: "Corporate",
    website: "#",
    order: 1,
  },
  {
    id: "corporate-002",
    name: "Nexus Cloud Ventures",
    logo: "/images/logos/sponsors/nexus-ventures.svg",
    tier: "Corporate",
    website: "#",
    order: 2,
  },
  {
    id: "innovation-001",
    name: "Quantum Logic Labs",
    logo: "/images/logos/sponsors/quantum-logic.svg",
    tier: "Innovation",
    website: "#",
    order: 3,
  },
];

export default sponsors;