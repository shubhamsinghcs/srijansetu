export interface SocialLinks {
  linkedin?: string;
  github?: string;
  instagram?: string;
  x?: string;
  website?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website?: string;
  tier: string;
  description?: string;
  featured?: boolean;
  order: number;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  featured?: boolean;
  order: number;
  heightClass?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  tier: TeamTier;
  image?: string;
  socials?: SocialLinks;
  order?: number;
}

export type TeamTier = "organizers" | "core-team" | "volunteers";

export interface Mentor {
  id: string;
  name: string;
  designation: string;
  company: string;
  image?: string;
  bio?: string;
  socials?: SocialLinks;
  order: number;
}

export interface Judge {
  id: string;
  name: string;
  designation: string;
  company: string;
  image?: string;
  bio?: string;
  socials?: SocialLinks;
  order: number;
}

export type TimelineStatus = "completed" | "active" | "upcoming";

export interface TimelineEvent {
  id: string;
  day?: string;
  date?: string;
  time: string;
  title: string;
  description: string;
  location?: string;
  status?: TimelineStatus;
  order: number;
}

export interface HackathonTheme {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  order: number;
  active: boolean;
}
