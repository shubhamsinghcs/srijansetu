export type PrizeRank = "first" | "second" | "third" | "special";

export interface PrizeItem {
  id: string;
  place: string;
  rank: PrizeRank;
  amount: string;
  label: string;
  iconType?: "trophy" | "ai";
  highlightPerk?: string;
  perks: string[];
}

export const totalPrizePool = "₹74,000+";

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
      "1 Official Hoodie for Team Leader",
      "₹31,000 Cash Prize + Champion Trophy & Certificate",
      "Direct Incubation & Investor Pitch Access",
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
      "1 Official Hoodie for Team Leader",
      "₹21,000 Cash Prize + Runner-Up Trophy & Certificate",
      "Partner Cloud Credits & Developer Swag",
      "Mentorship & Networking Opportunities",
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
      "1 Official Hoodie for Team Leader",
      "₹11,000 Cash Prize + 2nd Runner-Up Trophy & Certificate",
      "Developer Toolkits & Goodie Bag",
      "Community Builder Ecosystem Access",
    ],
  },
  {
    id: "best-ai",
    place: "Best Use of AI",
    rank: "special",
    amount: "₹11,000",
    label: "Best Project Built with ElevenLabs",
    iconType: "ai",
    highlightPerk: "Best Project Built with ElevenLabs: Each team member receives 3 months of our Scale tier ($897 value/team member, 1.8M credits/mo)",
    perks: [
      "1 Official Hoodie for Team Leader",
      "₹11,000 Cash Bounty + Special AI Innovation Trophy & Certificate",
      "Feature on Developer Showcase & Spotlight",
    ],
  },
];

export const podiumPrizes = prizes.filter((p) => p.rank !== "special");
export const specialPrizes = prizes.filter((p) => p.rank === "special");

export default prizes;
