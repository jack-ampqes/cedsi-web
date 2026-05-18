"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import {
  Car,
  FlaskConical,
  Pill,
  TreePine,
  Droplets,
  Factory,
} from "lucide-react"

const industries = [
  {
    icon: Car,
    name: "Automotive",
    description:
      "Assembly line automation, paint systems, and material handling controls for automotive manufacturing.",
  },
  {
    icon: FlaskConical,
    name: "Chemical",
    description:
      "Process control systems, batch processing, and safety instrumented systems for chemical plants.",
  },
  {
    icon: Pill,
    name: "Pharmaceutical",
    description:
      "FDA-compliant automation, clean room controls, and validation documentation for pharma facilities.",
  },
  {
    icon: TreePine,
    name: "Pulp & Paper",
    description:
      "Process automation, drive systems, and power distribution for pulp and paper mills.",
  },
  {
    icon: Droplets,
    name: "Water Treatment",
    description:
      "SCADA systems, pump controls, and telemetry solutions for municipal and industrial water systems.",
  },
  {
    icon: Factory,
    name: "Manufacturing",
    description:
      "Custom automation solutions, machine controls, and MES integration for diverse manufacturing operations.",
  },
]

const majorVendors = [
  { src: "/etap-logo.svg", alt: "ETAP" },
  { src: "/Fanuc_logo.svg", alt: "Fanuc" },
  { src: "/Siemens-logo.svg", alt: "Siemens" },
  { src: "/Allen-Bradley_logo.svg", alt: "Allen-Bradley" },
]

export function Industries() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [gridRef, gridInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="industries" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Industries We Serve
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Expertise Across Sectors
          </h2>
          <p className="text-muted-foreground text-lg">
            Our engineering solutions power critical operations across diverse
            industries, each with unique requirements and standards.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <motion.div
          ref={gridRef}
          initial={{ opacity: 0 }}
          animate={gridInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 30 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card transition-all duration-300"
            >
              {/* Icon with animated background */}
              <div className="relative mb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <industry.icon className="h-7 w-7 text-primary" />
                </div>
                {/* Pulse effect on hover */}
                <div className="absolute inset-0 w-14 h-14 rounded-xl bg-primary/20 scale-100 opacity-0 group-hover:scale-150 group-hover:opacity-0 transition-all duration-500" />
              </div>

              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {industry.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {industry.description}
              </p>

            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-12 pt-8 border-none"
        >

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {majorVendors.map((vendor) => (
              <div key={vendor.src} className="h-8 flex items-center">
                <Image
                  src={vendor.src}
                  alt={vendor.alt}
                  width={150}
                  height={40}
                  className="h-15 w-auto object-contain brightness-0 invert opacity-85"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
