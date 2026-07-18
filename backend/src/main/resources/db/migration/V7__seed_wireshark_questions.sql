-- Preguntas de opción múltiple del reto "Análisis de Tráfico" (Wireshark simulado).
-- Cada pregunta vale 1 punto; 5 preguntas = 5 pts (los otros 15 pts del reto
-- se obtienen enviando la flag correcta, ver V6).

INSERT INTO questions (challenge_id, text, points, display_order) VALUES
((SELECT id FROM challenges WHERE name = 'Análisis de Tráfico'),
 '¿Por qué fue posible leer el contenido del campo "Valor cifrado" del paquete 8 simplemente decodificándolo en Base64, sin necesidad de ninguna clave?',
 1, 1),
((SELECT id FROM challenges WHERE name = 'Análisis de Tráfico'),
 '¿Qué característica del protocolo Telnet, visible en los paquetes 5 a 8, permite que el usuario y la contraseña viajen "a la vista" en la red?',
 1, 2),
((SELECT id FROM challenges WHERE name = 'Análisis de Tráfico'),
 'El paquete 10 (HTTP) usa "Authorization: Basic ..." en lugar de Telnet. ¿Por qué presenta el mismo riesgo de seguridad aunque el protocolo sea distinto?',
 1, 3),
((SELECT id FROM challenges WHERE name = 'Análisis de Tráfico'),
 '¿Qué medida de seguridad, si se hubiera aplicado en esta red, habría evitado que la contraseña fuera legible en la captura?',
 1, 4),
((SELECT id FROM challenges WHERE name = 'Análisis de Tráfico'),
 '¿Cuál es la diferencia clave entre "codificar" (como Base64) y "cifrar" (como AES o TLS) una contraseña?',
 1, 5);

-- Pregunta 1 — opción correcta: B
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Análisis de Tráfico') AND display_order = 1),
 'Porque el atacante ya conocía la contraseña de antemano.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Análisis de Tráfico') AND display_order = 1),
 'Porque Base64 es una codificación reversible, no un algoritmo de cifrado, y no requiere ninguna clave para revertirse.', TRUE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Análisis de Tráfico') AND display_order = 1),
 'Porque Base64 es un cifrado débil que se puede romper por fuerza bruta en segundos.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Análisis de Tráfico') AND display_order = 1),
 'Porque el servidor envió la clave de descifrado en un paquete anterior.', FALSE, 'D');

-- Pregunta 2 — opción correcta: A
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Análisis de Tráfico') AND display_order = 2),
 'Telnet transmite todos sus datos en texto plano, sin cifrado de transporte como TLS o SSH.', TRUE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Análisis de Tráfico') AND display_order = 2),
 'Telnet cifra los datos, pero usa una clave pública conocida por todos.', FALSE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Análisis de Tráfico') AND display_order = 2),
 'Telnet comprime los datos, lo que los hace parecer ilegibles pero no los protege.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Análisis de Tráfico') AND display_order = 2),
 'Telnet solo transmite el nombre de usuario, nunca la contraseña.', FALSE, 'D');

-- Pregunta 3 — opción correcta: C
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Análisis de Tráfico') AND display_order = 3),
 'Porque HTTP Basic Auth usa el mismo puerto que Telnet.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Análisis de Tráfico') AND display_order = 3),
 'Porque HTTP Basic Auth cifra las credenciales con el mismo algoritmo que Telnet.', FALSE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Análisis de Tráfico') AND display_order = 3),
 'Porque HTTP Basic Auth también solo aplica Base64 al usuario y contraseña, sin cifrado real, si la conexión no usa HTTPS.', TRUE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Análisis de Tráfico') AND display_order = 3),
 'Porque el navegador guarda la contraseña en texto plano en una cookie.', FALSE, 'D');

-- Pregunta 4 — opción correcta: A
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Análisis de Tráfico') AND display_order = 4),
 'Usar protocolos cifrados como SSH en vez de Telnet, y HTTPS en vez de HTTP, para que el tráfico viaje cifrado de extremo a extremo.', TRUE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Análisis de Tráfico') AND display_order = 4),
 'Usar contraseñas más largas y complejas.', FALSE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Análisis de Tráfico') AND display_order = 4),
 'Cambiar el puerto del servicio Telnet a uno no estándar.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Análisis de Tráfico') AND display_order = 4),
 'Desactivar el protocolo ARP en la red.', FALSE, 'D');

-- Pregunta 5 — opción correcta: D
INSERT INTO options (question_id, text, correct, label) VALUES
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Análisis de Tráfico') AND display_order = 5),
 'Codificar y cifrar son términos distintos para el mismo proceso matemático.', FALSE, 'A'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Análisis de Tráfico') AND display_order = 5),
 'Cifrar siempre usa texto en Base64, mientras que codificar usa hexadecimal.', FALSE, 'B'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Análisis de Tráfico') AND display_order = 5),
 'Codificar es más seguro que cifrar porque es más difícil de reconocer a simple vista.', FALSE, 'C'),
((SELECT id FROM questions WHERE challenge_id = (SELECT id FROM challenges WHERE name = 'Análisis de Tráfico') AND display_order = 5),
 'Codificar es reversible sin necesidad de una clave secreta; cifrar requiere una clave secreta para poder revertirse.', TRUE, 'D');
