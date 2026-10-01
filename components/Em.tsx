/** Renders a headline with its one italic accent phrase. */
export function Em({ h }: { h: { before: string; accent: string; after: string } }) {
  return (
    <>
      {h.before}
      <span className="em">{h.accent}</span>
      {h.after}
    </>
  )
}
