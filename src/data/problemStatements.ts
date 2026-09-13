export interface ProblemStatement {
  id: string;
  domain: string;
  sponsorTag: string;
  title: string;
  description: string;
  briefUrl: string;
  isFeatured?: boolean;
}

export const problemStatements: ProblemStatement[] = [
  // 2 Featured Problem Statements
  {
    id: "ps-01",
    domain: "Healthcare & AI",
    sponsorTag: "Sponsored by HealthCorp",
    title: "AI-Driven Early Diagnosis for Rural Clinics",
    description:
      "Develop an offline-first or low-bandwidth diagnostic tool that leverages computer vision to analyze preliminary screening imagery and assist frontline healthcare workers in remote regions.",
    briefUrl: "#ps-01-brief",
    isFeatured: true,
  },
  {
    id: "ps-02",
    domain: "Web3 & Supply Chain",
    sponsorTag: "Sponsored by LogiTech Global",
    title: "Transparent & Decentralized Cold-Chain Tracking",
    description:
      "Design a verifiable ledger and IoT sensor telemetry system to monitor temperature-sensitive pharmaceuticals across transit phases with automated dispute settlement.",
    briefUrl: "#ps-02-brief",
    isFeatured: true,
  },

  // 6 Domain Entries
  {
    id: "ps-03",
    domain: "FinTech & Financial Inclusion",
    sponsorTag: "FinTech Track",
    title: "Micro-Credit Risk Scoring for Unbanked Populations",
    description: "Alternative credit scoring algorithms using non-traditional financial indicators and UPI velocity.",
    briefUrl: "#ps-03-brief",
    isFeatured: false,
  },
  {
    id: "ps-04",
    domain: "CleanTech & Sustainability",
    sponsorTag: "Green Earth Track",
    title: "Localized Carbon Footprint & Waste Optimization",
    description: "Smart waste segregation algorithms and localized carbon credit exchange systems for urban campuses.",
    briefUrl: "#ps-04-brief",
    isFeatured: false,
  },
  {
    id: "ps-05",
    domain: "EdTech & Adaptive Learning",
    sponsorTag: "EdTech Track",
    title: "Multilingual AI Tutor for Vernacular Students",
    description: "Voice-driven personalized learning assistant supporting regional Indian dialects and real-time feedback.",
    briefUrl: "#ps-05-brief",
    isFeatured: false,
  },
  {
    id: "ps-06",
    domain: "CyberSecurity & Privacy",
    sponsorTag: "Security Track",
    title: "Zero-Trust Device Identity in Decentralized Work",
    description: "Continuous anomaly detection and biometric session verification against synthetic identity attacks.",
    briefUrl: "#ps-06-brief",
    isFeatured: false,
  },
  {
    id: "ps-07",
    domain: "AgriTech & Smart Farming",
    sponsorTag: "Agri Track",
    title: "Drone Imagery & Soil Health Crop Yield Prediction",
    description: "Multispectral satellite and drone feed analytics predicting optimal harvest dates and pest outbreaks.",
    briefUrl: "#ps-07-brief",
    isFeatured: false,
  },
  {
    id: "ps-08",
    domain: "Smart Cities & Urban Mobility",
    sponsorTag: "Urban Track",
    title: "Dynamic Congestion Management & Emergency Routing",
    description: "Traffic signal automation dynamically giving priority corridors to ambulances and emergency responders.",
    briefUrl: "#ps-08-brief",
    isFeatured: false,
  },
];

export default problemStatements;
