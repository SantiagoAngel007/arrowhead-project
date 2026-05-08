import { useState } from 'react'
import SectionTitle from './SectionTitle'
import { knowledgeCards } from './data'
import type { KnowledgeCard } from './types'

function CardItem({
  card,
  isHovered,
  onEnter,
  onLeave,
}: {
  card: KnowledgeCard
  isHovered: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  return (
    <div
      className="relative border rounded cursor-pointer transition-all duration-200 group select-none"
      style={{
        borderColor: isHovered ? card.color : 'rgba(0,255,136,0.18)',
        backgroundColor: isHovered ? `${card.color}0d` : 'rgba(0,0,0,0.2)',
        boxShadow: isHovered ? `0 0 14px ${card.color}22` : 'none',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="flex items-center gap-3 px-3 py-2.5">
        {/* Index */}
        <span className="text-[15px] tabular-nums" style={{ color: 'rgba(0,255,136,0.4)' }}>
          {card.id}.
        </span>

        {/* Icon */}
        <span className="text-base leading-none">{card.icon}</span>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div
            className="text-[11px] font-bold tracking-wide truncate transition-colors"
            style={{ color: isHovered ? card.color : '#cceedd' }}
          >
            {card.title}
          </div>
          <div className="text-[15px] tracking-widest mt-0.5" style={{ color: card.color, opacity: 0.7 }}>
            ({card.level})
          </div>
        </div>

        {/* Arrow */}
        <span
          className="text-xs transition-all duration-200"
          style={{
            color: isHovered ? card.color : 'rgba(0,255,136,0.25)',
            transform: isHovered ? 'translateX(3px)' : 'none',
          }}
        >
          ›
        </span>
      </div>
    </div>
  )
}

function HoverPopup({ card }: { card: KnowledgeCard }) {
  return (
    <div
      className="border rounded p-3 animate-fade-in"
      style={{
        borderColor: card.color,
        backgroundColor: `${card.color}07`,
        boxShadow: `0 0 24px ${card.color}18, inset 0 0 12px ${card.color}06`,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 pb-2" style={{ borderBottom: `1px solid ${card.color}25` }}>
        <span className="text-xl">{card.icon}</span>
        <div>
          <div className="text-[9px] tracking-widest font-bold" style={{ color: card.color }}>
            {card.level}
          </div>
          <div className="text-[11px] font-bold text-white">{card.title}</div>
        </div>
      </div>

      {/* Description */}
      <p className="text-[10px] leading-relaxed mb-2" style={{ color: 'rgba(180,240,210,0.75)' }}>
        {card.description}
      </p>

      {/* Bullets */}
      <ul className="space-y-1 mb-2">
        {card.bullets.map((bullet, i) => (
          <li key={i} className="flex gap-1.5 text-[20px]" style={{ color: 'rgba(0,255,136,0.6)' }}>
            <span style={{ color: card.color }} className="shrink-0 mt-0.5">
              ▸
            </span>
            {bullet}
          </li>
        ))}
      </ul>

      {/* Example */}
      {card.example && (
        <div
          className="mt-1 px-2 py-1.5 rounded text-[20px] font-mono"
          style={{
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,204,0,0.2)',
            color: 'rgba(255,204,0,0.85)',
          }}
        >
          💡 {card.example}
        </div>
      )}
    </div>
  )
}

export default function KnowledgeSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const hoveredCard = knowledgeCards.find((c) => c.id === hoveredId) ?? null

  return (
    <div className="flex flex-col gap-3 h-full">
      <SectionTitle>FUNDAMENTOS DE CIBERSEGURIDAD</SectionTitle>

      <div
        className="text-[20px] tracking-[0.18em] uppercase mb-1"
        style={{ color: 'rgba(0,255,136,0.4)' }}
      >
        Tarjetas de Conocimiento Interactivo:
      </div>

      {/* Cards list */}
      <div className="flex flex-col gap-2">
        {knowledgeCards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            isHovered={hoveredId === card.id}
            onEnter={() => setHoveredId(card.id)}
            onLeave={() => setHoveredId(null)}
          />
        ))}
      </div>

      {/* Popup or placeholder */}
      <div className="flex-1 flex flex-col justify-end">
        {hoveredCard ? (
          <HoverPopup card={hoveredCard} />
        ) : (
          <div
            className="border border-dashed rounded p-3 text-center"
            style={{ borderColor: 'rgba(0,255,136,0.12)' }}
          >
            <p className="text-[20px]" style={{ color: 'rgba(0,255,136,0.3)' }}>
              🖱️ Pasa el cursor sobre una tarjeta para ver detalles
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
