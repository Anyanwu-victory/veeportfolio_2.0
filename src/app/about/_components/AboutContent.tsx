import Container from "@/components/ui/Container";
import AboutHero from "@/components/AboutHero";
import type { AboutPageData } from "@/sanity/lib/queries";

type AboutContentProps = {
  data: AboutPageData;
};

export default function AboutContent({ data }: AboutContentProps) {
  return (
    <Container className="about">
      <section className="about-content">
        <AboutHero data={data} />
      </section>
    </Container>
  );
}
