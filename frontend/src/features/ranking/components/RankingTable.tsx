import { useRanking } from '../hooks/useRanking'

export function RankingTable() {
  const { data, isLoading, isError } = useRanking()

  if (isLoading) return <p>Cargando ranking...</p>
  if (isError) return <p>Error cargando ranking</p>

  if (!data) return null

  const top3 = data.slice(0, 3)
  const rest = data.slice(3)

  const maxPoints = Math.max(...data.map(p => p.points))

  return (
    <div className="flex flex-col gap-6">

      {/* PODIO */}
      <div className="flex justify-center items-end gap-6">

        {/* 2do lugar */}
        {top3[1] && (
          <div className="flex flex-col items-center opacity-80">
            <div className="text-2xl">🥈</div>
            <div className="w-14 h-14 rounded-full bg-[var(--code-bg)] border border-[var(--border)]" />
            <div className="text-sm mt-2">{top3[1].alias}</div>
            <div className="text-xs text-[var(--accent)]">{top3[1].points}</div>
          </div>
        )}

        {/* 1er lugar */}
        {top3[0] && (
          <div className="flex flex-col items-center scale-110">
            <div className="text-3xl">🥇</div>
            <div className="w-16 h-16 rounded-full bg-[var(--code-bg)] border-2 border-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
            <div className="mt-2 font-bold text-[var(--accent)]">
              {top3[0].alias}
            </div>
            <div className="text-sm">{top3[0].points} pts</div>
          </div>
        )}

        {/* 3er lugar */}
        {top3[2] && (
          <div className="flex flex-col items-center opacity-80">
            <div className="text-2xl">🥉</div>
            <div className="w-14 h-14 rounded-full bg-[var(--code-bg)] border border-[var(--border)]" />
            <div className="text-sm mt-2">{top3[2].alias}</div>
            <div className="text-xs text-[var(--accent)]">{top3[2].points}</div>
          </div>
        )}
      </div>

      {/* LISTA */}
      <div className="ranking-list flex flex-col">

        {rest.map((p) => {
          const globalPercentage = (p.points / maxPoints) * 100

          return (
            <div
              key={p.pos}
              className={`flex items-center justify-between px-4 py-3 border-b border-[var(--border)]
              ${p.alias === 'n3ur0hack' ? 'ranking-row--me' : ''}`}
            >

              {/* IZQUIERDA */}
              <div className="flex items-center gap-4 w-full">

                <span className="w-6 text-sm opacity-70">
                  #{p.pos}
                </span>

                <div className="w-8 h-8 rounded-full bg-[var(--code-bg)] border border-[var(--border)]" />

                <div className="flex flex-col w-full">

                  {/* alias + nivel */}
                  <div className="flex items-center gap-2">
                    <span className="ranking-row__alias text-sm">
                      {p.alias}
                    </span>

                    <span className="text-[10px] px-2 py-[2px] border border-[var(--accent)] text-[var(--accent)]">
                      {p.level}
                    </span>
                  </div>

                  {/* barra global */}
                  <div className="w-full h-1 bg-[var(--code-bg)] mt-1 relative">
                    <div
                      className="h-full bg-[var(--accent)]"
                      style={{ width: `${globalPercentage}%` }}
                    />

                    {/* porcentaje */}
                    <span className="absolute right-0 -top-4 text-[10px] opacity-70">
                      {Math.round(globalPercentage)}%
                    </span>
                  </div>

                  {/* último logro */}
                  <span className="text-[10px] opacity-50 mt-1">
                    Último: {p.lastSolved}
                  </span>
                </div>
              </div>

              {/* DERECHA */}
              {/*<div className="flex flex-col items-end gap-1 ml-4">

                <span className="text-sm text-[var(--accent)]">
                  {p.points}
                </span>

                 mini progreso por nivel 
                <div className="w-20 h-1 bg-[var(--code-bg)]">
                  <div
                    className="h-full bg-[var(--accent)] opacity-70"
                    style={{ width: `${p.levelProgress}%` }}
                  />
                </div>

                <span className="text-[10px] opacity-60">
                  {p.levelProgress}%
                </span>
              </div>*/}
            </div>
          )
        })}
      </div>
    </div>
  )
}