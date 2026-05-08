import { useState } from 'react'
import SectionTitle from './SectionTitle'
import { threatCards } from './data'

const cyberTips = [
  '🔐 Activa la autenticación de dos factores (2FA) en todas tus cuentas importantes.',
  '🌐 Revisa siempre que la URL comience con https:// antes de ingresar datos.',
  '💾 Haz copias de seguridad de tus archivos importantes regularmente.',
  '🚫 No instales software de fuentes desconocidas o no verificadas.',
  '📧 Los bancos nunca te pedirán tu contraseña por correo electrónico.',
  '🔍 Investiga una app antes de darle permisos en tu teléfono.',
]

export default function ThreatAwarenessSection() {
  const [flipped, setFlipped] = useState<number | null>(null)
  const [tipIndex, setTipIndex] = useState(0)

  const nextTip = () => setTipIndex((prev) => (prev + 1) % cyberTips.length)
  const prevTip = () => setTipIndex((prev) => (prev - 1 + cyberTips.length) % cyberTips.length)

  return (
    <div className="flex flex-col gap-3 h-full">
      <SectionTitle>CONCIENCIA DE AMENAZAS</SectionTitle>

      <div className="text-[15px] tracking-[0.18em] uppercase mb-1" style={{ color: 'rgba(0,255,136,0.4)' }}>
        Haz clic en una tarjeta para ver el consejo práctico:
      </div>

      {/* 2x2 threat card grid */}
      <div className="grid grid-cols-2 gap-2">
        {threatCards.map((card, i) => {
          const isFlipped = flipped === i
          return (
            <div
              key={i}
              className="relative border rounded p-3 cursor-pointer transition-all duration-300 flex flex-col gap-2 group"
              style={{
                borderColor: isFlipped ? card.color : 'rgba(0,255,136,0.15)',
                background: isFlipped ? `${card.color}10` : 'rgba(0,0,0,0.3)',
                boxShadow: isFlipped ? `0 0 18px ${card.color}20` : 'none',
                transform: isFlipped ? 'scale(1.02)' : 'scale(1)',
              }}
              onClick={() => setFlipped(isFlipped ? null : i)}
            >
              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-0 h-0 transition-all duration-300"
                style={{
                  borderStyle: 'solid',
                  borderWidth: isFlipped ? '0 18px 18px 0' : '0 10px 10px 0',
                  borderColor: `transparent ${card.color} transparent transparent`,
                  opacity: isFlipped ? 0.6 : 0.2,
                }}
              />

              <div className="text-2xl leading-none">{card.icon}</div>

              <div
                className="text-[9px] font-bold tracking-widest font-orbitron"
                style={{ color: card.color }}
              >
                {card.title}
              </div>

              {/* Flip content */}
              <div className="text-[15px] leading-relaxed min-h-[48px]">
                {isFlipped ? (
                  <div className="animate-fade-in">
                    <span className="font-bold" style={{ color: '#ffcc00' }}>
                      ⚡ CONSEJO:{' '}
                    </span>
                    <span style={{ color: 'rgba(255,204,0,0.85)' }}>{card.tip}</span>
                  </div>
                ) : (
                  <span style={{ color: 'rgba(180,240,210,0.55)' }}>{card.description}</span>
                )}
              </div>

              {/* Flip indicator */}
              <div
                className="text-[15px] self-end transition-all duration-200"
                style={{ color: isFlipped ? card.color : 'rgba(0,255,136,0.2)' }}
              >
                {isFlipped ? '▲ cerrar' : '▼ ver consejo'}
              </div>
            </div>
          )
        })}
      </div>

      {/* Rotating cyber tips */}
      <div
        className="border rounded p-3 flex-1 flex flex-col justify-between"
        style={{
          borderColor: 'rgba(0,204,255,0.2)',
          background: 'rgba(0,10,20,0.5)',
        }}
      >
        <div
          className="text-[20px] tracking-[0.18em] uppercase mb-2 font-orbitron"
          style={{ color: 'rgba(0,204,255,0.5)' }}
        >
          💡 Sabías que...
        </div>

        <p
          className="text-[15px] leading-relaxed flex-1 animate-fade-in"
          style={{ color: 'rgba(180,240,255,0.8)' }}
          key={tipIndex}
        >
          {cyberTips[tipIndex]}
        </p>

        <div className="flex items-center justify-between mt-3">
          <button
            onClick={prevTip}
            className="text-[15px] px-2 py-1 border rounded transition-all duration-150 hover:scale-105"
            style={{ borderColor: 'rgba(0,204,255,0.25)', color: 'rgba(0,204,255,0.5)' }}
          >
            ‹ Anterior
          </button>

          {/* Progress dots */}
          <div className="flex gap-1.5">
            {cyberTips.map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all duration-200 cursor-pointer"
                style={{
                  background: i === tipIndex ? '#00ccff' : 'rgba(0,204,255,0.2)',
                  transform: i === tipIndex ? 'scale(1.3)' : 'scale(1)',
                }}
                onClick={() => setTipIndex(i)}
              />
            ))}
          </div>

          <button
            onClick={nextTip}
            className="text-[15px] px-2 py-1 border rounded transition-all duration-150 hover:scale-105"
            style={{ borderColor: 'rgba(0,204,255,0.25)', color: 'rgba(0,204,255,0.5)' }}
          >
            Siguiente ›
          </button>
        </div>
      </div>

      {/* Bottom reminder */}
      <div
        className="border rounded px-3 py-2 text-[15px] text-center"
        style={{
          borderColor: 'rgba(0,255,136,0.12)',
          color: 'rgba(0,255,136,0.4)',
          background: 'rgba(0,255,136,0.03)',
        }}
      >
        🎯 La ciberseguridad es responsabilidad de todos :)
      </div>
    </div>
  )
}
