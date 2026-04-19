 Arrowhead Project

  Plataforma CTF (Capture The Flag) educativa desarrollada para la Universidad Icesi, Cali, Colombia. 
  Diseñada como una experiencia formativa e introductoria a la ciberseguridad para estudiantes de educación media.                                                                  
                                                            
  ---

  ## Sobre el evento                                                                               
  
  El objetivo principal de Arrowhead es motivar el interés en ciberseguridad en estudiantes de grados 9°, 10° y 11°, brindando una experiencia práctica donde el aprendizaje y la curiosidad son el eje central — no el conocimiento técnico previo.                                             
                                                            
  Los participantes se perciben como "analistas de seguridad" enfrentando desafíos reales adaptados a su nivel, acompañados en todo momento por un equipo de facilitadores.
                                                                                                   
  **Duración del evento:** 60 a 90 minutos                  

  ---

  ## Perfil de los participantes                                                                   
  
  | Grado       | Nivel        | Características                                              |    
  |-------------|--------------|--------------------------------------------------------------|
  | 9° y 10°    | Intermedio   | Conocimientos básicos en tecnología, posible familiaridad con     
  programación |                                                                                   
  | 11°         | Avanzado     | Mayor interés en carreras técnicas, disposición para retos
  técnicos |                                                                                       


  
  ---                                                                                              
                                                            
  ## Equipo

  | Nombre   | Roles     |                                                              
  |----------|----------------------|
  | Angel    |   |                                                              
  | Angela   |          |                                                              
  | Carol    |                  |
  | Catalina |                 |                                                              
                                                            
  ---                                                                                              
                                                            
  ## Stack tecnológico

  ### Frontend                                                                                     
  - React + TypeScript (Vite)
  - TanStack Query — manejo de estado y fetch                                                      
  - React Router DOM — navegación                                                                  
  - Socket.io client — ranking en tiempo real
  - Axios — llamadas HTTP                                                                          
  - Tailwind CSS v4 — estilos base                                                                 
  - Framer Motion — animaciones
                                                                                                   
  ### Backend                                               
  - Spring Boot con Java 21
  - PostgreSQL — base de datos                                                                     
  - Redis — caché del ranking
  - JWT — autenticación                                                                            
  - WebSockets — ranking en tiempo real                     
                                                                                                   
  ### Infraestructura
  - Docker Compose — levanta PostgreSQL y Redis localmente                                         
                                                                                                   
  ---
                                                                                                   
  ## Estructura del repositorio                             

  ```
  arrowhead-project/
  ├── frontend/    ← aplicación React
  ├── backend/     ← API Spring Boot (pendiente)                                                   
  └── docs/        ← documentación del proyecto
  ```                                                                                              
                                                            
  ---

  ## Cómo correr el proyecto                                                                       
  
  ### Requisitos previos                                                                           
  - Node.js 18+                                             
  - Java 21
  - Docker y Docker Compose                                                                        
  
  ### Frontend                                                                                     
                                                            
  ```bash
  cd frontend
  npm install
  npm run dev
  ```

  La aplicación estará disponible en `http://localhost:5173`

  ### Backend (pendiente)                                                                          
  
  ```bash                                                                                          
  # Levantar base de datos y Redis                          
  docker compose up -d

  # Correr el backend
  cd backend                                                                                       
  ./mvnw spring-boot:run
  ```                                                                                              
                                                            
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
                                                                                                   
  ### Pull Requests                                                                                
                                                            
  - La rama base siempre es `dev`, nunca `main` directamente                                       
  - Todo PR requiere **al menos una revisión** antes de hacer merge
  - El título del PR sigue el mismo formato que los commits