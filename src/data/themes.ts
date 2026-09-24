export interface HackathonTheme {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  order: number;
  active: boolean;
}

export const themes: HackathonTheme[] = [
  {
    id: "healthtech-wellbeing",
    name: "HealthTech & Wellbeing",
    shortName: "HealthTech & Wellbeing",
    description: "Building accessible, intelligent, and human-centered solutions for better healthcare and well-being.",
    icon: "HeartPulse",
    order: 1,
    active: true,
  },
  {
    id: "agritech-rural-innovation",
    name: "AgriTech & Rural Innovation",
    shortName: "AgriTech & Rural Innovation",
    description: "Using technology to improve farming, agricultural decision-making, market access, and rural livelihoods.",
    icon: "Sprout",
    order: 2,
    active: true,
  },
  {
    id: "civictech-sustainability-waste",
    name: "CivicTech, Sustainability & Waste",
    shortName: "CivicTech, Sustainability & Waste",
    description: "Creating smarter, cleaner and more resilient communities through technology and citizen-centric innovation.",
    icon: "Landmark",
    order: 3,
    active: true,
  },
  {
    id: "edtech-future-learning",
    name: "EdTech & Future Learning",
    shortName: "EdTech & Future Learning",
    description: "Reimagining education through personalized, accessible and technology-driven learning experiences.",
    icon: "GraduationCap",
    order: 4,
    active: true,
  },
  {
    id: "fintech-financial-inclusion",
    name: "FinTech & Financial Inclusion",
    shortName: "FinTech & Financial Inclusion",
    description: "Making financial services more accessible, secure, transparent and useful for individuals and businesses.",
    icon: "WalletCards",
    order: 5,
    active: true,
  },
  {
    id: "open-innovation",
    name: "Open Innovation",
    shortName: "Open Innovation",
    description: "Solve a meaningful problem beyond the defined domains with technology, creativity, and measurable impact.",
    icon: "Sparkles",
    order: 6,
    active: true,
  },
];

export default themes;
