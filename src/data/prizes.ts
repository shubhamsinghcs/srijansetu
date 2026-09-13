export interface PrizeItem {
  place: string;
  amount: string;
  label: string;
}

export const totalPrizePool = "₹5,00,000";

export const prizes: PrizeItem[] = [
  {
    place: "Winner",
    amount: "₹2,50,000",
    label: "Grand Prize Champion",
  },
  {
    place: "1st Runner Up",
    amount: "₹1,50,000",
    label: "Second Place",
  },
  {
    place: "2nd Runner Up",
    amount: "₹1,00,000",
    label: "Third Place",
  },
];

export default prizes;
