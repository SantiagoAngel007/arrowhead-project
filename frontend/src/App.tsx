import { motion, type Variants } from 'framer-motion'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { useTheme } from './hooks/useTheme'

const mockChallenges = [
  { id: 1, level: 'Básico', title: 'Caesar Cipher', points: 100, solved: true },
  { id: 2, level: 'Básico', title: 'Base64 Decode', points: 100, solved: true },
  { id: 3, level: 'Intermedio', title: 'SQL Injection 101', points: 250, solved: false },
  { id: 4, level: 'Intermedio', title: 'XSS Hunter', points: 250, solved: false },
  { id: 5, level: 'Avanzado', title: 'Binary Exploitation', points: 500, solved: false },
]

const mockRanking = [
  { pos: 1, alias: 'n3ur0hack', points: 850 },
  { pos: 2, alias: 'phantom_x', points: 600 },
  { pos: 3, alias: 'bit_serpent', points: 350 },
  { pos: 4, alias: 'zeroc00l', points: 200 },
  { pos: 5, alias: 'ghost_shell', points: 100 },
]

const levelColor: Record<string, string> = {
  Básico: '#22c55e',
  Intermedio: '#f59e0b',
  Avanzado: '#ef4444',
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' as const },
  }),
}

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07 + 0.2, duration: 0.35, ease: 'easeOut' as const },
  }),
}

function App() {
  useTheme()

  return (
    <div className="app-layout">
      <ThemeSwitcher />

      <motion.div
        className="app-header"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="header-badge">
          CTF — Universidad Icesi · Cali, Colombia
        </div>
        <h1>Arrowhead</h1>
        <p className="header-subtitle">
          Bienvenido, <span className="accent-text">n3ur0hack</span>
          {' '}· Tiempo restante: <span className="accent-text">42:17</span>
        </p>
      </motion.div>

      <div className="main-grid">
        <div>
          <h2 className="section-title">Retos</h2>
          <div className="challenges-list">
            {mockChallenges.map((ch, i) => (
              <motion.div
                key={ch.id}
                className={`challenge-card ${ch.solved ? 'challenge-card--solved' : ''}`}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                whileHover={{ scale: 1.015, transition: { duration: 0.15 } }}
              >
                <div className="challenge-card__info">
                  <span className="challenge-card__icon">{ch.solved ? '✅' : '🔒'}</span>
                  <div>
                    <div className="challenge-card__title">{ch.title}</div>
                    <div className="challenge-card__level" style={{ color: levelColor[ch.level] }}>
                      {ch.level}
                    </div>
                  </div>
                </div>
                <div className={`challenge-card__points ${ch.solved ? 'challenge-card__points--solved' : ''}`}>
                  {ch.points} pts
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="submit-box"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <div className="submit-box__label">$ submit --flag</div>
            <div className="submit-box__row">
              <input className="submit-box__input" placeholder="FLAG{...}" />
              <motion.button
                className="submit-box__btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Enviar
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div>
          <h2 className="section-title">Ranking en vivo</h2>
          <div className="ranking-list">
            {mockRanking.map((p, i) => (
              <motion.div
                key={p.pos}
                className={`ranking-row ${p.alias === 'n3ur0hack' ? 'ranking-row--me' : ''}`}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeLeft}
              >
                <div className="ranking-row__left">
                  <span className="ranking-row__pos">
                    {p.pos === 1 ? '🥇' : p.pos === 2 ? '🥈' : p.pos === 3 ? '🥉' : `#${p.pos}`}
                  </span>
                  <span className={`ranking-row__alias ${p.alias === 'n3ur0hack' ? 'ranking-row__alias--me' : ''}`}>
                    {p.alias}
                  </span>
                </div>
                <span className="ranking-row__points">{p.points}</span>
              </motion.div>
            ))}
          </div>

          <div className="stats-grid">
            {[
              { label: 'Retos resueltos', value: '2 / 5' },
              { label: 'Tu posición', value: '#1' },
              { label: 'Tus puntos', value: '200' },
              { label: 'Participantes', value: '18' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="stat-card"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <div className="stat-card__value">{stat.value}</div>
                <div className="stat-card__label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
