interface SectionTitleProps {
  children: string
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, #00ff8840)' }} />
      <h2
        className="text-[15px] font-bold tracking-[0.18em] px-2 whitespace-nowrap font-orbitron"
        style={{ color: '#00ff88' }}
      >
        {children}
      </h2>
      <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #00ff8840, transparent)' }} />
    </div>
  )
}
