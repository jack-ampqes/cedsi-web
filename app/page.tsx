import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Industries } from "@/components/industries"
import { Contact } from "@/components/contact"
import { HashScrollHandler } from "@/components/hash-scroll-handler"

export default function HomePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative z-10 min-h-screen outline-none"
    >
      <HashScrollHandler />
      <Hero />
      <Services />
      <About />
      <Industries />
      <Contact />
    </main>
  )
}
