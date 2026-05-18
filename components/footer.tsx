"use client"

import Image from "next/image"
import { Mail, Phone } from "lucide-react"

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93v5.67H9.37V9h3.4v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.59 0 4.25 2.36 4.25 5.42v6.32zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  )
}

const footerLinks = {
  services: [
    { label: "Electrical Engineering", href: "#services" },
    { label: "Industrial Controls", href: "#services" },
    { label: "PLC Programming", href: "#services" },
    { label: "Panel Fabrication", href: "#services" },
    { label: "Field Services", href: "#services" },
  ],
  industries: [
    { label: "Automotive", href: "#industries" },
    { label: "Chemical", href: "#industries" },
    { label: "Pharmaceutical", href: "#industries" },
    { label: "Water Treatment", href: "#industries" },
    { label: "Manufacturing", href: "#industries" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="inline-block mb-4"
            >
              <Image
                src="/CEDSI logo.svg"
                alt="CEDSI Logo"
                width={220}
                height={50}
                className="h-8 w-auto brightness-0 invert"
              />
            </a>
            <p className="text-primary text-sm leading-relaxed mb-6 max-w-sm">
              Controls and Electrical Design Services, Inc. An Exceptional
              Engineering Resource for industrial automation and electrical
              systems.
            </p>

            {/* Contact shortcuts */}
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="tel:+12564619993"
                className="flex items-center gap-2 text-primary hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                256-461-9993
              </a>
              <a
                href="mailto:sales@cedsi.com"
                className="flex items-center gap-2 text-primary hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                sales@cedsi.com
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-foreground">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className="text-sm text-primary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-foreground">
              Industries
            </h4>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className="text-sm text-primary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-foreground">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className="text-sm text-primary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 text-foreground">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-primary hover:text-primary hover:border-primary/50 transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary">
            &copy; {currentYear} Controls and Electrical Design Services, Inc.
            All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-primary">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              UL 508A Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
