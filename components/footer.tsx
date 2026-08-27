import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Mail, Phone } from "lucide-react"

const footerLinks = {
  services: [
    {
      label: "Electrical Engineering",
      href: "/capabilities/electrical-engineering",
    },
    {
      label: "Controls & Automation",
      href: "/capabilities/controls-automation",
    },
    { label: "Panel Shop", href: "/capabilities/panel-shop" },
    {
      label: "Design & Documentation",
      href: "/capabilities/design-documentation",
    },
    { label: "Field Services", href: "/capabilities/field-services" },
  ],
  industries: [
    { label: "Automotive", href: "/#industries" },
    { label: "Chemical", href: "/#industries" },
    { label: "Pharmaceutical", href: "/#industries" },
    { label: "Water Treatment", href: "/#industries" },
    { label: "Manufacturing", href: "/#industries" },
  ],
  company: [
    { label: "About Us", href: "/#about", external: false },
    { label: "Projects", href: "/#projects", external: false },
    { label: "Contact", href: "/#contact", external: false },
    {
      label: "AMP Engineering Services",
      href: "https://www.ampqes.com/services/engineering-services",
      external: true,
    },
  ],
} as const

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="mb-4 inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="CEDSI home"
            >
              <Image
                src="/logo-AMPCEDSI.svg"
                alt="CEDSI"
                width={220}
                height={56}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Controls and Electrical Design Services, Inc. An exceptional
              engineering resource for industrial automation and electrical
              systems.
            </p>

            <div className="flex flex-col gap-2 text-sm">
              <a
                href="tel:+12564619993"
                className="flex w-fit items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="size-4" aria-hidden="true" />
                256-461-9993
              </a>
              <a
                href="mailto:sales@cedsi.com"
                className="flex w-fit items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4" aria-hidden="true" />
                sales@cedsi.com
              </a>
            </div>
          </div>

          <nav aria-labelledby="footer-services">
            <h2
              id="footer-services"
              className="mb-4 text-sm font-semibold tracking-wider text-foreground uppercase"
            >
              Services
            </h2>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-industries">
            <h2
              id="footer-industries"
              className="mb-4 text-sm font-semibold tracking-wider text-foreground uppercase"
            >
              Industries
            </h2>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company">
            <h2
              id="footer-company"
              className="mb-4 text-sm font-semibold tracking-wider text-foreground uppercase"
            >
              Company
            </h2>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Controls and Electrical Design Services, Inc.
            All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
            UL 508A Certified
          </p>
        </div>
      </div>
    </footer>
  )
}
