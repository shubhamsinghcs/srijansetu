export interface NavSubItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  subItems?: NavSubItem[];
}

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Themes", href: "#themes" },
  { label: "Timeline", href: "/timeline" },
  { label: "Prizes", href: "#prizes" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Team", href: "/team" },
  {
    label: "Resources",
    href: "#resources",
    subItems: [
      { label: "Event Resources", href: "#resources" },
      {
        label: "Campus Map",
        href: "https://share.google/zt4qyhwIkzNUlBsP0",
        external: true,
      },
    ],
  },
  { label: "Contact", href: "#contact" },
];

export default navItems;
