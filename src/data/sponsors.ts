export type SponsorTier = "Corporate" | "Innovation" | "Community" | "Media" | "Media/Platform";

export interface Sponsor {
  name: string;
  logoUrl: string;
  tier: SponsorTier;
  websiteUrl?: string;
}

export const sponsors: Sponsor[] = [
  // Corporate Tier
  {
    name: "Apex Global Systems",
    logoUrl: "/images/sponsors/apex-global.svg",
    tier: "Corporate",
    websiteUrl: "#",
  },
  {
    name: "Nexus Cloud Ventures",
    logoUrl: "/images/sponsors/nexus-ventures.svg",
    tier: "Corporate",
    websiteUrl: "#",
  },

  // Innovation Tier
  {
    name: "Quantum Logic Labs",
    logoUrl: "/images/sponsors/quantum-logic.svg",
    tier: "Innovation",
    websiteUrl: "#",
  },
  {
    name: "CyberSphere Security",
    logoUrl: "/images/sponsors/cybersphere.svg",
    tier: "Innovation",
    websiteUrl: "#",
  },
  {
    name: "HyperScale AI Networks",
    logoUrl: "/images/sponsors/hyperscale.svg",
    tier: "Innovation",
    websiteUrl: "#",
  },

  // Community Tier
  {
    name: "DevGuild Community",
    logoUrl: "/images/sponsors/devguild.svg",
    tier: "Community",
    websiteUrl: "#",
  },
  {
    name: "OpenSource Collective",
    logoUrl: "/images/sponsors/opensource.svg",
    tier: "Community",
    websiteUrl: "#",
  },
  {
    name: "NextGen Innovators Hub",
    logoUrl: "/images/sponsors/nextgen-hub.svg",
    tier: "Community",
    websiteUrl: "#",
  },

  // Media Tier
  {
    name: "TechChronicle Daily",
    logoUrl: "/images/sponsors/techchronicle.svg",
    tier: "Media",
    websiteUrl: "#",
  },
  {
    name: "StartupWire Pulse",
    logoUrl: "/images/sponsors/startupwire.svg",
    tier: "Media",
    websiteUrl: "#",
  },
];

export default sponsors;
