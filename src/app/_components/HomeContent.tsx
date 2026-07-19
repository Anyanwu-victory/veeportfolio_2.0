import Hero from "@/components/Hero";
import Container from "@/components/ui/Container";

export default function HomeContent() {
  return (
    <Container className="home">
      <section className="home_header">
        <div className="home_header-wrapper flex flex-col justify-center align-baseline" />
        <Hero />
      </section>
    </Container>
  );
}
