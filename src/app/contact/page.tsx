import ContactContent from "@/app/contact/_components/ContactContent";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site";
import { getContactPageData } from "@/sanity/lib/pageData";
import { notFound } from "next/navigation";

export const metadata: Metadata = createPageMetadata({
  path: "/contact",
  title: "Contact Victory Anyanwu | Frontend Engineer",
  description:
    "Contact Victory Anyanwu in Abuja, Nigeria, about frontend engineering, creative development, or your next web project.",
});

export default async function ContactPage() {
  const data = await getContactPageData();

  if (!data) notFound();

  return <ContactContent data={data} />;
}
