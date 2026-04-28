import { motion, type Variants } from 'framer-motion'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { useTheme } from './hooks/useTheme'
import { RankingTable } from './features/ranking'
export { RankingTable } from './features/ranking/components/RankingTable'
import { useRanking } from './features/ranking'

const mockChallenges = [
  { id: 1, level: 'Básico', title: 'Caesar Cipher', points: 100, solved: true },
  { id: 2, level: 'Básico', title: 'Base64 Decode', points: 100, solved: true },
  { id: 3, level: 'Intermedio', title: 'SQL Injection 101', points: 250, solved: false },
  { id: 4, level: 'Intermedio', title: 'XSS Hunter', points: 250, solved: false },
  { id: 5, level: 'Avanzado', title: 'Binary Exploitation', points: 500, solved: false },
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


function App() {
  useTheme()
  const { data } = useRanking()

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

      <div className="flex flex-col gap-8">
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
          <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">Marcadores</h2>

              <div className="flex gap-2">
                
                <button className="px-3 py-1 border border-[var(--accent)] text-[var(--accent)] text-xs">
                  Global
                </button>
                <button className="px-3 py-1 border border-[var(--border)] text-xs opacity-60">
                  Por nivel
                </button>
              </div>
              
            </div>
            <div className="text-xs opacity-60 mb-2">
              Progreso global basado en todos los niveles
            </div>
            <RankingTable />

          <div className="stats-grid mt-4">
            <div className="stat-card">
              <div className="stat-card__value">20</div>
              <div className="stat-card__label">Participantes</div>
            </div>

            <div className="stat-card">
              <div className="stat-card__value">{data?.length}</div>
              <div className="stat-card__label">Tu posición</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
