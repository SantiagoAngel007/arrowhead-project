import React from "react";

interface levelData {
  level: string;
  title: string;
  description: string;
  img: string;
  difficulty: string;
  sideText: string;
}

interface LevelCardProps {
  links: levelData[];
}

function LevelCard({ links }: LevelCardProps) {

  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'fácil': return 'border-green-500 text-green-500';
      case 'media': return 'border-yellow-500 text-yellow-500';
      case 'difícil': return 'border-orange-500 text-orange-500';
      case 'experto': return 'border-red-600 text-red-600';
      default: return 'border-green-500 text-green-500';
    }
  };

  return (
    <section className="p-4 space-y-6">
      {links.map((link, index) => (
        <div
          key={index}
          className="relative flex flex-col md:flex-row bg-black/80 border border-green-900/40 p-1 group hover:border-green-500/50 transition-all max-w-4xl mx-auto"
        >

          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-green-500"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-green-500"></div>


          <div className="flex flex-1 items-center p-6 gap-6">

            <div className="hidden sm:flex w-24 h-24 shrink-0 items-center justify-center rounded-full border border-green-900/30 bg-green-900/10">
              {link.img ? (
                <img src={link.img} alt={link.title} className="w-16 h-16 object-contain" />
              ) : (
                <div className="text-green-900/40">ICON</div>
              )}
            </div>

            <div className="text-left font-mono">
              <span className="text-green-500 text-xs font-bold uppercase tracking-widest">
                {link.level}
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">{link.title}</h3>
              <p className="text-gray-400 text-sm leading-tight max-w-sm">
                {link.description}
              </p>
            </div>
          </div>


          <div className="hidden md:block w-[1px] bg-gray-800 my-6"></div>


          <div className="flex flex-col justify-center p-6 md:w-72 text-left font-mono">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-green-500/70 text-[10px] uppercase font-bold">Dificultad</span>
              <span className={`px-3 py-1 border text-xs font-bold uppercase ${getDifficultyColor(link.difficulty)}`}>
                {link.difficulty}
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              {link.sideText}.
              <br />
              <span className="text-gray-600">Aprende y gana confianza.</span>
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default LevelCard;