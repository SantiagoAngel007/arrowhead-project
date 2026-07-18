-- Los retos que se completan enviando una flag (además de/en vez de preguntas)
-- guardan aquí el valor esperado. NULL significa que el reto no usa flag.
ALTER TABLE challenges ADD COLUMN flag VARCHAR(255);

-- Reto "Análisis de Tráfico": 15 pts por encontrar la flag + 5 pts por las
-- preguntas de comprensión (1 pt c/u) = 20 pts máximo.
UPDATE challenges
SET max_points = 20,
    flag = 'ARROWHEAD{packet_sniffer}'
WHERE name = 'Análisis de Tráfico';
