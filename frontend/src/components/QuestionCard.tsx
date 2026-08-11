import { useState } from 'react';

interface QuestionProps {
  q: {
    id: number;
    text: string;
    options: { id: string; text: string }[];
    correct: string;
  };
}

export const QuestionCard = ({ q }: QuestionProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="border border-[#1a331a] bg-[#0a120a] mb-4 p-5 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-[#156615] group-hover:bg-[#2aff2a] transition-colors" />
      
      <p className="text-gray-300 mb-4 font-mono text-sm leading-relaxed ml-2">
        <span className="text-[#2aff2a] mr-2">[{q.id}]</span>
        {q.text}
      </p>

      <div className="flex flex-col gap-2 ml-2">
        {q.options.map(opt => {
          const isSelected = selectedId === opt.id;
          const isCorrect = opt.id === q.correct;
          const showAsCorrect = (isSelected && isCorrect) || (selectedId && isCorrect);
          const showAsWrong = isSelected && !isCorrect;

          let baseStyles = "border border-[#1a331a] p-3 text-sm font-mono cursor-pointer transition-all flex items-start gap-3 ";
          
          if (showAsCorrect) {
            baseStyles += "bg-[#156615]/40 border-[#2aff2a] text-[#2aff2a] font-bold shadow-[0_0_10px_rgba(42,255,42,0.1)]";
          } else if (showAsWrong) {
            baseStyles += "bg-red-900/20 border-red-900 text-red-400";
          } else {
            baseStyles += "hover:bg-[#1a331a]/30 hover:border-[#156615] text-[#8a998a]";
          }

          return (
            <div 
              key={opt.id} 
              onClick={() => !selectedId && setSelectedId(opt.id)}
              className={baseStyles}
            >
              <span className={showAsCorrect ? "text-[#2aff2a]" : showAsWrong ? "text-red-500" : "text-[#156615]"}>
                {opt.id}.
              </span>
              <span>{opt.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};