import type { Partner } from "@/types/event";

export const communityPartners: Partner[] = [
  {
    id: "community-partner-001",
    name: "Google Developer Groups On Campus Indo Global College",
    logo: "/images/logos/partners/gdg.png",
    website: "https://gdg.community.dev",
    description: "Developer community fostering peer-to-peer technical growth and hands-on workshops.",
    featured: true,
    order: 1,
  },
  {
    id: "community-partner-002",
    name: "Campus Body Indo Global Colleges",
    logo: "/images/logos/partners/campus-body.png",
    website: "https://iglobal.org",
    description: "Student collective driving campus hack culture, mentorship, and tech initiatives.",
    featured: true,
    order: 2,
  },
];

export default communityPartners;