export type PrizeRank = "first" | "second" | "third" | "special" | "special-edtech";

export interface PrizeItem {
  id: string;
  place: string;
  rank: PrizeRank;
  amount: string;
  label: string;
  iconType?: "trophy" | "ai" | "edtech";
  badgeText?: string;
  bodyLine?: string;
  bottomTag?: string;
  sponsorTrack?: string;
  eligibilityNote?: string;
  actionButton?: {
    label: string;
    url: string;
    disabledNote?: string;
  };
  highlightPerk?: string;
  perks: string[];
}

export interface SponsorRewardItem {
  id: string;
  badge: string;
  title: string;
  tier: string;
  value: string;
  note?: string;
  accent: "purple" | "amber" | "cyan";
}

export const totalPrizePool = "₹5,32,000+";
export const totalPrizeValue = 532000;

export const prizes: PrizeItem[] = [
  {
    id: "winner",
    place: "Winner",
    rank: "first",
    amount: "₹31,000",
    label: "Grand Prize Champion",
    iconType: "trophy",
    highlightPerk: "Overall winning team: Each team member receives 3 months of our Pro tier ($297 value/team member, 600k credits/mo)",
    perks: [
      "1 Official Hoodie (Awarded to Team Leader)",
      "₹31,000 Cash Prize & Certificate",
    ],
  },
  {
    id: "runner-up",
    place: "Runner Up",
    rank: "second",
    amount: "₹21,000",
    label: "Second Place",
    iconType: "trophy",
    perks: [
      "1 Official Hoodie (Awarded to Team Leader)",
      "₹21,000 Cash Prize & Certificate",
    ],
  },
  {
    id: "second-runner-up",
    place: "2nd Runner Up",
    rank: "third",
    amount: "₹11,000",
    label: "Third Place",
    iconType: "trophy",
    perks: [
      "1 Official Hoodie (Awarded to Team Leader)",
      "₹11,000 Cash Prize & Certificate",
    ],
  },
  {
    id: "best-ai",
    place: "Best Use of AI",
    rank: "special",
    amount: "₹11,000",
    label: "Best Project Built with ElevenLabs",
    badgeText: "SPECIAL CATEGORY AWARD",
    sponsorTrack: "ELEVENLABS SPONSORED TRACK",
    bottomTag: "CASH BOUNTY + CERTIFICATE + HOODIE + ELEVENLABS SCALE TIER",
    iconType: "ai",
    highlightPerk: "Best Project Built with ElevenLabs: Each team member receives 3 months of our Scale tier ($897 value/team member, 1.8M credits/mo)",
    perks: [
      "1 Official Hoodie (Awarded to Team Leader)",
      "₹11,000 Cash Bounty & Certificate",
    ],
  },
  {
    id: "startup-launchpad",
    place: "Startup Launchpad",
    rank: "special-edtech",
    amount: "Mentorship & Pitch Support",
    label: "For EdTech & Future Learning builders",
    badgeText: "SPECIAL CATEGORY · EDTECH TRACK",
    iconType: "edtech",
    bodyLine: "1 month of mentorship + pitch support to a relevant authority",
    bottomTag: "MENTORSHIP + PITCH SUPPORT",
    sponsorTrack: "NEXTUTE EDTECH PVT. LTD. SPONSORED TRACK",
    eligibilityNote: "Eligible teams will be contacted after judging.",
    actionButton: {
      label: "Apply for Mentorship",
      url: "#nextute-form",
      disabledNote: "Form activates after hackathon judging.",
    },
    highlightPerk: "Nextute EdTech Pvt. Ltd.: 1 month of dedicated startup mentorship and authority pitch support for standout EdTech solutions.",
    perks: [
      "1 Month 1-on-1 Startup Mentorship with Nextute Founders",
      "Pitch Deck Refinement & Authority Pitch Guidance",
      "Direct Support to Pitch to Relevant Educational Authorities",
    ],
  },
];

export const sponsorRewards: SponsorRewardItem[] = [
  {
    id: "all-participants",
    badge: "EVERY PARTICIPANT · BONUS, NOT IN TOTAL ABOVE",
    title: "1 Month Free — Creator Tier",
    tier: "1 Month Free — Creator Tier",
    value: "₹2,100 value",
    note: "131k credits · Universal participant access via ElevenLabs ($22/mo value)",
    accent: "purple",
  },
  {
    id: "overall-winning-team",
    badge: "WINNING TEAM",
    title: "3 Months Pro Tier",
    tier: "3 Months Pro Tier",
    value: "₹28,500 value per member",
    note: "600k credits/mo · $297 value per member (₹1,14,000 for team of 4)",
    accent: "amber",
  },
  {
    id: "best-ai-elevenlabs",
    badge: "BEST USE OF ElevenLabs",
    title: "3 Months Scale Tier",
    tier: "3 Months Scale Tier",
    value: "₹86,100 value per member",
    note: "1.8M credits/mo · $897 value per member (₹3,44,400 for team of 4)",
    accent: "cyan",
  },
];

export const participantSwag = [
  "Certificate",
  "Sticker",
  "Srijan Setu Customized Cup",
];

export const podiumPrizes = prizes.filter((p) => p.rank !== "special" && p.rank !== "special-edtech");
export const specialPrizes = prizes.filter((p) => p.rank === "special" || p.rank === "special-edtech");

export default prizes;
