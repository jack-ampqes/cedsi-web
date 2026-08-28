"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
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
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!inView || prefersReducedMotion) return

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
  }, [value, inView, prefersReducedMotion])

  return (
    <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
      {inView && prefersReducedMotion ? value : count}
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
              <p className="leading-relaxed">
                CEDSI is part of AMP Quality Energy Services, giving our clients
                access to a broader bench of{" "}
                <a
                  href="https://www.ampqes.com/services/engineering-services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-none"
                >
                  engineering services
                </a>
                {", "}
                including arc flash studies, device coordination, load studies,
                and short circuit analysis.
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
            <div className="aspect-[3/2] relative rounded-none overflow-hidden bg-card border border-border">
              <Image
                src="/team.jpg"
                alt="The CEDSI team outside the company's offices"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/50" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/50" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/50" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
