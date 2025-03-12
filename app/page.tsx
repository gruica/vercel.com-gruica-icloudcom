"use client"
import { usePathname } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/Hero"
import { AboutSection } from "@/components/AboutSection"
import { ServicesSection } from "@/components/ServicesSection"
import { ContactSection } from "@/components/ContactSection"

export default function Home() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col min-h-screen">
      <Header activePath={pathname} />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

