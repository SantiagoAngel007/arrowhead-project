interface HeaderProps {
  sessionTime: string
}

export default function Header({ sessionTime }: HeaderProps) {
  return (
    <header
      className="border-b px-6 py-3 flex items-center justify-between relative z-10"
      style={{
        borderColor: 'rgba(0,255,136,0.25)',
        background: 'rgba(0,10,5,0.85)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Left – challenge title */}
      <div className="flex items-center gap-3 min-w-[180px]">
        <div
          className="w-2 h-2 rounded-full animate-pulse-slow"
          style={{ background: '#00ff88', boxShadow: '0 0 8px #00ff88' }}
        />
        <div className="flex flex-col">
          <span
            className="text-[9px] tracking-[0.2em] uppercase"
            style={{ color: 'rgba(0,255,136,0.45)' }}
          >
            Challenge Title:
          </span>
          <span
            className="text-sm font-bold tracking-wider font-orbitron"
            style={{ color: '#00ff88' }}
          >
            CYBERDEFENDER QUEST
          </span>
        </div>
      </div>

      {/* Center – main title */}
      <div className="text-center absolute left-1/2 -translate-x-1/2">
        <div
          className="text-[9px] tracking-[0.25em] uppercase mb-0.5"
          style={{ color: 'rgba(0,255,136,0.4)' }}
        >
          Information Resource Hub
        </div>
        <h1
          className="text-xl font-black tracking-[0.3em] font-orbitron"
          style={{ color: '#ffffff', textShadow: '0 0 20px rgba(0,255,136,0.4)' }}
        >
          CYBERDEFENDER QUEST
        </h1>
      </div>

      {/* Right – session + logo */}
      <div className="flex items-center gap-5 min-w-[180px] justify-end">
        <div className="text-right">
          <div
            className="text-[9px] tracking-[0.2em] uppercase"
            style={{ color: 'rgba(0,255,136,0.45)' }}
          >
            Session Time
          </div>
          <div
            className="text-sm font-bold tabular-nums font-orbitron"
            style={{ color: '#00ff88', textShadow: '0 0 8px #00ff88' }}
          >
            {sessionTime}
          </div>
        </div>

        <div
          className="px-3 py-1.5 text-xs font-bold tracking-[0.15em] border transition-all duration-200 cursor-pointer hover:scale-105 font-orbitron"
          style={{
            borderColor: '#00ff88',
            color: '#00ff88',
            boxShadow: '0 0 8px rgba(0,255,136,0.2)',
          }}
        >
          ICESI
        </div>
      </div>
    </header>
  )
}
