import React from 'react'
import HeroSection from "@/components/Hero"
import Header from "@/components/Header"
import Navigation from "@/components/DesktopNav"
import Container from "@/components/Container"

const Home = () => {
  const [activePage, setActivePage] = React.useState<string>('home')

  const handleNavigate = (page: any) => {
    // navigation handler placeholder
    console.log('navigate to', page)
    setActivePage(page)
  }

  return (
    // pt-[88px] should match your header height (h-20 = 80px + some buffer)
    <Container className="pt-22">
      <section>
        <Navigation activePage={activePage} onNavigate={handleNavigate} />
        <HeroSection />
      </section>
    </Container>
  )
}

export default Home