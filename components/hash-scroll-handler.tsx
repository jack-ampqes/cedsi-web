"use client"

import { useEffect } from "react"

export function HashScrollHandler() {
  useEffect(() => {
    if (!window.location.hash) return

    let elementId: string
    try {
      elementId = decodeURIComponent(window.location.hash.slice(1))
    } catch {
      return
    }

    const frame = requestAnimationFrame(() => {
      const element = document.getElementById(elementId)
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      element?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
      })
    })

    return () => cancelAnimationFrame(frame)
  }, [])

  return null
}
