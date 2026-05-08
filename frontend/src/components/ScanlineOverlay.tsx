export default function ScanlineOverlay() {
  return (
    <>
      {/* Static scanlines */}
      <div className="pointer-events-none fixed inset-0 z-50 scanlines opacity-100" />

      {/* Moving scan beam */}
      <div
        className="pointer-events-none fixed left-0 right-0 z-40 h-[2px] animate-scanline opacity-20"
        style={{
          background: 'linear-gradient(90deg, transparent, #00ff88, transparent)',
        }}
      />

      {/* Grid background */}
      <div className="pointer-events-none fixed inset-0 z-0 grid-bg" />

      {/* Radial vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
        }}
      />
    </>
  )
}
