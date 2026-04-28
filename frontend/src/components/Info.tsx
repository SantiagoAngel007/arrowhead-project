import React from "react";
import logoU from "../assets/LogoU.png"; 

const Info = () => {
  return (
    <section className="relative w-full max-w-4xl mx-auto bg-black/40 border border-green-900/20 p-8 md:p-10 font-mono">

      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500"></div>

      <div className="flex flex-col md:flex-row items-center gap-8">

        <div className="shrink-0">
          <img src={logoU} alt="Logo Icesi" className="w-48 object-contain" />
        </div>


        <div className="flex-1 text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-green-500 tracking-tighter uppercase mb-1">
            ARROWHEAD CTF 2026
          </h1>
          <div className="flex items-center gap-2 text-green-400/80 mb-4">
            <span className="text-sm font-bold tracking-[0.2em]">UNIVERSIDAD ICESI</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Arrowhead es una competencia de Ciberseguridad tipo Capture The Flag diseñada para la Universidad Icesi, 
            donde pondrás a prueba tus habilidades resolviendo retos de diferentes áreas de ciberseguridad.
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-green-900/30 flex flex-wrap gap-10">
        <div>
          <p className="text-[15px] text-green-500/50 uppercase font-bold">Duración</p>
          <p className="text-white font-bold">2 HORAS</p>
        </div>
        <div>
          <p className="text-[15px] text-green-500/50 uppercase font-bold">Inicio</p>
          <p className="text-white font-bold">MAYO 2026</p>
        </div>
      </div>
    </section>
  );
};

export default Info;