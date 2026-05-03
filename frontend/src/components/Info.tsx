import logoU from '../assets/LogoU.png'

export function Info() {
  return (
    <section
      className="relative w-full max-w-4xl mx-auto p-8 md:p-10 font-mono"
      style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid var(--neon-border)' }}
    >
      {/* corner brackets */}
      {['top-0 left-0 border-t-2 border-l-2', 'top-0 right-0 border-t-2 border-r-2',
        'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'].map((c, i) => (
        <div key={i} className={`absolute w-4 h-4 ${c}`} style={{ borderColor: 'var(--neon)' }} />
      ))}

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="shrink-0">
          <img src={logoU} alt="Logo Icesi" className="w-48 object-contain" />
        </div>
        <div className="flex-1 text-left">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase mb-1"
            style={{ color: 'var(--neon)' }}>
            ARROWHEAD CTF 2026
          </h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-bold tracking-[0.2em]" style={{ color: 'var(--neon-dim)' }}>
              UNIVERSIDAD ICESI
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Arrowhead es una competencia de Ciberseguridad tipo Capture The Flag diseñada para la
            Universidad Icesi, donde pondrás a prueba tus habilidades resolviendo retos de
            diferentes áreas de ciberseguridad.
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 flex flex-wrap gap-10" style={{ borderTop: '1px solid var(--neon-border)' }}>
        {[['Duración', '2 HORAS'], ['Inicio', 'MAYO 2026'], ['Modalidad', 'PRESENCIAL']].map(([label, val]) => (
          <div key={label}>
            <p className="text-[11px] uppercase font-bold tracking-widest" style={{ color: 'var(--neon-dim)' }}>
              {label}
            </p>
            <p className="text-white font-bold">{val}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
