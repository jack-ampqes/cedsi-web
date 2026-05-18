"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const stats = [
  { value: 30, suffix: "+", label: "Years of Experience" },
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 50, suffix: "+", label: "Industry Partners" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
]

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number
  suffix: string
  inView: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    const stepDuration = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [value, inView])

  return (
    <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary text-glow">
      {count}
      {suffix}
    </span>
  )
}

export function About() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-24 lg:py-32 bg-secondary/30 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                inView={statsInView}
              />
              <p className="text-muted-foreground mt-2 text-sm md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, x: -30 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              About CEDSI
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Engineering Excellence Since 1990
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Controls and Electrical Design Services, Inc. (CEDSI) has been a
                trusted partner for industrial clients since 1990. Our team of
                experienced engineers delivers innovative solutions for complex
                electrical and automation challenges.
              </p>
              <p className="leading-relaxed">
                We specialize in providing comprehensive electrical engineering
                services, from initial design through commissioning. Our
                UL-certified panel shop ensures the highest quality standards
                for all fabricated products.
              </p>
              <p className="leading-relaxed">
                With deep expertise across multiple industries, we understand
                the unique requirements and regulatory standards that drive
                successful project outcomes.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Visual Element */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: 30 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square relative rounded-lg overflow-hidden bg-card border border-border">
              {/* Engineering Grid Pattern */}
              <div className="absolute inset-0 grid-pattern" />

              {/* Blueprint-style content */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full h-full border-2 border-dashed border-primary/30 rounded-lg p-6 flex flex-col justify-center">
                  {/* Circuit-like decorations */}
                  <svg
                    className="w-full h-full text-primary/20"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Horizontal lines */}
                    <line x1="0" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="2" />
                    <line x1="120" y1="50" x2="200" y2="50" stroke="currentColor" strokeWidth="2" />
                    <line x1="0" y1="100" x2="60" y2="100" stroke="currentColor" strokeWidth="2" />
                    <line x1="140" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="2" />
                    <line x1="0" y1="150" x2="80" y2="150" stroke="currentColor" strokeWidth="2" />
                    <line x1="120" y1="150" x2="200" y2="150" stroke="currentColor" strokeWidth="2" />

                    {/* Vertical lines */}
                    <line x1="50" y1="0" x2="50" y2="40" stroke="currentColor" strokeWidth="2" />
                    <line x1="50" y1="60" x2="50" y2="90" stroke="currentColor" strokeWidth="2" />
                    <line x1="150" y1="110" x2="150" y2="140" stroke="currentColor" strokeWidth="2" />
                    <line x1="150" y1="160" x2="150" y2="200" stroke="currentColor" strokeWidth="2" />

                    {/* Nodes/circles */}
                    <circle cx="80" cy="50" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="120" cy="50" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="60" cy="100" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="140" cy="100" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="80" cy="150" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="120" cy="150" r="8" stroke="currentColor" strokeWidth="2" fill="none" />

                    {/* Center element */}
                    <rect x="85" y="85" width="30" height="30" stroke="currentColor" strokeWidth="2" fill="none" />
                    <line x1="92" y1="100" x2="108" y2="100" stroke="currentColor" strokeWidth="2" />
                    <line x1="100" y1="92" x2="100" y2="108" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/50" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/50" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/50" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg glow-cyan">
              <span className="text-sm font-semibold">UL 508A Certified</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
