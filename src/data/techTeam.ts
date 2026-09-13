export interface TechTeamMember {
  id: string;
  name: string;
  quote: string;
  photoUrl: string;
}

export const techTeam: TechTeamMember[] = [
  {
    id: "OP-01",
    name: "Arjun Mehta",
    quote: "Building resilient systems that turn chaotic data into clear solutions.",
    photoUrl: "/images/team/arjun-mehta.jpg",
  },
  {
    id: "OP-02",
    name: "Neha Kapoor",
    quote: "Designing intuitive interfaces where complexity feels effortlessly simple.",
    photoUrl: "/images/team/neha-kapoor.jpg",
  },
  {
    id: "OP-03",
    name: "Siddharth Rao",
    quote: "Low latency, zero downtime, and scalable distributed backends.",
    photoUrl: "/images/team/siddharth-rao.jpg",
  },
  {
    id: "OP-04",
    name: "Tanvi Deshmukh",
    quote: "Securing every endpoint, encrypting every payload, leaving no traces.",
    photoUrl: "/images/team/tanvi-deshmukh.jpg",
  },
  {
    id: "OP-05",
    name: "Kabir Joshi",
    quote: "Automating pipelines and deploying infrastructure as pure code.",
    photoUrl: "/images/team/kabir-joshi.jpg",
  },
  {
    id: "OP-06",
    name: "Meera Chawla",
    quote: "Training models to uncover patterns hidden beneath the surface.",
    photoUrl: "/images/team/meera-chawla.jpg",
  },
];

export default techTeam;
