import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Industries } from "@/components/industries"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { SiteBackground } from "@/components/site-background"

export default function HomePage() {
  return (
    <main className="relative z-10 min-h-screen">
      <SiteBackground />
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Industries />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
