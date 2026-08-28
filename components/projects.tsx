"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { WireframeBackdrop } from "@/components/wireframe-backdrop"

const projects = [
  {
    title: "Automotive Assembly Line Upgrade",
    category: "Automotive",
    description:
      "Complete controls upgrade for a major automotive assembly plant, including new PLC systems, safety integration, and HMI development.",
    stats: ["12 Production Lines", "500+ I/O Points", "Zero Downtime Migration"],
  },
  {
    title: "Pharmaceutical Clean Room Controls",
    category: "Pharmaceutical",
    description:
      "FDA 21 CFR Part 11 compliant control system for clean room HVAC and process monitoring with full validation documentation.",
    stats: ["Class 100 Certified", "21 CFR Part 11", "Full Validation"],
  },
  {
    title: "Water Treatment SCADA System",
    category: "Water Treatment",
    description:
      "Regional water authority SCADA system serving multiple treatment plants and pump stations with remote monitoring capabilities.",
    stats: ["15 Remote Sites", "Real-time Monitoring", "24/7 Alerting"],
  },
  {
    title: "Chemical Batch Processing",
    category: "Chemical",
    description:
      "ISA-88 compliant batch control system for specialty chemical manufacturing with recipe management and safety interlocks.",
    stats: ["ISA-88 Compliant", "100+ Recipes", "SIL 2 Safety"],
  },
]

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
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
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative bg-white border border-[#0c0a34]/12 rounded-none overflow-hidden hover:border-[#1B0F56]/40 transition-all duration-300"
    >
      {/* Header gradient bar */}
      <div className="h-1 bg-linear-to-r from-[#1B0F56] to-[#1B0F56]/30" />

      <div className="p-6">
        {/* Category */}
        <span className="text-xs font-medium text-[#1B0F56] uppercase tracking-wider">
          {project.category}
        </span>

        {/* Title */}
        <h3 className="text-xl font-semibold text-[#0c0a34] mt-2 mb-4 group-hover:text-[#1B0F56] transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[#4d5364] text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-2">
          {project.stats.map((stat) => (
            <span
              key={stat}
              className="text-xs px-3 py-1.5 rounded-none bg-[#1B0F56]/8 border border-[#1B0F56]/15 text-[#1B0F56]"
            >
              {stat}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      id="projects"
      className="py-24 lg:py-32 relative overflow-hidden bg-white"
      style={
        {
          "--heading-color": "#0c0a34",
          "--paragraph-color": "#4d5364",
        } as React.CSSProperties
      }
    >
      {/* Animated wireframe schematic background */}
      <WireframeBackdrop className="absolute inset-0 h-full w-full" />

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
            Featured Projects
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance text-[#0c0a34]">
            Proven Track Record
          </h2>
          <p className="text-[#4d5364] text-lg">
            Explore a selection of our successful projects that demonstrate our
            technical expertise and commitment to excellence.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
