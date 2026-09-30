'use client'

import { useEffect, useRef } from 'react'

/**
 * Ambient hero backdrop:
 *  1. Aurora — three blurred colour fields drifting on long (24–36s), out-of-phase
 *     loops. Transform-only, so it stays on the compositor. Paused when off-screen.
 *  2. Dot grid — masked to fade out toward the edges.
 *  3. Cursor spotlight — lights up the dots near the pointer. Follows with
 *     critically-damped smoothing (no overshoot) instead of snapping 1:1,
 *     so it feels physical. Fine pointers only; skipped for reduced motion.
 */
export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const host = el?.parentElement
    if (!el || !host) return

    // Pause the drift whenever the hero is out of view — no wasted frames.
    const io = new IntersectionObserver(([entry]) => {
      el.dataset.paused = entry.isIntersecting ? 'false' : 'true'
    })
    io.observe(host)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (reduce || !fine) return () => io.disconnect()

    let tx = 0, ty = 0, x = 0, y = 0
    let raf = 0
    let last = 0
    let primed = false

    const tick = (t: number) => {
      const dt = Math.min((t - (last || t)) / 1000, 0.05)
      last = t
      // Exponential smoothing ≈ critically damped spring (response ~0.15s)
      const k = 1 - Math.exp(-dt * 12)
      x += (tx - x) * k
      y += (ty - y) * k
      el.style.setProperty('--sx', `${x}px`)
      el.style.setProperty('--sy', `${y}px`)
      if (Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3) raf = requestAnimationFrame(tick)
      else { raf = 0; last = 0 }
    }

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      tx = e.clientX - r.left
      ty = e.clientY - r.top
      if (!primed) { x = tx; y = ty; primed = true } // appear under the cursor, don't fly in
      el.dataset.spot = 'on'
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onLeave = () => {
      el.dataset.spot = 'off'
      primed = false
    }

    host.addEventListener('pointermove', onMove, { passive: true })
    host.addEventListener('pointerleave', onLeave)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden className="hero-bg" data-spot="off">
      <div className="hero-aurora">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
      </div>
      <div className="hero-dots" />
      <div className="hero-dots hero-dots-lit" />
      <div className="hero-fade" />
    </div>
  )
}
