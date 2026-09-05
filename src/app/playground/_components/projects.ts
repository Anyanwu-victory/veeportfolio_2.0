export type PlaygroundProject = {
  id: string;
  title: string;
  description: string;
  tools: string[];
  href: string;
  previews: string[];
};

// Starter content from the supplied reference, https://www.goodie.work/playground.
// Replace these entries with your own projects; layout and animation stay separate.
// Previews are local assets so the gallery does not depend on remote image hosting.
export const projects: PlaygroundProject[] = [
  {
    id: "vsl",
    title: "VSL Matchup",
    description: "Find Love, even in Lagos Nigeria.",
    tools: ["Next js", "object oriented JS"],
    href: "https://vsl.goodie.work/",
    previews: ["vsl_1", "vsl_2", "vsl_3"],
  },
  {
    id: "untitled01",
    title: "Untitled 1",
    description: "A recreation of karinasirqueira.com.",
    tools: ["Html", "Css", "JS"],
    href: "https://untitled01.goodie.work/",
    previews: ["untitled01_1", "untitled01_2", "untitled01_3"],
  },
  {
    id: "untitled02",
    title: "Untitled 2",
    description: "Exploring new fun ways to rate.",
    tools: ["Rive Js", "RAF"],
    href: "https://untitled02.goodie.work/",
    previews: ["untitled02_1", "untitled02_2", "untitled02_3"],
  },
  {
    id: "howdy",
    title: "Howdy",
    description: "An Instant Messaging Web App.",
    tools: ["Vue", "Express", "GSAP", "TS"],
    href: "https://howdy.goodie.work/",
    previews: ["howdy_1", "howdy_2", "howdy_3"],
  },
  {
    id: "endl",
    title: "Endl",
    description: "Exploring React with Kadet's EndSars.",
    tools: ["React", "Github"],
    href: "https://bhpwt.csb.app/",
    previews: ["endl_1", "endl_2", "endl_3"],
  },
];
