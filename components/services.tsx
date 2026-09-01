"use client"

import Link from "next/link"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Zap, Settings, Cpu, FileText } from "lucide-react"

const services = [
  {
    icon: Settings,
    title: "Control Panel Design & Fabrication",
    description:
      "Custom control panel engineering and build services for industrial automation projects with attention to quality, compliance, and reliability.",
    features: ["Custom Layouts", "Component Selection", "UL 508A Support"],
    hoverImage: "/panel-controlpanel.avif",
    href: "/capabilities/panel-shop",
  },
  {
    icon: Zap,
    title: "Industrial Power Systems Design",
    description:
      "Engineered power distribution and electrical system designs for demanding industrial environments and process facilities.",
    features: ["Power Distribution", "Load Studies", "Arc Flash Review"],
    hoverImage: "/IndustrialPowerSystemsDesign.jpg",
    href: "/capabilities/electrical-engineering",
  },
  {
    icon: Cpu,
    title: "Controls & Automation",
    description:
      "Automation systems that improve process reliability, visibility, and throughput, built across major PLC platforms and integrated end to end.",
    features: ["PLC Programming", "HMI & SCADA", "Industrial Networking"],
    hoverImage: "/panel-fabrication.avif",
    href: "/capabilities/controls-automation",
  },
  {
    icon: FileText,
    title: "Design & Documentation",
    description:
      "Clear, complete drawing and documentation packages to support installation, maintenance, and long-term operational continuity.",
    features: ["Schematics", "As-Builts", "Project Packages"],
    hoverImage: "/designdocu.avif",
    href: "/capabilities/design-documentation",
  },
]

// Max pixels the hover image travels from center in each axis.
const PARALLAX_RANGE = 28

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

  // Parallax: the hover image drifts a few pixels against the cursor,
  // so it reads as if the card is looking around with the mouse.
  const prefersReducedMotion = useReducedMotion()
  const parallaxX = useMotionValue(0)
  const parallaxY = useMotionValue(0)
  const springConfig = { stiffness: 150, damping: 26, mass: 0.3 }
  const x = useSpring(parallaxX, springConfig)
  const y = useSpring(parallaxY, springConfig)

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    // -0.5 .. 0.5 relative to the card center
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5
    parallaxX.set(-offsetX * PARALLAX_RANGE)
    parallaxY.set(-offsetY * PARALLAX_RANGE)
  }

  const handleMouseLeave = () => {
    parallaxX.set(0)
    parallaxY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={service.href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative block bg-white border border-[#0c0a34]/12 rounded-none p-6 hover:border-[#0c0a34]/30 transition-all duration-300 overflow-hidden"
      >
        {service.hoverImage && (
          <motion.div
            className="absolute inset-0 rounded-none bg-cover bg-center opacity-0 group-hover:opacity-90 transition-opacity duration-300"
            style={{
              backgroundImage: `url(${service.hoverImage})`,
              x,
              y,
              // Slight overscan so the drift never exposes the card edges.
              scale: 1.12,
            }}
            aria-hidden="true"
          />
        )}

        {/* Scrim that keeps text readable over the hover image */}
        <div className="absolute inset-0 rounded-none bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          {/* Icon */}
          <div className="w-12 h-12 rounded-none bg-[#1B0F56]/10 flex items-center justify-center mb-4 group-hover:bg-[#1B0F56]/20 transition-colors">
            <service.icon className="h-6 w-6 text-[#1B0F56]" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold mb-3 text-[#0c0a34] group-hover:text-[#1B0F56] transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-[#4d5364] text-sm leading-relaxed mb-4">
            {service.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {service.features.map((feature) => (
              <span
                key={feature}
                className="text-xs px-2 py-1 rounded-none bg-[#1B0F56]/8 text-[#1B0F56] border border-[#1B0F56]/15"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function Services() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      id="services"
      className="py-24 lg:py-32 relative bg-white"
      style={
        {
          "--heading-color": "#0c0a34",
          "--paragraph-color": "#4d5364",
        } as React.CSSProperties
      }
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern-light opacity-60" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[#1B0F56] text-sm font-semibold tracking-wider uppercase mb-4 block">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance text-[#0c0a34]">
            Comprehensive Engineering Solutions
          </h2>
          <p className="text-[#4d5364] text-lg">
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
