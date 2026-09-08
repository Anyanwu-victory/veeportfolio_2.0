import type { Metadata } from "next";
import IllustratedAbout from "./_components/IllustratedAbout";

export const metadata: Metadata = {
  title: "About Vicky — A little beyond the screen",
  description: "A few words, a few sketches, and the person behind the interfaces.",
  robots: { index: false, follow: false },
};

export default function IllustratedAboutPage() {
  return <IllustratedAbout />;
}
