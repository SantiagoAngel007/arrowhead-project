import React, { useState, useEffect } from "react";

const Countdown = () => {

  const FOUR_HOURS_MS = 4 * 60 * 60 * 1000;

  const [targetDate] = useState(new Date().getTime() + FOUR_HOURS_MS);

  const calculateTimeLeft = () => {
    const difference = targetDate - new Date().getTime();
    let timeLeft = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: difference
    };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        total: difference
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); 
  }, [targetDate]);

  const formatNumber = (num) => num.toString().padStart(2, '0');


  const progress = Math.max(0, Math.min(100, (timeLeft.total / FOUR_HOURS_MS) * 100));

  return (
    <div className="w-full max-w-xs bg-black/60 border border-green-900/30 p-6 font-mono text-center rounded-sm shadow-[0_0_15px_rgba(0,255,0,0.05)]">
      <h3 className="text-green-500 text-xs font-bold tracking-[0.2em] mb-6 uppercase">
        Acceso Temporal Restante
      </h3>

      <div className="flex justify-around items-center mb-4 px-2">
        <div className="flex flex-col">
          <span className="text-3xl md:text-4xl font-bold text-green-400">
            {formatNumber(timeLeft.hours)}
          </span>
          <span className="text-[10px] text-gray-500">HORAS</span>
        </div>

        <span className="text-2xl font-bold text-green-400 mb-4 animate-pulse">:</span>

        <div className="flex flex-col">
          <span className="text-3xl md:text-4xl font-bold text-green-400">
            {formatNumber(timeLeft.minutes)}
          </span>
          <span className="text-[10px] text-gray-500">MIN</span>
        </div>

        <span className="text-2xl font-bold text-green-400 mb-4 animate-pulse">:</span>

        <div className="flex flex-col">
          <span className="text-3xl md:text-4xl font-bold text-green-400">
            {formatNumber(timeLeft.seconds)}
          </span>
          <span className="text-[10px] text-gray-500">SEG</span>
        </div>
      </div>

      <div className="w-full h-1.5 bg-green-900/20 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-green-500 shadow-[0_0_10px_#22c55e] transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Countdown;