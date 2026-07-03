import React from 'react'
import HeroSection from "@/components/Hero"
import Header from "@/components/Header"
import Navigation from "@/components/DesktopNav"

const Home = () => {
  const [activePage, setActivePage] = React.useState<string>('home')

  const handleNavigate = (page: any) => {
    // navigation handler placeholder
    console.log('navigate to', page)
    setActivePage(page)
  }

  return (
    <section>
      <Header />

    <Navigation activePage={activePage} onNavigate={handleNavigate} />
      <HeroSection />
    </section>
  )
}

export default Home