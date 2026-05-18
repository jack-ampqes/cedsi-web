"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Settings, Shield } from "lucide-react"

const features = [
  { icon: Zap, label: "Power Systems" },
  { icon: Settings, label: "Industrial Controls" },
  { icon: Shield, label: "Quality Assured" },
]

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border-none mb-8"
          >
            <span className="text-sm font-medium text-primary">
              30+ Years of Engineering Excellence
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-6 flex justify-center"
          >
            <div
              className="h-35 w-65 md:h-55 md:w-85 bg-primary"
              role="img"
              aria-label="CEDSI alternate logo mark"
              style={{
                WebkitMaskImage: "url('/CEDSI-logo-alt.svg')",
                maskImage: "url('/CEDSI-logo-alt.svg')",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 text-balance"
          >
            An <span className="text-primary text-glow">Exceptional</span>{" "}
            Engineering Resource
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty"
          >
            Expert electrical design, industrial controls, PLC programming, and
            panel fabrication services. Delivering innovative solutions that
            power your success.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("#contact")}
              className="bg-primary text-primary-foreground border border-transparent hover:border-white/80 hover:bg-transparent hover:text-primary px-8"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("#services")}
              className="border-border border-white/80 hover:border-transparent hover:bg-white/75 hover:text-primary-foreground px-8"
            >
              Explore Services
            </Button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            {features.map((feature, index) => (
              <div
                key={feature.label}
                className="group flex items-center gap-2 text-muted-foreground"
              >
                <div className="flex items-center gap-2 rounded-full px-3 py-2 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_6px_0_0_#00000080]">
           
                  <feature.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
                {index < features.length - 1 && (
                  <span className="hidden sm:block ml-6 w-1 h-1 rounded-full bg-border" />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  )
}
