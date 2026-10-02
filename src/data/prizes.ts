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

export const totalPrizePool = "TO BE ANNOUNCED SOON";

export const prizes: PrizeItem[] = [
  {
    id: "winner",
    place: "Winner",
    rank: "first",
    amount: "To Be Announced Soon",
    label: "Grand Prize Champion",
    iconType: "trophy",
    highlightPerk: "Overall winning team: Each team member receives 3 months of our Pro tier ($297 value/team member, 600k credits/mo)",
    perks: [
      "1 Official Hoodie for Team Leader",
      "Cash Prize + Champion Trophy & Certificate",
      "Direct Incubation & Investor Pitch Access",
    ],
  },
  {
    id: "runner-up",
    place: "Runner Up",
    rank: "second",
    amount: "To Be Announced Soon",
    label: "Second Place",
    iconType: "trophy",
    perks: [
      "1 Official Hoodie for Team Leader",
      "Cash Prize + Runner-Up Trophy & Certificate",
      "Partner Cloud Credits & Developer Swag",
      "Mentorship & Networking Opportunities",
    ],
  },
  {
    id: "second-runner-up",
    place: "2nd Runner Up",
    rank: "third",
    amount: "To Be Announced Soon",
    label: "Third Place",
    iconType: "trophy",
    perks: [
      "1 Official Hoodie for Team Leader",
      "Cash Prize + 2nd Runner-Up Trophy & Certificate",
      "Developer Toolkits & Goodie Bag",
      "Community Builder Ecosystem Access",
    ],
  },
  {
    id: "best-ai",
    place: "Best Use of AI",
    rank: "special",
    amount: "To Be Announced Soon",
    label: "Best Project Built with ElevenLabs",
    iconType: "ai",
    highlightPerk: "Best Project Built with ElevenLabs: Each team member receives 3 months of our Scale tier ($897 value/team member, 1.8M credits/mo)",
    perks: [
      "1 Official Hoodie for Team Leader",
      "Special AI Innovation Trophy & Certificate",
      "Feature on Developer Showcase & Spotlight",
    ],
  },
];

export const podiumPrizes = prizes.filter((p) => p.rank !== "special");
export const specialPrizes = prizes.filter((p) => p.rank === "special");

export default prizes;
