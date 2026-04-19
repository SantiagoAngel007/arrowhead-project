 # Arrowhead Project — Frontend                                                                   
                                         
  Interfaz web del CTF (Capture The Flag) educativo para la Universidad Icesi, Cali, Colombia.     
  Dirigido a estudiantes de bachillerato (grados 9°, 10° y 11°).
                                                                                                   
  ---                                                       
                                                                                                   
  ## Equipo                                                 

  | Nombre   | Feature asignada     |
  |----------|----------------------|
  | Angel    | challenges + ranking |
  | Angela   | auth (login)         |                                                              
  | Carol    | info                 |
  | Catalina | admin                |                                                              
                                                            
  ---

  ## Stack

  - React + TypeScript (Vite)
  - TanStack Query — manejo de estado y fetch
  - React Router DOM — navegación                                                                  
  - Socket.io client — ranking en tiempo real
  - Axios — llamadas HTTP                                                                          
  - Tailwind CSS v4 — estilos base                          
  - Framer Motion — animaciones

  ---                                                                                              
   
  ## Estructura del proyecto                                                                       
                                                            
  ```
  src/
  ├── features/
  │   ├── auth/
  │   │   ├── components/    ← UI de la feature
  │   │   ├── hooks/         ← lógica reutilizable
  │   │   ├── services/      ← llamadas a la API                                                   
  │   │   ├── pages/         ← página que usa el router
  │   │   ├── types.ts       ← tipos TypeScript                                                    
  │   │   └── index.ts       ← exportaciones públicas                                              
  │   ├── challenges/        (misma estructura)
  │   ├── ranking/           (misma estructura)                                                    
  │   ├── info/              (misma estructura)             
  │   └── admin/             (misma estructura)                                                    
  ├── components/            ← componentes globales (Layout, ThemeSwitcher)
  ├── hooks/                 ← hooks globales (useTheme)                                           
  ├── styles/                ← temas y estilos de componentes                                      
  │   ├── components.css     ← estilos base de todos los componentes
  │   ├── theme-dark.css                                                                           
  │   ├── theme-purple.css                                                                         
  │   ├── theme-minimal.css
  │   └── theme-hacker.css                                                                         
  ├── router.tsx             ← definición de rutas          
  └── main.tsx               ← entrada de la app                                                   
  ```                                                       
                                                                                                   
  ---                                                       

  ## Rutas

  | Ruta        | Página         | Descripción                     |                               
  |-------------|----------------|---------------------------------|
  | /           | App.tsx        | Demo visual con todos los temas |                               
  | /login      | LoginPage      | Acceso con código y alias       |                               
  | /challenges | ChallengesPage | Lista de retos                  |                               
  | /ranking    | RankingPage    | Ranking en tiempo real          |                               
  | /info       | InfoPage       | Información del evento          |                               
  | /admin      | AdminPage      | Panel del facilitador           |                               
                                                            
  ---                                                                                              
                                                            
  ## Sistema de temas                                                                              
   
  Los temas se manejan con CSS custom properties y el atributo `data-theme` en el `<body>`.        
  El hook `useTheme` aplica el tema y lo persiste en `localStorage`.
                                                                                                   
  ### Temas disponibles                                                                            
                                                                                                   
  - **dark** — fondo oscuro, acento naranja                                                        
  - **purple** — fondo blanco, acento púrpura                                                    
  - **minimal** — fondo blanco limpio, acento azul, bordes redondeados                             
  - **hacker** — terminal verde, scanlines, clip-path, animaciones de cursor
                                                                                                   
  ### Cómo agregar un nuevo tema                                                                   
                                                                                                   
  1. Crear el archivo en `src/styles/theme-<nombre>.css`                                           
  2. Definir las variables con `[data-theme="<nombre>"]`                                         
  3. Agregar overrides de componentes en el mismo archivo (opcional pero recomendado)              
  4. Importarlo en `src/index.css`                                                                 
  5. Agregar el tema al tipo `Theme` en `src/hooks/useTheme.ts`                                    
  6. Agregar la opción en `src/components/ThemeSwitcher.tsx`                                       
                                                                                                   
  ```css                                                                                           
  [data-theme="nombre"] {                                                                        
    --text: ...;                                                                                   
    --text-h: ...;
    --bg: ...;                                                                                     
    --border: ...;                                                                               
    --code-bg: ...;                                                                                
    --accent: ...;
    --accent-bg: ...;                                                                              
    --accent-border: ...;                                                                        
    --sans: ...;
    --heading: ...;                                                                                
    --mono: ...;
  }                                                                                                
                                                                                                 
  /* Overrides de componentes (opcional) */
  [data-theme="nombre"] .challenge-card { ... }
  [data-theme="nombre"] .ranking-list { ... }                                                      
  ```
                                                                                                   
  ---                                                                                            

  ## Estrategia de mocks                                                                           
  
  Cada servicio tiene un flag `USE_MOCK` para desarrollar sin backend.                             
                                                                                                 
  ```ts                                                                                            
  const USE_MOCK = true  // cambiar a false cuando el backend esté listo                         

  export const getChallenges = async (): Promise<Challenge[]> => {
    if (USE_MOCK) return mockChallenges                                                            
    const res = await axios.get('/api/challenges')
    return res.data                                                                                
  }                                                                                              
  ```                                                                                              
                                                                                                 
  ---

  ## Convenciones de código

  | Elemento                | Convención       | Ejemplo                          |                
  |-------------------------|------------------|----------------------------------|
  | Variables y funciones   | camelCase        | `mockChallenges`, `useLogin`     |                
  | Componentes React       | PascalCase       | `ChallengeList`, `LoginForm`     |                
  | Clases CSS              | kebab-case       | `challenge-card`, `submit-box`   |                
  | Archivos componentes    | PascalCase       | `LoginForm.tsx`                  |                
  | Archivos hooks/services | camelCase        | `useLogin.ts`, `auth.service.ts` |                
  | Tipos e interfaces      | PascalCase       | `LoginPayload`, `Challenge`      |                
  | Constantes              | UPPER_SNAKE_CASE | `USE_MOCK`                       |                
                                                                                                   
  - Todo el código en **inglés** (variables, funciones, comentarios)                               
  - El texto visible para los estudiantes en **español**                                         
  - Comillas **dobles** en TypeScript                                                              
  
  ---                                                                                              
                                                                                                 
  ## Convenciones de Git

  ### Ramas

  ```
  main                          ← producción, requiere PR aprobado
  dev                           ← integración, base para features
  feature/<feature>-<nombre>    ← rama de trabajo personal                                         
  ```
                                                                                                   
  Ejemplos:                                                                                      

  ```
  feature/login-angela
  feature/challenges-angel
  feature/info-carol                                                                               
  feature/admin-catalina
  ```                                                                                              
                                                                                                 
  ### Commits

  Formato: `<tipo>: <descripción en inglés>`

  | Tipo     | Cuándo usarlo                        |
  |----------|--------------------------------------|
  | feat     | nueva funcionalidad                  |                                              
  | fix      | corrección de bug                    |
  | style    | cambios visuales o de CSS            |                                              
  | refactor | refactorización sin cambio de lógica |                                            
  | chore    | configuración, dependencias          |                                              
  
  Ejemplos:                                                                                        
                                                                                                 
  ```
  feat: add login form component
  fix: correct ranking sort order
  style: add hacker theme overrides for challenge card
  ```

  ### Pull Requests                                                                                
  
  - La rama base siempre es `dev`, nunca `main` directamente                                       
  - Todo PR requiere **al menos una revisión** antes de hacer merge                              
  - El título del PR sigue el mismo formato que los commits
                                                                                                   
  ---
                                                                                                   
  ## Cómo correr el proyecto                                                                     

  ```bash
  cd frontend
  npm install
  npm run dev
  ```