-- Tabla de preguntas
CREATE TABLE questions (
    id            BIGSERIAL PRIMARY KEY,
    challenge_id  BIGINT  NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    text          TEXT    NOT NULL,
    points        INTEGER NOT NULL,
    display_order INTEGER NOT NULL
);

-- Tabla de opciones de respuesta
CREATE TABLE options (
    id          BIGSERIAL PRIMARY KEY,
    question_id BIGINT       NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    text        TEXT         NOT NULL,
    correct     BOOLEAN      NOT NULL DEFAULT FALSE,
    label       VARCHAR(1)
);
