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
    id: "agri-tech",
    name: "Agri Tech",
    shortName: "Agri Tech",
    description: "Technology-driven solutions for agriculture, crop yield optimization, and rural challenges.",
    icon: "Sprout",
    order: 1,
    active: true,
  },
  {
    id: "health-tech",
    name: "Health Tech",
    shortName: "Health Tech",
    description: "Transforming patient diagnostics, telemedicine access, and predictive healthcare delivery.",
    icon: "HeartPulse",
    order: 2,
    active: true,
  },
  {
    id: "e-commerce",
    name: "E-commerce",
    shortName: "E-commerce",
    description: "Revolutionizing retail supply chains, localized commerce networks, and merchant tools.",
    icon: "ShoppingCart",
    order: 3,
    active: true,
  },
  {
    id: "fintech",
    name: "Fintech",
    shortName: "Fintech",
    description: "Modern financial inclusion, micro-credit algorithms, and automated decentralized protocols.",
    icon: "Landmark",
    order: 4,
    active: true,
  },
  {
    id: "ed-tech",
    name: "Ed-Tech",
    shortName: "Ed-Tech",
    description: "Adaptive vernacular learning, digital classrooms, and AI-powered skill acceleration.",
    icon: "GraduationCap",
    order: 5,
    active: true,
  },
  {
    id: "open-theme",
    name: "Open Theme",
    shortName: "Open Theme",
    description: "Unconstrained breakthrough innovations across cybersecurity, sustainability, and urban robotics.",
    icon: "Sparkles",
    order: 6,
    active: true,
  },
];

export default themes;
