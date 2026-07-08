export type NavItem = {
  number: string;
  label: string;
  href: string;
};

// The 4 primary sections of the site. Order matters here — it drives the
// 01 / 02 / 03 / 04 numbering shown in the sidebar and on the homepage.
export const navItems: NavItem[] = [
  { number: "01", label: "Work", href: "#work" },
  { number: "02", label: "About", href: "#about" },
  { number: "03", label: "Playground", href: "#playground" },
  { number: "04", label: "Contact", href: "#contact" },
];