-- 30 preguntas de opción múltiple para el reto "Cuestionario de Iniciación"
-- 5 puntos por pregunta × 30 preguntas = 150 pts totales

UPDATE challenges SET max_points = 150 WHERE name = 'Cuestionario de Iniciación';

-- ── BLOQUE 1: Introducción a la Ciberseguridad e Identidades Digitales ────────

INSERT INTO questions (challenge_id, text, points, display_order) VALUES
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), '¿Cuál es el objetivo principal de la ciberseguridad en nuestro día a día?', 5, 1),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), '¿Qué diferencia principalmente a un Hacker Ético de un Cibercriminal?', 5, 2),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), 'Si una empresa contrata a un experto para que intente "hackear" sus propios sistemas e informe dónde están los puntos débiles, ¿cómo se le conoce a esta actividad?', 5, 3),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), '¿Qué es "Kali Linux" en el mundo de la seguridad informática?', 5, 4),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), 'En el mundo del hacking, ¿cómo se le conoce a los atacantes maliciosos que violan la seguridad para beneficio personal, robar información o destruir sistemas?', 5, 5),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), 'Un hacker encuentra una falla de seguridad en la página web de un colegio. Sin pedir permiso, entra al sistema para demostrar que existe la falla, pero no altera nada ni roba datos, y luego le avisa al director. ¿A qué categoría pertenece?', 5, 6),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), '¿Cuál es una consecuencia legal o personal directa si un menor de edad comete un acto de cibercriminalidad (como tumbar la red del colegio o robar datos)?', 5, 7);

-- ── BLOQUE 2: Redes (IP, Puertos y Protocolos) ────────────────────────────────

INSERT INTO questions (challenge_id, text, points, display_order) VALUES
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), 'Si el internet fuera un sistema postal global, ¿qué analogía describe mejor lo que es una "Dirección IP"?', 5, 8),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), 'Si la dirección IP es como la dirección de un edificio de apartamentos, ¿qué vendrían siendo los "Puertos"?', 5, 9),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), 'En ciberseguridad, ¿por qué es importante realizar un "escaneo de puertos"?', 5, 10),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), '¿Cuál es la diferencia clave entre los protocolos de transporte TCP y UDP?', 5, 11),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), 'Si estás jugando un videojuego en línea en tiempo real o viendo un stream en vivo donde la velocidad es lo más importante, ¿qué protocolo es el más adecuado para esa transmisión?', 5, 12),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), 'Al descargar un archivo o una tarea escolar muy importante, necesitas que llegue 100% completo y sin errores. ¿Qué protocolo garantiza esto?', 5, 13);

-- ── BLOQUE 3: La Tríada CIA ───────────────────────────────────────────────────

INSERT INTO questions (challenge_id, text, points, display_order) VALUES
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), '¿Cuáles son los tres pilares fundamentales que componen la Tríada CIA en seguridad de la información?', 5, 14),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), 'Si un atacante logra entrar a la base de datos de un colegio y lee las notas privadas de los estudiantes sin autorización, ¿qué pilar de la Tríada CIA se rompió?', 5, 15),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), 'Un estudiante altera el sistema de asistencia para colocarse "Presente" en un día que faltó a clases. ¿Qué pilar de la Tríada CIA se vio afectado directamente?', 5, 16),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), 'Un grupo de cibercriminales satura la página web de un banco con millones de visitas falsas al mismo tiempo, provocando que los usuarios reales no puedan entrar a revisar sus cuentas. ¿Qué pilar fue atacado?', 5, 17);

-- ── BLOQUE 4: OWASP Top 10 ───────────────────────────────────────────────────

INSERT INTO questions (challenge_id, text, points, display_order) VALUES
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), '¿Qué es el "OWASP Top 10" en el contexto del desarrollo de software y la ciberseguridad?', 5, 18),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), 'Imagina que un formulario web (como el de "Buscar") permite que un atacante escriba código de programación malicioso en lugar de una palabra común, y el servidor ejecuta ese código dándole acceso a la base de datos. ¿Cómo se llama esta vulnerabilidad del OWASP Top 10?', 5, 19),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), 'Entras a una página web y notas que en la barra de direcciones dice http:// en lugar de https://, lo que significa que los datos que viajan entre tu computadora y la página no están encriptados y cualquiera en la red los podría leer. Según OWASP, esto se clasifica como:', 5, 20),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), 'Una página web permite que un usuario cree la contraseña 12345 o deje la contraseña por defecto admin. ¿Qué tipo de problema del OWASP Top 10 representa esto?', 5, 21);

-- ── BLOQUE 5: El Modelo OSI ──────────────────────────────────────────────────

INSERT INTO questions (challenge_id, text, points, display_order) VALUES
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), '¿Qué es el Modelo OSI en la informática y las redes?', 5, 22),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), '¿Cuántas capas componen conceptualmente el Modelo OSI?', 5, 23),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), 'Cuando estás chateando en una aplicación, escribiendo un correo o interactuando directamente con la interfaz visual de una página web, ¿en qué capa del modelo OSI te encuentras?', 5, 24),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), 'Si un cable de red de una computadora se rompe o se desconecta de la pared, ¿en qué capa del Modelo OSI está ocurriendo la falla?', 5, 25),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), 'Los "Routers" son los dispositivos encargados de decidir la mejor ruta para enviar los paquetes de datos utilizando las direcciones IP. ¿En qué capa del Modelo OSI trabajan principalmente?', 5, 26);

-- ── BLOQUE 6: Desafíos de Lógica, Conceptos Prácticos y Casos Reales ─────────

INSERT INTO questions (challenge_id, text, points, display_order) VALUES
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), 'Recibes un correo electrónico que dice ser de tu banco. Te advierte que tu cuenta será bloqueada si no haces clic en un enlace de inmediato y escribes tu contraseña. La dirección del remitente es seguridad@banc0-bvc.com (con un cero en lugar de una ''o''). ¿A qué tipo de ataque te estás enfrentando?', 5, 27),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), '¿Qué función cumple el "Hashing" o las funciones Hash (como SHA-256) en la ciberseguridad?', 5, 28),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), 'Si un ciberanalista quiere revisar detalladamente qué contiene una página web por dentro para buscar enlaces ocultos o comentarios sospechosos dejados por los programadores, ¿qué acción básica e introductoria debería realizar en su navegador?', 5, 29),
((SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación'), 'Un analista de seguridad ejecuta el comando ping 192.168.1.1 en su terminal. ¿Qué está intentando comprobar con esta acción?', 5, 30);


-- ══════════════════════════════════════════════════════════════════════════════
-- OPCIONES
-- ══════════════════════════════════════════════════════════════════════════════

-- Q1 — correcta: B
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 1), 'Hacer que el internet sea más rápido y los videojuegos no tengan lag.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 1), 'Proteger nuestros sistemas, redes y datos de accesos no autorizados o ataques digitales.', TRUE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 1), 'Crear virus informáticos para poner a prueba a las computadoras viejas.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 1), 'Aprender a adivinar las contraseñas de las redes sociales de otras personas.', FALSE, 'D');

-- Q2 — correcta: A
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 2), 'El hacker ético tiene autorización legal para buscar fallas y ayuda a repararlas; el cibercriminal lo hace sin permiso para dañar o robar.', TRUE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 2), 'El cibercriminal requiere autorización de un gobierno para operar.', FALSE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 2), 'Los hackers éticos solo tienen permitido trabajar dentro de bancos locales.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 2), 'El cibercriminal sabe programar y el hacker ético solo sabe usar programas ya hechos.', FALSE, 'D');

-- Q3 — correcta: C
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 3), 'Ciberespionaje industrial.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 3), 'Hacking de sombrero negro (Black Hat).', FALSE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 3), 'Pruebas de penetración o Hacking Ético.', TRUE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 3), 'Piratería digital de software.', FALSE, 'D');

-- Q4 — correcta: B
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 4), 'Un antivirus gratuito que se instala en celulares.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 4), 'Un sistema operativo basado en Linux diseñado especialmente para auditorías de seguridad y pruebas de penetración.', TRUE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 4), 'Un navegador web secreto que usan los cibercriminales para no dejar rastro.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 4), 'El nombre del primer virus informático de la historia.', FALSE, 'D');

-- Q5 — correcta: B
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 5), 'Hackers de Sombrero Blanco (White Hat).', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 5), 'Hackers de Sombrero Negro (Black Hat).', TRUE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 5), 'Hackers de Sombrero Gris (Grey Hat).', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 5), 'Analistas de Soporte Técnico.', FALSE, 'D');

-- Q6 — correcta: C
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 6), 'Sombrero Negro (Black Hat).', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 6), 'Sombrero Blanco (White Hat).', FALSE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 6), 'Sombrero Gris (Grey Hat).', TRUE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 6), 'Ciberterrorista.', FALSE, 'D');

-- Q7 — correcta: B
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 7), 'No pasa nada porque las leyes de internet no aplican a menores de edad.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 7), 'Puede enfrentar procesos judiciales juveniles, multas económicas familiares y antecedentes penales que afecten su futuro profesional.', TRUE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 7), 'El único castigo es que la empresa de internet le reduzca la velocidad de navegación por una semana.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 7), 'Se le premia dándole una beca automática en ingeniería de sistemas.', FALSE, 'D');

-- Q8 — correcta: C
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 8), 'El nombre completo del dueño del dispositivo.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 8), 'La velocidad a la que viaja el paquete de datos.', FALSE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 8), 'La dirección física o número único de casa que permite localizar un dispositivo en la red.', TRUE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 8), 'El candado de seguridad que cierra la caja del paquete.', FALSE, 'D');

-- Q9 — correcta: B
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 9), 'Las ventanas por donde se puede mirar hacia la calle.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 9), 'Los números de apartamento específicos que permiten que cada servicio (como web, juegos o correo) reciba sus propios datos.', TRUE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 9), 'Los cables de energía conectados al edificio.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 9), 'El tamaño total de la memoria del computador.', FALSE, 'D');

-- Q10 — correcta: B
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 10), 'Para borrar el historial de navegación de la computadora.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 10), 'Para descubrir qué canales o servicios están abiertos (activos) y evaluar si tienen vulnerabilidades.', TRUE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 10), 'Para aumentar los megas de descarga del internet del colegio.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 10), 'Para cambiar la contraseña del router de la casa de forma remota.', FALSE, 'D');

-- Q11 — correcta: B
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 11), 'TCP es exclusivo para celulares y UDP es exclusivo para computadoras.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 11), 'TCP es seguro porque confirma que todos los datos lleguen completos y en orden; UDP los envía rápido sin verificar si se perdieron en el camino.', TRUE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 11), 'UDP encripta los datos con claves militares y TCP los envía en texto plano.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 11), 'TCP solo sirve para descargar imágenes y UDP solo sirve para enviar correos.', FALSE, 'D');

-- Q12 — correcta: B
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 12), 'TCP', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 12), 'UDP', TRUE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 12), 'HTTP', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 12), 'SSH', FALSE, 'D');

-- Q13 — correcta: C
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 13), 'UDP', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 13), 'TFTP', FALSE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 13), 'TCP', TRUE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 13), 'Bluetooth', FALSE, 'D');

-- Q14 — correcta: C
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 14), 'Computación, Internet y Almacenamiento.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 14), 'Control, Inteligencia y Autenticación.', FALSE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 14), 'Confidencialidad, Integridad y Disponibilidad.', TRUE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 14), 'Conectividad, Identidad y Actualización.', FALSE, 'D');

-- Q15 — correcta: B
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 15), 'Disponibilidad, porque el colegio ya no puede usar sus computadoras.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 15), 'Confidencialidad, porque la información privada fue expuesta a alguien no autorizado.', TRUE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 15), 'Integridad, porque el archivo cambió de tamaño.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 15), 'Autenticidad, porque las notas desaparecieron del sistema.', FALSE, 'D');

-- Q16 — correcta: C
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 16), 'Confidencialidad, porque ahora todos saben que faltó.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 16), 'Disponibilidad, porque el sistema se cayó durante la modificación.', FALSE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 16), 'Integridad, porque la información real fue modificada y alterada de forma maliciosa.', TRUE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 16), 'Velocidad, porque el sistema se puso lento al procesar el cambio.', FALSE, 'D');

-- Q17 — correcta: B
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 17), 'Confidencialidad', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 17), 'Disponibilidad', TRUE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 17), 'Integridad', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 17), 'Encriptación', FALSE, 'D');

-- Q18 — correcta: B
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 18), 'Una lista de los 10 mejores hackers del mundo en este año.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 18), 'Un documento que recopila los 10 riesgos y vulnerabilidades de seguridad más críticos y comunes en aplicaciones web.', TRUE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 18), 'Las 10 contraseñas más difíciles de adivinar por una computadora.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 18), 'Las 10 páginas web más visitadas y seguras de todo internet.', FALSE, 'D');

-- Q19 — correcta: A
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 19), 'Inyección (ej. SQL Injection)', TRUE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 19), 'Desbordamiento de memoria física.', FALSE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 19), 'Descarga de virus involuntaria.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 19), 'Suplantación de identidad física.', FALSE, 'D');

-- Q20 — correcta: B
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 20), 'Fallas de Inyección.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 20), 'Falla Criptográfica / Exposición de Datos Sensibles.', TRUE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 20), 'Diseño Inseguro de Pantalla.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 20), 'Software desactualizado.', FALSE, 'D');

-- Q21 — correcta: A
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 21), 'Configuración de Seguridad Incorrecta / Autenticación Débil.', TRUE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 21), 'Inyección de código HTML.', FALSE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 21), 'Pérdida de control del hardware.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 21), 'Actualización automática fallida.', FALSE, 'D');

-- Q22 — correcta: B
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 22), 'Un tipo de cable de fibra óptica de alta velocidad.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 22), 'Un modelo conceptual de 7 capas que describe cómo se comunican los sistemas a través de una red.', TRUE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 22), 'Un software para detectar intrusos en tiempo real.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 22), 'Un protocolo exclusivo para conectar dispositivos vía satélite.', FALSE, 'D');

-- Q23 — correcta: C
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 23), '3 capas', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 23), '5 capas', FALSE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 23), '7 capas', TRUE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 23), '10 capas', FALSE, 'D');

-- Q24 — correcta: D
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 24), 'Capa 1: Física', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 24), 'Capa 3: Red', FALSE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 24), 'Capa 4: Transporte', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 24), 'Capa 7: Aplicación', TRUE, 'D');

-- Q25 — correcta: B
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 25), 'Capa 7: Aplicación', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 25), 'Capa 1: Física', TRUE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 25), 'Capa 4: Transporte', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 25), 'Capa 3: Red', FALSE, 'D');

-- Q26 — correcta: B
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 26), 'Capa 2: Enlace de datos', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 26), 'Capa 3: Red', TRUE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 26), 'Capa 5: Sesión', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 26), 'Capa 6: Presentación', FALSE, 'D');

-- Q27 — correcta: B
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 27), 'Un ataque de fuerza bruta a tu Wi-Fi.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 27), 'Phishing (Suplantación de identidad).', TRUE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 27), 'Inyección de código SQL en tu correo.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 27), 'Un virus que borra el disco duro.', FALSE, 'D');

-- Q28 — correcta: B
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 28), 'Comprimir una película para que ocupe menos espacio.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 28), 'Convertir un texto o archivo en una cadena de caracteres única y fija para verificar que los datos no hayan sido alterados (Integridad).', TRUE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 28), 'Aumentar la señal de las antenas de Wi-Fi del laboratorio.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 28), 'Apagar servidores de forma remota en caso de emergencia.', FALSE, 'D');

-- Q29 — correcta: B
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 29), 'Formatear la computadora de inmediato.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 29), 'Dar clic derecho e "Inspeccionar código fuente" (Ver código fuente de la página).', TRUE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 29), 'Cambiar la dirección IP de su máquina a modo privado.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 29), 'Borrar todas las cookies y cerrar el navegador.', FALSE, 'D');

-- Q30 — correcta: B
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 30), 'Si la computadora de destino tiene un virus activo.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 30), 'Si existe conectividad básica y el dispositivo con esa dirección IP responde en la red.', TRUE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 30), 'Cambiar el nombre de usuario administrador del sistema.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Cuestionario de Iniciación') AND display_order = 30), 'Descargar la última actualización de Kali Linux.', FALSE, 'D');
