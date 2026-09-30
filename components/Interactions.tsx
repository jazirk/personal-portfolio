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

    return () => {
      io.disconnect()
      document.removeEventListener('pointermove', onMove)
    }
  }, [])

  return null
}
