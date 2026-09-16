export interface PrizeItem {
  place: string;
  amount: string;
  label: string;
}

export const totalPrizePool = "TO BE ANNOUNCED SOON";

export const prizes: PrizeItem[] = [
  {
    place: "Winner",
    amount: "To Be Announced Soon",
    label: "Grand Prize Champion",
  },
  {
    place: "1st Runner Up",
    amount: "To Be Announced Soon",
    label: "Second Place",
  },
  {
    place: "2nd Runner Up",
    amount: "To Be Announced Soon",
    label: "Third Place",
  },
];

export default prizes;
