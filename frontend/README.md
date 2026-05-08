# CyberDefender Quest — Information Resource Hub

Plataforma educativa de ciberseguridad para estudiantes de 9°, 10° y 11° grado.

## Stack
- **React 18** + **TypeScript**
- **Vite** (bundler)
- **Tailwind CSS** (estilos)

## Estructura de componentes

```
src/
├── components/
│   ├── types.ts                  # Interfaces TypeScript compartidas
│   ├── data.ts                   # Datos estáticos (tarjetas, comandos, amenazas)
│   ├── InfoResourceHub.tsx       # Página principal (layout raíz)
│   ├── Header.tsx                # Encabezado con título y timer
│   ├── ScanlineOverlay.tsx       # Efectos visuales de fondo (scanlines, grid)
│   ├── SectionTitle.tsx          # Título reutilizable de sección
│   ├── KnowledgeSection.tsx      # Tarjetas interactivas con hover popup
│   ├── ConsoleSection.tsx        # Guía de comandos + demo animado
│   └── ThreatAwarenessSection.tsx# Tarjetas de amenazas + tips rotatorios
├── App.tsx
├── App.css
├── index.css
├── main.tsx
└── vite-env.d.ts
```

## Instalación y ejecución

```bash
npm install
npm run dev
```

## Características

### 🔵 Fundamentos de Ciberseguridad
- 4 tarjetas interactivas con hover
- Al pasar el cursor aparece un popup con descripción, bullets y ejemplo práctico
- Niveles diferenciados: Básico / Intermedio / Avanzado

### 🟢 Guía de Consola y Terminal
- Tabla de comandos esenciales con ejemplos
- Diagrama visual de anatomía de un comando
- Terminal con demo animada (ejecuta `grep` en vivo)

### 🔴 Conciencia de Amenazas
- 4 tarjetas de amenazas comunes con flip al hacer clic
- Sección rotativa de "¿Sabías que...?" con 6 consejos de seguridad
- Navegación por puntos o botones

## Personalización

Para agregar nuevas tarjetas de conocimiento o comandos, edita `src/components/data.ts`.
