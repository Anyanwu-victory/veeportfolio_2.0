import type { Metadata } from "next";
import PlaygroundJournal from "./_components/PlaygroundJournal";

export const metadata: Metadata = {
  title: "Playground — An experiment journal",
  description: "From blood, sweat and experimentations to beautiful websites. A collection of interface studies and things made out of curiosity.",
};

export default function PlaygroundJournalPage() {
  return <PlaygroundJournal />;
}
