export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Problem Statements", href: "#problem-statements" },
  { label: "Timeline", href: "/timeline" },
  { label: "Prizes", href: "#prizes" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "#contact" },
];

export default navItems;
