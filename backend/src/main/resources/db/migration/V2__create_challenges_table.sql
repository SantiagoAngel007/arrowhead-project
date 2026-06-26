-- Tabla de retos
CREATE TABLE challenges (
    id            BIGSERIAL PRIMARY KEY,
    name          VARCHAR(255) NOT NULL,
    description   TEXT,
    level         VARCHAR(20)  NOT NULL CHECK (level IN ('INICIACION', 'EXPLORACION', 'DESAFIO')),
    status        VARCHAR(20)  NOT NULL DEFAULT 'ENABLED' CHECK (status IN ('ENABLED', 'DISABLED')),
    max_points    INTEGER      NOT NULL,
    display_order INTEGER      NOT NULL
);

-- Retos iniciales del CTF
INSERT INTO challenges (name, description, level, status, max_points, display_order) VALUES
('Cuestionario de Iniciación', 'Preguntas de fundamentos de ciberseguridad', 'INICIACION',  'ENABLED', 200, 1),
('Análisis de Tráfico',        'Análisis de paquetes de red con Wireshark',   'EXPLORACION', 'ENABLED', 280, 2),
('Defensa y Ataque Activa',    'Reto de hacking ético en entorno controlado', 'DESAFIO',     'ENABLED', 350, 3);
