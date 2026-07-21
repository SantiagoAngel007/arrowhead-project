import { useState } from 'react';
import { QuestionCard } from './components/QuestionCard';
import { BLOCKS, QUESTIONS } from './components/Data';

export default function App() {
  const [activeBlockIdx, setActiveBlockIdx] = useState(0);
  const filteredQuestions = QUESTIONS.filter(q => q.blockIdx === activeBlockIdx);

  return (
    <div className="min-h-screen font-mono flex flex-col bg-[#050a06] text-[#8a998a]">
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Columna Izquierda -> Bloques de Módulos */}
        <section className="lg:col-span-4">
          <h2 className="text-[#2aff2a] font-bold tracking-widest text-sm mb-6">
            FUNDAMENTOS DE CIBERSEGURIDAD
          </h2>
          <p className="text-xs text-[#156615] tracking-widest mb-4">MÓDULOS DE APRENDIZAJE:</p>
          
          <div className="flex flex-col gap-3">
            {BLOCKS.map((block, idx) => {
              const isActive = activeBlockIdx === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveBlockIdx(idx)}
                  className={`p-4 border cursor-pointer transition-all ${
                    isActive 
                      ? 'border-[#2aff2a] bg-[#156615]/10 shadow-[0_0_15px_rgba(42,255,42,0.05)]' 
                      : 'border-[#1a331a] bg-[#0a120a] hover:border-[#156615]'
                  }`}
                >
                  <h3 className={`text-sm font-bold flex items-center gap-3 ${isActive ? 'text-[#2aff2a]' : 'text-gray-300'}`}>
                    <span>{idx + 1}.</span> 
                    <span>{idx === 0 ? '🔓' : idx === 1 ? '🌐' : idx === 2 ? '🛡️' : idx === 3 ? '🐛' : idx === 4 ? '📊' : '🎯'}</span>
                    {block.split(':')[0]}
                  </h3>
                  <p className={`text-xs mt-3 ${isActive ? 'text-[#00d4ff]' : 'text-[#8a998a]'}`}>
                    [{block.split(':')[1]?.trim() || 'Desafíos'}]
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Columna Derecha -> Cuestionario Interactivo */}
        <section className="lg:col-span-8">
          <h2 className="text-[#2aff2a] font-bold tracking-widest text-sm mb-6 uppercase border-b border-[#1a331a] pb-2">
            Guía del Cuestionario - {BLOCKS[activeBlockIdx].split(':')[0]}
          </h2>
          <p className="text-xs text-[#156615] tracking-widest mb-4">
            SELECCIONA LA RESPUESTA CORRECTA:
          </p>

          <div className="flex flex-col gap-1">
            {filteredQuestions.map(q => (
              <QuestionCard key={q.id} q={q} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}