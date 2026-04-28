import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import LevelCard from "./components/LevelCard";
import Info from "./components/Info";
import Countdown from "./components/Countdown";
import logoU from "./assets/LogoU.png";

function App() {

  const navLinks = [
    { label: "Inicio", path: "/inicio" },
    { label: "Retos", path: "/retos" },
    { label: "Marcador", path: "/score" },
    { label: "Equipo", path: "/equipo" },
    { label: "Info", path: "/info" },
  ];

  const sideLinks = [
    { title: "Información General", img: "" },
    { title: "Reglas", img: "" },
    { title: "FAQ", img: "" },
  ];

  const cardLinks = [
    {level: "Nivel 1", title:"INICIACIÓN", description:"Retos basicos para familiarizarte con el formato CTF", img:"", difficulty:"Fácil", sideText: "Ideal para principiantes"},
    {level: "Nivel 2", title:"EXPLORACIÓN", description:"Retos de dificultad media que te ayudarán a aplicar técnicas", img:"", difficulty:"Media", sideText: "Pon a prueba tus habilidades"},
    {level: "Nivel 3", title:"DESAFÍO", description:"Retos avanzados que requieren mayor análisis", img:"", difficulty:"Difícil", sideText: "Para quienes buscan un desafío real"},
    {level: "Nivel 4", title:"MAESTRO", description:"Los retos más complejos de los CTF", img:"", difficulty:"Experto", sideText: "Máximo"}
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono">
      <NavBar name="ARROWHEAD" img="" links={navLinks} />

      <div className="flex flex-col md:flex-row p-6 gap-6">

        <aside className="md:w-64">
          <SideBar links={sideLinks} />
          <Countdown targetDate="2026-05-25T23:59:59" />
        </aside>

        <main className="flex-1 space-y-12">

          <Info />


          <div className="text-center space-y-2">
            <h2 className="text-green-500 font-bold text-xl tracking-widest uppercase">
              Niveles de Retos
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              El CTF está organizado en niveles para que puedas progresar a tu propio ritmo.
            </p>
          </div>

          <LevelCard links={cardLinks} />
          
          <div className="text-center space-y-2">
            <h2 className="text-green-500 font-bold text-xl tracking-widest uppercase">
              Recuerda
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Puedes consultar las reglas completas en la sección de Reglas.
            </p>
            <p className="text-green-600 font-bold text-xs tracking-widest uppercase">
              ¡Diviértete, colabora  y que gane el mejor!
            </p>
          </div>

        </main>
      </div>
    </div>
  );
}

export default App;
