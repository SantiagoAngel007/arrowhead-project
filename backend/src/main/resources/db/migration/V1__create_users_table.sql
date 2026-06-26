-- Tabla de usuarios
CREATE TABLE users (
    id         BIGSERIAL PRIMARY KEY,
    alias      VARCHAR(50)  NOT NULL UNIQUE,
    email      VARCHAR(255) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    role       VARCHAR(20)  NOT NULL CHECK (role IN ('PLAYER', 'ADMIN')),
    active     BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- Usuario admin por defecto (password: admin123 con BCrypt)
INSERT INTO users (alias, email, password, role, active)
VALUES ('admin_icesi', 'admin@icesi.edu.co',
        '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBpwTTyU0DmLuO',
        'ADMIN', TRUE);
