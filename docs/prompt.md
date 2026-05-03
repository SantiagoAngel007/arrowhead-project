Eres un asistente de desarrollo para el proyecto Arrowhead, una plataforma CTF (Capture The Flag) educativa desarrollada para la Universidad Icesi en Cali, Colombia. El objetivo es motivar el interés en ciberseguridad en estudiantes de bachillerato (grados 9°, 10° y 11°).
Contexto del proyecto
Arrowhead es una aplicación web fullstack con las siguientes características:

Los participantes ingresan con un código de acceso y un alias
Resuelven retos de ciberseguridad organizados en 3 niveles: básico, intermedio y avanzado
Hay un ranking en tiempo real visible para todos los participantes
Los facilitadores tienen un panel de administración separado
El evento dura entre 60 y 90 minutos

Stack tecnológico
Frontend:

React con TypeScript (creado con Vite)
TanStack Query para manejo de estado y fetch
React Router DOM para navegación
Socket.io client para el ranking en tiempo real
Axios para llamadas HTTP
Tailwind CSS v4 para estilos

Backend (aún no iniciado):

Spring Boot con Java 21
PostgreSQL como base de datos
Redis para caché del ranking
JWT para autenticación
WebSockets para el ranking en tiempo real

Infraestructura:

Docker Compose para levantar PostgreSQL y Redis localmente
Monorepo en GitHub con carpetas frontend/ y backend/

Estado actual del frontend
El proyecto de React ya está creado y configurado con:

Vite + React + TypeScript
Dependencias instaladas: @tanstack/react-query, axios, socket.io-client, react-router-dom, tailwindcss @tailwindcss/vite
Tailwind v4 configurado en vite.config.ts con @tailwindcss/vite y @import "tailwindcss" en index.css

Arquitectura del frontend

frontend/src/
├── features/
│   ├── auth/
│   ├── challenges/
│   ├── ranking/
│   └── admin/
├── components/
├── hooks/
├── services/
└── types/

Estrategia de mocks
El frontend usa una capa de servicios con un flag USE_MOCK para alternar entre datos falsos y la API real. Esto permite desarrollar y demostrar el proyecto al tutor sin necesitar el backend listo.

const USE_MOCK = true // cambiar a false cuando el backend esté listo

export const getChallenges = async () => {
  if (USE_MOCK) return mockChallenges
  const res = await axios.get('/api/challenges')
  return res.data
}

Sugerencias
 Problemas detectados
                      
  ┌──────────────────────────────────────┬─────────────────────────────────────────────────┐
  │               Problema               │               Archivos afectados                │   
  ├──────────────────────────────────────┼─────────────────────────────────────────────────┤
  │ App.tsx es código muerto — no está   │ App.tsx                                         │   
  │ en el router, duplica UI             │                                                 │
  ├──────────────────────────────────────┼─────────────────────────────────────────────────┤   
  │ useColorCycle instanciado dos veces  │                                                 │   
  │ — en Root (main.tsx) y en            │ main.tsx, ChallengesPage.tsx                    │   
  │ ChallengesPage; generan dos          │                                                 │   
  │ intervalos independientes            │                                                 │   
  ├──────────────────────────────────────┼─────────────────────────────────────────────────┤
  │ Archivos duplicados/stubs en raíz de │ auth/LoginForm.tsx,                             │   
  │  features — versiones viejas sin     │ challenges/ChallengeList.tsx,                   │
  │ usar                                 │ ranking/RankingTable.tsx, info/InfoPanel.tsx    │
  ├──────────────────────────────────────┼─────────────────────────────────────────────────┤
  │ RankingPage — completamente sin      │ ranking/components/RankingTable.tsx             │   
  │ diseñar (solo <ol> con 2 entradas)   │                                                 │
  ├──────────────────────────────────────┼─────────────────────────────────────────────────┤   
  │ InfoPage — completamente sin diseñar │ info/components/InfoPanel.tsx                   │
  │  (texto plano)                       │                                                 │
  ├──────────────────────────────────────┼─────────────────────────────────────────────────┤
  │ AdminPage — completamente sin        │ admin/components/AdminDashboard.tsx             │
  │ diseñar (botones sin estilo)         │                                                 │   
  ├──────────────────────────────────────┼─────────────────────────────────────────────────┤
  │ ThemeSwitcher — solo se usa en el    │                                                 │   
  │ App.tsx muerto, no en el Layout      │ ThemeSwitcher.tsx                               │   
  │ activo                               │                                                 │
  ├──────────────────────────────────────┼─────────────────────────────────────────────────┤   
  │ Nav bug en Layout — "INICIO" y       │ Layout.tsx:4-5                                  │
  │ "RETOS" apuntan ambos a /challenges  │                                                 │   
  ├──────────────────────────────────────┼─────────────────────────────────────────────────┤
  │ Botón ▶ ACCEDER — sin funcionalidad  │ Layout.tsx:56-69                                │   
  ├──────────────────────────────────────┼─────────────────────────────────────────────────┤   
  │ Sin autenticación real — LoginForm   │ LoginForm.tsx, router.tsx                       │
  │ navega directamente sin guards       │                                                 │   
  ├──────────────────────────────────────┼─────────────────────────────────────────────────┤
  │ Datos hardcodeados — los services    │                                                 │   
  │ existen con USE_MOCK = true pero no  │ *.service.ts                                    │   
  │ hay integración real                 │                                                 │
  └──────────────────────────────────────┴─────────────────────────────────────────────────┘   
                  
  ---
  Prioridades sugeridas
                                                                                               
  1. Eliminar App.tsx y los stubs duplicados en raíces de features.
  2. Mover useColorCycle a contexto para que sea una sola instancia compartida entre LoginPage 
  y ChallengesPage.                                                                            
  3. Diseñar RankingPage e InfoPage — son las dos páginas más vacías.                          
  4. Conectar el botón ▶ ACCEDER y añadir guards de ruta.   