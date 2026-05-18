"use client"

import { useEffect, useRef } from "react"

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const mouse = { x: -9999, y: -9999, active: false }
    let particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      baseVx: number
      baseVy: number
      size: number
      opacity: number
    }> = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
      for (let i = 0; i < particleCount; i++) {
        const baseVx = (Math.random() - 0.5) * 0.3
        const baseVy = (Math.random() - 0.5) * 0.3
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const withAlphaHex = (hex: string, alpha: number) => {
      const clamped = Math.max(0, Math.min(1, alpha))
      const alphaHex = Math.round(clamped * 255)
        .toString(16)
        .padStart(2, "0")
      return `${hex}${alphaHex}`
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = "#13104fb5"
      ctx.lineWidth = 1
      const gridSize = 60

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      particles.forEach((particle, i) => {
        if (mouse.active) {
          const dxFromMouse = particle.x - mouse.x
          const dyFromMouse = particle.y - mouse.y
          const distanceFromMouse = Math.sqrt(
            dxFromMouse * dxFromMouse + dyFromMouse * dyFromMouse
          )
          const repulsionRadius = 80

          if (distanceFromMouse < repulsionRadius && distanceFromMouse > 0) {
            const strength = (1 - distanceFromMouse / repulsionRadius) * 0.05
            particle.vx += (dxFromMouse / distanceFromMouse) * strength
            particle.vy += (dyFromMouse / distanceFromMouse) * strength
          }
        }

        particle.x += particle.vx
        particle.y += particle.vy

        // Ease particles back toward their baseline drift after mouse nudges.
        particle.vx += (particle.baseVx - particle.vx) * 0.02
        particle.vy += (particle.baseVy - particle.vy) * 0.02

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = withAlphaHex("#ffffff", particle.opacity * 0.5)
        ctx.fill()

        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = withAlphaHex("#ffffff", 0.08 * (1 - distance / 120))
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(drawParticles)
    }

    resizeCanvas()
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
      mouse.active = true
    }
    const handleMouseLeave = () => {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseout", handleMouseLeave)
    window.addEventListener("resize", resizeCanvas)
    drawParticles()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseout", handleMouseLeave)
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
}

export function SiteBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      <ParticleCanvas />
    </div>
  )
}
