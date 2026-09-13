export interface Mentor {
  name: string;
  role: string;
  company: string;
  photoUrl: string;
  linkedinUrl: string;
}

export const mentors: Mentor[] = [
  {
    name: "Dr. Aisha Sharma",
    role: "Head of AI Research",
    company: "NeuralCraft Dynamics",
    photoUrl: "/images/mentors/aisha-sharma.jpg",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Rohan Verma",
    role: "VP of Engineering",
    company: "CloudScale Systems",
    photoUrl: "/images/mentors/rohan-verma.jpg",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Priya Nair",
    role: "Principal Product Architect",
    company: "FinTech Orbit",
    photoUrl: "/images/mentors/priya-nair.jpg",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Vikram Sengupta",
    role: "Chief Information Security Officer",
    company: "Aegis Cyber Defense",
    photoUrl: "/images/mentors/vikram-sengupta.jpg",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Ananya Iyer",
    role: "Director of Web3 Systems",
    company: "BlockCore Labs",
    photoUrl: "/images/mentors/ananya-iyer.jpg",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Karan Malhotra",
    role: "Founder & Seed Investor",
    company: "VentureSpark Studio",
    photoUrl: "/images/mentors/karan-malhotra.jpg",
    linkedinUrl: "https://linkedin.com",
  },
];

export default mentors;
