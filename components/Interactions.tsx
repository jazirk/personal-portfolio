'use client'

import { useEffect } from 'react'

/**
 * Page-wide progressive enhancement, kept in one small client island:
 *  - reveals [data-reveal] elements once as they scroll into view
 *  - feeds the pointer position to .card spotlights (set on the card itself,
 *    not a parent, so only that element restyles)
 */
export function Interactions() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).dataset.visible = 'true'
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.1 },
    )
    els.forEach((el) => io.observe(el))

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>('.card')
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    if (fine.matches) document.addEventListener('pointermove', onMove, { passive: true })

    // Timeline: fill the rail and light up dots as the reader scrolls past them.
    // Scroll-linked (not autonomous) motion, written straight to transform.
    const timeline = document.querySelector<HTMLElement>('[data-timeline]')
    const fill = timeline?.querySelector<HTMLElement>('.timeline-fill')
    const dots = timeline ? [...timeline.querySelectorAll<HTMLElement>('.timeline-dot')] : []
    let frame = 0
    const update = () => {
      frame = 0
      if (!timeline || !fill) return
      const anchor = window.innerHeight * 0.55
      const r = timeline.getBoundingClientRect()
      const p = Math.min(Math.max((anchor - r.top) / r.height, 0), 1)
      fill.style.transform = `scaleY(${p})`
      for (const d of dots) d.dataset.on = String(d.getBoundingClientRect().top < anchor)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      io.disconnect()
      document.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return null
}
