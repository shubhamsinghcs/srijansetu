export interface PrizeItem {
  place: string;
  amount: string;
  label: string;
  iconType?: "trophy" | "ai";
}

export const totalPrizePool = "TO BE ANNOUNCED SOON";

export const prizes: PrizeItem[] = [
  {
    place: "Winner",
    amount: "To Be Announced Soon",
    label: "Grand Prize Champion",
    iconType: "trophy",
  },
  {
    place: "Runner Up",
    amount: "To Be Announced Soon",
    label: "Second Place",
    iconType: "trophy",
  },
  {
    place: "2nd Runner Up",
    amount: "To Be Announced Soon",
    label: "Third Place",
    iconType: "trophy",
  },
  {
    place: "Best Use of AI",
    amount: "To Be Announced Soon",
    label: "AI Innovation Award",
    iconType: "ai",
  },
];

export default prizes;
