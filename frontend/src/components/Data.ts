export const BLOCKS = [
  "Bloque 1: Introducción a la Ciberseguridad e Identidades Digitales",
  "Bloque 2: Redes (IP, Puertos y Protocolos)",
  "Bloque 3: La Tríada CIA (Confidencialidad, Integridad y Disponibilidad)",
  "Bloque 4: OWASP Top 10",
  "Bloque 5: El Modelo OSI",
  "Bloque 6: Desafíos de Lógica, Conceptos Prácticos y Casos Reales"
];

export const QUESTIONS = [
  // BLOQUE 1
  {
    id: 1,
    blockIdx: 0,
    text: "¿Cuál es el objetivo principal de la ciberseguridad en nuestro día a día?",
    options: [
      { id: 'A', text: 'Hacer que el internet sea más rápido y los videojuegos no tengan lag.' },
      { id: 'B', text: 'Proteger nuestros sistemas, redes y datos de accesos no autorizados o ataques digitales.' },
      { id: 'C', text: 'Crear virus informáticos para poner a prueba a las computadoras viejas.' },
      { id: 'D', text: 'Aprender a adivinar las contraseñas de las redes sociales de otras personas.' }
    ],
    correct: 'B'
  },
  {
    id: 2,
    blockIdx: 0,
    text: "¿Qué diferencia principalmente a un 'Hacker Ético' de un 'Cibercriminal'?",
    options: [
      { id: 'A', text: 'El hacker ético tiene autorización legal para buscar fallas y ayuda a repararlas; el cibercriminal lo hace sin permiso para dañar o robar.' },
      { id: 'B', text: 'El cibercriminal requiere autorización de un gobierno para operar.' },
      { id: 'C', text: 'Los hackers éticos solo tienen permitido trabajar dentro de bancos locales.' },
      { id: 'D', text: 'El cibercriminal sabe programar y el hacker ético solo sabe usar programas ya hechos.' }
    ],
    correct: 'A'
  },
  {
    id: 3,
    blockIdx: 0,
    text: 'Si una empresa contrata a un experto para que intente "hackear" sus propios sistemas e informe dónde están los puntos débiles, ¿cómo se le conoce a esta actividad?',
    options: [
      { id: 'A', text: 'Ciberespionaje industrial.' },
      { id: 'B', text: 'Hacking de sombrero negro (Black Hat).' },
      { id: 'C', text: 'Pruebas de penetración o Hacking Ético.' },
      { id: 'D', text: 'Piratería digital de software.' }
    ],
    correct: 'C'
  },
  {
    id: 4,
    blockIdx: 0,
    text: '¿Qué es "Kali Linux" en el mundo de la seguridad informática?',
    options: [
      { id: 'A', text: 'Un antivirus gratuito que se instala en celulares.' },
      { id: 'B', text: 'Un sistema operativo basado en Linux diseñado especialmente para auditorías de seguridad y pruebas de penetración.' },
      { id: 'C', text: 'Un navegador web secreto que usan los cibercriminales para no dejar rastro.' },
      { id: 'D', text: 'El nombre del primer virus informático de la historia.' }
    ],
    correct: 'B'
  },
  {
    id: 5,
    blockIdx: 0,
    text: 'En el mundo del hacking, ¿cómo se le conoce a los atacantes maliciosos que violan la seguridad para beneficio personal, robar información o destruir sistemas?',
    options: [
      { id: 'A', text: 'Hackers de Sombrero Blanco (White Hat).' },
      { id: 'B', text: 'Hackers de Sombrero Negro (Black Hat).' },
      { id: 'C', text: 'Hackers de Sombrero Gris (Grey Hat).' },
      { id: 'D', text: 'Analistas de Soporte Técnico.' }
    ],
    correct: 'B'
  },
  {
    id: 6,
    blockIdx: 0,
    text: 'Un hacker encuentra una falla de seguridad en la página web de un colegio. Sin pedir permiso, entra al sistema para demostrar que existe la falla, pero no altera nada ni roba datos, y luego le avisa al director. ¿A qué categoría pertenece?',
    options: [
      { id: 'A', text: 'Sombrero Negro (Black Hat).' },
      { id: 'B', text: 'Sombrero Blanco (White Hat).' },
      { id: 'C', text: 'Sombrero Gris (Grey Hat).' },
      { id: 'D', text: 'Ciberterrorista.' }
    ],
    correct: 'C'
  },
  {
    id: 7,
    blockIdx: 0,
    text: '¿Cuál es una consecuencia legal o personal directa si un menor de edad comete un acto de cibercriminalidad (como tumbar la red del colegio o robar datos)?',
    options: [
      { id: 'A', text: 'No pasa nada porque las leyes de internet no aplican a menores de edad.' },
      { id: 'B', text: 'Puede enfrentar procesos judiciales juveniles, multas económicas familiares y antecedentes penales que afecten su futuro profesional.' },
      { id: 'C', text: 'El único castigo es que la empresa de internet le reduzca la velocidad de navegación por una semana.' },
      { id: 'D', text: 'Se le premia dándole una beca automática en ingeniería de sistemas.' }
    ],
    correct: 'B'
  },

  // BLOQUE 2
  {
    id: 8,
    blockIdx: 1,
    text: 'Si el internet fuera un sistema postal global, ¿qué analogía describe mejor lo que es una "Dirección IP"?',
    options: [
      { id: 'A', text: 'El nombre completo del dueño del dispositivo.' },
      { id: 'B', text: 'La velocidad a la que viaja el paquete de datos.' },
      { id: 'C', text: 'La dirección física o número único de casa que permite localizar un dispositivo en la red.' },
      { id: 'D', text: 'El candado de seguridad que cierra la caja del paquete.' }
    ],
    correct: 'C'
  },
  {
    id: 9,
    blockIdx: 1,
    text: 'Si la dirección IP es como la dirección de un edificio de apartamentos, ¿qué vendrían siendo los "Puertos"?',
    options: [
      { id: 'A', text: 'Las ventanas por donde se puede mirar hacia la calle.' },
      { id: 'B', text: 'Los números de apartamento específicos que permiten que cada servicio (como web, juegos o correo) reciba sus propios datos.' },
      { id: 'C', text: 'Los cables de energía conectados al edificio.' },
      { id: 'D', text: 'El tamaño total de la memoria del computador.' }
    ],
    correct: 'B'
  },
  {
    id: 10,
    blockIdx: 1,
    text: 'En ciberseguridad, ¿por qué es importante realizar un "escaneo de puertos"?',
    options: [
      { id: 'A', text: 'Para borrar el historial de navegación de la computadora.' },
      { id: 'B', text: 'Para descubrir qué canales o servicios están abiertos (activos) y evaluar si tienen vulnerabilidades.' },
      { id: 'C', text: 'Para aumentar los megas de descarga del internet del colegio.' },
      { id: 'D', text: 'Para cambiar la contraseña del router de la casa de forma remota.' }
    ],
    correct: 'B'
  },
  {
    id: 11,
    blockIdx: 1,
    text: '¿Cuál es la diferencia clave entre los protocolos de transporte TCP y UDP?',
    options: [
      { id: 'A', text: 'TCP es exclusivo para celulares y UDP es exclusivo para computadoras.' },
      { id: 'B', text: 'TCP es seguro porque confirma que todos los datos lleguen completos y en orden; UDP los envía rápido sin verificar si se perdieron en el camino.' },
      { id: 'C', text: 'UDP encripta los datos con claves militares y TCP los envía en texto plano.' },
      { id: 'D', text: 'TCP solo sirve para descargar imágenes y UDP solo sirve para enviar correos.' }
    ],
    correct: 'B'
  },
  {
    id: 12,
    blockIdx: 1,
    text: 'Si estás jugando un videojuego en línea en tiempo real o viendo un stream en vivo donde la velocidad es lo más importante, ¿qué protocolo es el más adecuado para esa transmisión?',
    options: [
      { id: 'A', text: 'TCP' },
      { id: 'B', text: 'UDP' },
      { id: 'C', text: 'HTTP' },
      { id: 'D', text: 'SSH' }
    ],
    correct: 'B'
  },
  {
    id: 13,
    blockIdx: 1,
    text: 'Al descargar un archivo o una tarea escolar muy importante, necesitas que llegue 100% completo y sin errores. ¿Qué protocolo garantiza esto?',
    options: [
      { id: 'A', text: 'UDP' },
      { id: 'B', text: 'TFTP' },
      { id: 'C', text: 'TCP' },
      { id: 'D', text: 'Bluetooth' }
    ],
    correct: 'C'
  },

  // BLOQUE 3
  {
    id: 14,
    blockIdx: 2,
    text: '¿Cuáles son los tres pilares fundamentales que componen la Tríada CIA en seguridad de la información?',
    options: [
      { id: 'A', text: 'Computación, Internet y Almacenamiento.' },
      { id: 'B', text: 'Control, Inteligencia y Autenticación.' },
      { id: 'C', text: 'Confidencialidad, Integridad y Disponibilidad.' },
      { id: 'D', text: 'Conectividad, Identidad y Actualización.' }
    ],
    correct: 'C'
  },
  {
    id: 15,
    blockIdx: 2,
    text: 'Si un atacante logra entrar a la base de datos de un colegio y lee las notas privadas de los estudiantes sin autorización, ¿qué pilar de la Tríada CIA se rompió?',
    options: [
      { id: 'A', text: 'Disponibilidad, porque el colegio ya no puede usar sus computadoras.' },
      { id: 'B', text: 'Confidencialidad, porque la información privada fue expuesta a alguien no autorizado.' },
      { id: 'C', text: 'Integridad, porque el archivo cambió de tamaño.' },
      { id: 'D', text: 'Autenticidad, porque las notas desaparecieron del sistema.' }
    ],
    correct: 'B'
  },
  {
    id: 16,
    blockIdx: 2,
    text: 'Un estudiante altera el sistema de asistencia para colocarse "Presente" en un día que faltó a clases. ¿Qué pilar de la Tríada CIA se vio afectado directamente?',
    options: [
      { id: 'A', text: 'Confidencialidad, porque ahora todos saben que faltó.' },
      { id: 'B', text: 'Disponibilidad, porque el sistema se cayó durante la modificación.' },
      { id: 'C', text: 'Integridad, porque la información real fue modificada y alterada de forma maliciosa.' },
      { id: 'D', text: 'Velocidad, porque el sistema se puso lento al procesar el cambio.' }
    ],
    correct: 'C'
  },
  {
    id: 17,
    blockIdx: 2,
    text: 'Un grupo de cibercriminales satura la página web de un banco con millones de visitas falsas al mismo tiempo, provocando que los usuarios reales no puedan entrar a revisar sus cuentas. ¿Qué pilar fue atacado?',
    options: [
      { id: 'A', text: 'Confidencialidad' },
      { id: 'B', text: 'Disponibilidad' },
      { id: 'C', text: 'Integridad' },
      { id: 'D', text: 'Encriptación' }
    ],
    correct: 'B'
  },

  // BLOQUE 4
  {
    id: 18,
    blockIdx: 3,
    text: '¿Qué es el "OWASP Top 10" en el contexto del desarrollo de software y la ciberseguridad?',
    options: [
      { id: 'A', text: 'Una lista de los 10 mejores hackers del mundo en este año.' },
      { id: 'B', text: 'Un documento que recopila los 10 riesgos y vulnerabilidades de seguridad más críticos y comunes en aplicaciones web.' },
      { id: 'C', text: 'Las 10 contraseñas más difíciles de adivinar por una computadora.' },
      { id: 'D', text: 'Las 10 páginas web más visitadas y seguras de todo internet.' }
    ],
    correct: 'B'
  },
  {
    id: 19,
    blockIdx: 3,
    text: 'Imagina que un formulario web (como el de "Buscar") permite que un atacante escriba código de programación malicioso en lugar de una palabra común, y el servidor ejecuta ese código dándole acceso a la base de datos. ¿Cómo se llama esta vulnerabilidad del OWASP Top 10?',
    options: [
      { id: 'A', text: 'Inyección (ej. SQL Injection)' },
      { id: 'B', text: 'Desbordamiento de memoria física.' },
      { id: 'C', text: 'Descarga de virus involuntaria.' },
      { id: 'D', text: 'Suplantación de identidad física.' }
    ],
    correct: 'A'
  },
  {
    id: 20,
    blockIdx: 3,
    text: 'Entras a una página web y notas que en la barra de direcciones dice http:// en lugar de https://, lo que significa que los datos que viajan entre tu computadora y la página no están encriptados y cualquiera en la red los podría leer. Según OWASP, esto se clasifica como:',
    options: [
      { id: 'A', text: 'Fallas de Inyección.' },
      { id: 'B', text: 'Falla Criptográfica / Exposición de Datos Sensibles.' },
      { id: 'C', text: 'Diseño Inseguro de Pantalla.' },
      { id: 'D', text: 'Software desactualizado.' }
    ],
    correct: 'B'
  },
  {
    id: 21,
    blockIdx: 3,
    text: 'Una página web permite que un usuario cree la contraseña 12345 o deje la contraseña por defecto admin. ¿Qué tipo de problema del OWASP Top 10 representa esto?',
    options: [
      { id: 'A', text: 'Configuración de Seguridad Incorrecta / Autenticación Débil.' },
      { id: 'B', text: 'Inyección de código HTML.' },
      { id: 'C', text: 'Pérdida de control del hardware.' },
      { id: 'D', text: 'Actualización automática fallida.' }
    ],
    correct: 'A'
  },

  // BLOQUE 5
  {
    id: 22,
    blockIdx: 4,
    text: '¿Qué es el Modelo OSI en la informática y las redes?',
    options: [
      { id: 'A', text: 'Un tipo de cable de fibra óptica de alta velocidad.' },
      { id: 'B', text: 'Un modelo conceptual de 7 capas que describe cómo se comunican los sistemas a través de una red.' },
      { id: 'C', text: 'Un software para detectar intrusos en tiempo real.' },
      { id: 'D', text: 'Un protocolo exclusivo para conectar dispositivos vía satélite.' }
    ],
    correct: 'B'
  },
  {
    id: 23,
    blockIdx: 4,
    text: '¿Cuántas capas componen conceptualmente el Modelo OSI?',
    options: [
      { id: 'A', text: '3 capas' },
      { id: 'B', text: '5 capas' },
      { id: 'C', text: '7 capas' },
      { id: 'D', text: '10 capas' }
    ],
    correct: 'C'
  },
  {
    id: 24,
    blockIdx: 4,
    text: 'Cuando estás chateando en una aplicación, escribiendo un correo o interactuando directamente con la interfaz visual de una página web, ¿en qué capa del modelo OSI te encuentras?',
    options: [
      { id: 'A', text: 'Capa 1: Física' },
      { id: 'B', text: 'Capa 3: Red' },
      { id: 'C', text: 'Capa 4: Transporte' },
      { id: 'D', text: 'Capa 7: Aplicación' }
    ],
    correct: 'D'
  },
  {
    id: 25,
    blockIdx: 4,
    text: 'Si un cable de red de una computadora se rompe o se desconecta de la pared, ¿en qué capa del Modelo OSI está ocurriendo la falla?',
    options: [
      { id: 'A', text: 'Capa 7: Aplicación' },
      { id: 'B', text: 'Capa 1: Física' },
      { id: 'C', text: 'Capa 4: Transporte' },
      { id: 'D', text: 'Capa 3: Red' }
    ],
    correct: 'B'
  },
  {
    id: 26,
    blockIdx: 4,
    text: 'Los "Routers" son los dispositivos encargados de decidir la mejor ruta para enviar los paquetes de datos utilizando las direcciones IP. ¿En qué capa del Modelo OSI trabajan principalmente?',
    options: [
      { id: 'A', text: 'Capa 2: Enlace de datos' },
      { id: 'B', text: 'Capa 3: Red' },
      { id: 'C', text: 'Capa 5: Sesión' },
      { id: 'D', text: 'Capa 6: Presentación' }
    ],
    correct: 'B'
  },

  // BLOQUE 6
  {
    id: 27,
    blockIdx: 5,
    text: 'Recibes un correo electrónico que dice ser de tu banco. Te advierte que tu cuenta será bloqueada si no haces clic en un enlace de inmediato y escribes tu contraseña. La dirección del remitente es seguridad@banc0-bvc.com (con un cero en lugar de una \'o\'). ¿A qué tipo de ataque te estás enfrentando?',
    options: [
      { id: 'A', text: 'Un ataque de fuerza bruta a tu Wi-Fi.' },
      { id: 'B', text: 'Phishing (Suplantación de identidad).' },
      { id: 'C', text: 'Inyección de código SQL en tu correo.' },
      { id: 'D', text: 'Un virus que borra el disco duro.' }
    ],
    correct: 'B'
  },
  {
    id: 28,
    blockIdx: 5,
    text: '¿Qué función cumple el "Hashing" o las funciones Hash (como SHA-256) en la ciberseguridad?',
    options: [
      { id: 'A', text: 'Comprimir una película para que ocupe menos espacio.' },
      { id: 'B', text: 'Convertir un texto o archivo en una cadena de caracteres única y fija para verificar que los datos no hayan sido alterados (Integridad).' },
      { id: 'C', text: 'Aumentar la señal de las antenas de Wi-Fi del laboratorio.' },
      { id: 'D', text: 'Apagar servidores de forma remota en caso de emergencia.' }
    ],
    correct: 'B'
  },
  {
    id: 29,
    blockIdx: 5,
    text: 'Si un ciberanalista quiere revisar detalladamente qué contiene una página web por dentro para buscar enlaces ocultos o comentarios sospechosos dejados por los programadores, ¿qué acción básica e introductoria debería realizar en su navegador?',
    options: [
      { id: 'A', text: 'Formatear la computadora de inmediato.' },
      { id: 'B', text: 'Dar clic derecho e "Inspeccionar código fuente" (Ver código fuente de la página).' },
      { id: 'C', text: 'Cambiar la dirección IP de su máquina a modo privado.' },
      { id: 'D', text: 'Borrar todas las cookies y cerrar el navegador.' }
    ],
    correct: 'B'
  },
  {
    id: 30,
    blockIdx: 5,
    text: 'Un analista de seguridad ejecuta el comando ping 192.168.1.1 en su terminal. ¿Qué está intentando comprobar con esta acción?',
    options: [
      { id: 'A', text: 'Si la computadora de destino tiene un virus activo.' },
      { id: 'B', text: 'Si existe conectividad básica y el dispositivo con esa dirección IP responde en la red.' },
      { id: 'C', text: 'Cambiar el nombre de usuario administrador del sistema.' },
      { id: 'D', text: 'Descargar la última actualización de Kali Linux.' }
    ],
    correct: 'B'
  }
];