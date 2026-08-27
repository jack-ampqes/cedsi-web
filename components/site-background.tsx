"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  baseVx: number
  baseVy: number
  size: number
  opacity: number
}

const MAX_PARTICLES = 140
const CONNECTION_DISTANCE = 120

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasElement = canvasRef.current!
    if (!canvasElement) return

    const drawingContext = canvasElement.getContext("2d")!
    if (!drawingContext) return

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    )
    const pointer = { x: -9999, y: -9999, active: false }
    let animationFrame: number | null = null
    let isDocumentVisible = !document.hidden
    let prefersReducedMotion = reducedMotionQuery.matches
    let viewportWidth = window.innerWidth
    let viewportHeight = window.innerHeight
    let particles: Particle[] = []

    function withAlpha(hex: string, alpha: number) {
      const clampedAlpha = Math.max(0, Math.min(1, alpha))
      return `${hex}${Math.round(clampedAlpha * 255)
        .toString(16)
        .padStart(2, "0")}`
    }

    function initializeParticles() {
      const count = Math.min(
        MAX_PARTICLES,
        Math.max(32, Math.floor((viewportWidth * viewportHeight) / 22_000))
      )

      particles = Array.from({ length: count }, () => {
        const baseVx = (Math.random() - 0.5) * 0.3
        const baseVy = (Math.random() - 0.5) * 0.3

        return {
          x: Math.random() * viewportWidth,
          y: Math.random() * viewportHeight,
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        }
      })
    }

    function drawScene(updateParticles: boolean) {
      drawingContext.clearRect(0, 0, viewportWidth, viewportHeight)
      drawingContext.strokeStyle = "#13104fb5"
      drawingContext.lineWidth = 1

      for (let x = 0; x < viewportWidth; x += 60) {
        drawingContext.beginPath()
        drawingContext.moveTo(x, 0)
        drawingContext.lineTo(x, viewportHeight)
        drawingContext.stroke()
      }

      for (let y = 0; y < viewportHeight; y += 60) {
        drawingContext.beginPath()
        drawingContext.moveTo(0, y)
        drawingContext.lineTo(viewportWidth, y)
        drawingContext.stroke()
      }

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index]

        if (updateParticles) {
          if (pointer.active) {
            const pointerX = particle.x - pointer.x
            const pointerY = particle.y - pointer.y
            const pointerDistanceSquared = pointerX ** 2 + pointerY ** 2
            const repulsionRadius = 80

            if (
              pointerDistanceSquared > 0 &&
              pointerDistanceSquared < repulsionRadius ** 2
            ) {
              const pointerDistance = Math.sqrt(pointerDistanceSquared)
              const strength = (1 - pointerDistance / repulsionRadius) * 0.05
              particle.vx += (pointerX / pointerDistance) * strength
              particle.vy += (pointerY / pointerDistance) * strength
            }
          }

          particle.x += particle.vx
          particle.y += particle.vy
          particle.vx += (particle.baseVx - particle.vx) * 0.02
          particle.vy += (particle.baseVy - particle.vy) * 0.02

          if (particle.x < 0 || particle.x > viewportWidth) {
            particle.vx *= -1
            particle.x = Math.max(0, Math.min(viewportWidth, particle.x))
          }
          if (particle.y < 0 || particle.y > viewportHeight) {
            particle.vy *= -1
            particle.y = Math.max(0, Math.min(viewportHeight, particle.y))
          }
        }

        drawingContext.beginPath()
        drawingContext.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        )
        drawingContext.fillStyle = withAlpha(
          "#ffffff",
          particle.opacity * 0.5
        )
        drawingContext.fill()

        for (
          let comparisonIndex = index + 1;
          comparisonIndex < particles.length;
          comparisonIndex += 1
        ) {
          const other = particles[comparisonIndex]
          const deltaX = particle.x - other.x
          const deltaY = particle.y - other.y
          const distanceSquared = deltaX ** 2 + deltaY ** 2

          if (distanceSquared < CONNECTION_DISTANCE ** 2) {
            const distance = Math.sqrt(distanceSquared)
            drawingContext.beginPath()
            drawingContext.moveTo(particle.x, particle.y)
            drawingContext.lineTo(other.x, other.y)
            drawingContext.strokeStyle = withAlpha(
              "#ffffff",
              0.08 * (1 - distance / CONNECTION_DISTANCE)
            )
            drawingContext.stroke()
          }
        }
      }
    }

    function stopAnimation() {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame)
        animationFrame = null
      }
    }

    function animate() {
      if (prefersReducedMotion || !isDocumentVisible) {
        animationFrame = null
        return
      }

      drawScene(true)
      animationFrame = requestAnimationFrame(animate)
    }

    function startAnimation() {
      if (
        animationFrame === null &&
        !prefersReducedMotion &&
        isDocumentVisible
      ) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    function resizeCanvas() {
      viewportWidth = window.innerWidth
      viewportHeight = window.innerHeight
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)

      canvasElement.width = Math.round(viewportWidth * pixelRatio)
      canvasElement.height = Math.round(viewportHeight * pixelRatio)
      canvasElement.style.width = `${viewportWidth}px`
      canvasElement.style.height = `${viewportHeight}px`
      drawingContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      initializeParticles()
      drawScene(false)
    }

    function clearPointer() {
      pointer.active = false
      pointer.x = -9999
      pointer.y = -9999
    }

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType === "touch") return
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
    }

    function handleVisibilityChange() {
      isDocumentVisible = !document.hidden
      if (isDocumentVisible) {
        drawScene(false)
        startAnimation()
      } else {
        stopAnimation()
      }
    }

    function handleMotionPreference(event: MediaQueryListEvent) {
      prefersReducedMotion = event.matches
      if (prefersReducedMotion) {
        stopAnimation()
        drawScene(false)
      } else {
        startAnimation()
      }
    }

    resizeCanvas()
    startAnimation()
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("blur", clearPointer)
    window.addEventListener("resize", resizeCanvas, { passive: true })
    document.documentElement.addEventListener("mouseleave", clearPointer)
    document.addEventListener("visibilitychange", handleVisibilityChange)
    reducedMotionQuery.addEventListener("change", handleMotionPreference)

    return () => {
      stopAnimation()
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("blur", clearPointer)
      window.removeEventListener("resize", resizeCanvas)
      document.documentElement.removeEventListener("mouseleave", clearPointer)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      reducedMotionQuery.removeEventListener("change", handleMotionPreference)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    />
  )
}

export function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-linear-to-b from-background via-background to-secondary/20" />
      <ParticleCanvas />
    </div>
  )
}
