import React from "react";
import Navigation from "@/components/DesktopNav";
import Container from "@/components/Container";

type HomeProps = {
  activePage: string;
  onNavigate: (page: string) => void;
};

const Home = ({ activePage, onNavigate }: HomeProps) => {
  return (
    <Container className="pt-22">
      <section>
        <Navigation activePage={activePage} onNavigate={onNavigate} />
      </section>
    </Container>
  );
};

export default Home;