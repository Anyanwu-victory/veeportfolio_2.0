import React from "react";
import Navigation from "@/components/DesktopNav";
import Hero from "@/components/Hero"; 
import Container from "@/components/Container";

type HomeProps = {
  activePage: string;
  onNavigate: (page: string) => void;
};

const Home = ({ activePage, onNavigate }: HomeProps) => {
  return (
    <Container className="home">
      <section className="home_header">
        <div className="home_header-wrapper flex flex-col justify-center align-baseline  ">
          {/* <h1 className="home_header_text text-center text-6xl ">Victory</h1> */}
        </div>
        <Hero/>
      </section>
      {/* Navigation
      <section  className="home_navigation">
        <Navigation activePage={activePage} onNavigate={onNavigate} />
      </section> */}
    </Container>
  );
};

export default Home;