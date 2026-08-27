"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { capabilityNavItems } from "@/lib/capabilities"
import { cn } from "@/lib/utils"

const sectionLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
] as const

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 64rem)")
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMobileMenuOpen(false)
    }

    desktopQuery.addEventListener("change", closeOnDesktop)
    return () => desktopQuery.removeEventListener("change", closeOnDesktop)
  }, [])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)
  const navLinkClass =
    "group relative inline-flex h-9 items-center bg-transparent text-base font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav
        className="container mx-auto px-4 lg:px-8"
        aria-label="Primary navigation"
      >
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link href="/" className="flex items-center gap-2" aria-label="CEDSI home">
            <Image
              src="/logo-AMPCEDSI.svg"
              alt="CEDSI"
              width={220}
              height={56}
              className="h-12 w-auto translate-y-0.5 lg:h-16 lg:translate-y-1"
              preload
            />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {sectionLinks.slice(0, 2).map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
                <span
                  className="absolute bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full group-focus-visible:w-full"
                  aria-hidden="true"
                />
              </Link>
            ))}

            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      navLinkClass,
                      "gap-1 px-0 py-0 hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-foreground"
                    )}
                  >
                    Our Capabilities
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-100 gap-1 p-2 md:w-120">
                      {capabilityNavItems.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink
                            asChild
                            active={pathname === item.href}
                          >
                            <Link
                              href={item.href}
                              aria-current={pathname === item.href ? "page" : undefined}
                              className="block rounded-md p-3 leading-none no-underline outline-none"
                            >
                              <span className="text-sm font-medium leading-none">
                                {item.label}
                              </span>
                              <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                                {item.description}
                              </span>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {sectionLinks.slice(2).map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
                <span
                  className="absolute bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full group-focus-visible:w-full"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button asChild className="glow-cyan">
              <Link href="/#contact">Get a Quote</Link>
            </Button>
          </div>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="h-dvh overflow-y-auto border-b bg-background/95 px-6 pt-20 pb-10 backdrop-blur-xl lg:hidden"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Site navigation</SheetTitle>
                <SheetDescription>
                  Navigate to a section or learn more about CEDSI capabilities.
                </SheetDescription>
              </SheetHeader>

              <nav
                className="mx-auto flex w-full max-w-lg flex-col gap-2"
                aria-label="Mobile navigation"
              >
                {sectionLinks.slice(0, 2).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="rounded-md py-2 text-2xl font-semibold text-foreground transition-colors hover:text-primary focus-visible:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="capabilities" className="border-none">
                    <AccordionTrigger className="py-2 text-2xl font-semibold text-foreground hover:text-primary hover:no-underline">
                      Our Capabilities
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-1 pt-2 pl-2">
                        {capabilityNavItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeMobileMenu}
                            aria-current={pathname === item.href ? "page" : undefined}
                            className="rounded-md py-2 text-lg text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary aria-[current=page]:text-primary"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {sectionLinks.slice(2).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="rounded-md py-2 text-2xl font-semibold text-foreground transition-colors hover:text-primary focus-visible:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}

                <Button asChild size="lg" className="mt-4 w-full">
                  <Link href="/#contact" onClick={closeMobileMenu}>
                    Get a Quote
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  )
}
