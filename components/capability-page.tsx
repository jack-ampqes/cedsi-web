"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  capabilities,
  type CapabilityData,
  type CapabilitySlug,
} from "@/lib/capabilities"

export function CapabilityPage({ slug }: { slug: CapabilitySlug }) {
  const data: CapabilityData = capabilities[slug]
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [gridRef, gridInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <article className="relative">
      {/* Hero strip */}
      <section className="pt-28 lg:pt-36 pb-16 lg:pb-20 relative">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              Our Capabilities
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              {data.title}
            </h1>
            <p className="text-lg text-muted-foreground">{data.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="pb-16 lg:pb-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.p
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="max-w-3xl text-muted-foreground text-lg leading-relaxed"
          >
            {data.overview}
          </motion.p>
        </div>
      </section>

      {/* Highlights */}
      <section className="pb-24 lg:pb-32 relative">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-secondary/20 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            ref={gridRef}
            initial={{ opacity: 0 }}
            animate={gridInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {data.highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card transition-all duration-300"
              >
                <div className="relative mb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <highlight.icon className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {highlight.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {data.vendors && data.vendors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-16 pt-8"
            >
              <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wider">
                Platforms & Tools
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                {data.vendors.map((vendor) => (
                  <div key={vendor.src} className="flex h-12 items-center">
                    <Image
                      src={vendor.src}
                      alt={vendor.alt}
                      width={150}
                      height={40}
                      className="h-12 w-auto object-contain brightness-0 invert opacity-85"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-card/50 border border-border rounded-lg p-8 lg:p-12 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to discuss your project?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our engineers are ready to help with {data.title.toLowerCase()}{" "}
              and related project needs.
            </p>
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan"
            >
              <Link href="/#contact">
                Get a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </article>
  )
}
