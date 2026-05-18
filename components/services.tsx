"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  Zap,
  Settings,
  Box,
  FileText,
} from "lucide-react"

const services = [
  {
    icon: Settings,
    title: "Control Panel Design & Fabrication",
    description:
      "Custom control panel engineering and build services for industrial automation projects with attention to quality, compliance, and reliability.",
    features: ["Custom Layouts", "Component Selection", "UL 508A Support"],
    hoverImage: "/controlpaneldesign.avif",
  },
  {
    icon: Zap,
    title: "Industrial Power Systems Design",
    description:
      "Engineered power distribution and electrical system designs for demanding industrial environments and process facilities.",
    features: ["Power Distribution", "Load Studies", "Arc Flash Review"],
    hoverImage: "/IndustrialPowerSystemsDesign.jpg",
  },
  {
    icon: Box,
    title: "Fabrication & Testing",
    description:
      "Precision fabrication and validation testing workflows to ensure every deliverable performs safely and as designed before deployment.",
    features: ["Panel Build", "Factory Testing", "Quality Verification"],
    hoverImage: "/FabricationTesting.avif",
  },
  {
    icon: FileText,
    title: "Design & Documentation",
    description:
      "Clear, complete drawing and documentation packages to support installation, maintenance, and long-term operational continuity.",
    features: ["Schematics", "As-Builts", "Project Packages"],
    hoverImage: "/designdocu.avif",
  },
]

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0]
  index: number
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all duration-300"
    >
      {service.hoverImage && (
        <div
          className="absolute inset-0 rounded-lg bg-cover bg-center opacity-0 group-hover:opacity-50 transition-opacity duration-300"
          style={{ backgroundImage: `url(${service.hoverImage})` }}
          aria-hidden="true"
        />
      )}

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-lg bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          <service.icon className="h-6 w-6 text-primary" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {service.features.map((feature) => (
            <span
              key={feature}
              className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Services() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="services" className="py-24 lg:py-32 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

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
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Comprehensive Engineering Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            From concept to completion, we deliver end-to-end electrical
            engineering and controls solutions tailored to your specific needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
