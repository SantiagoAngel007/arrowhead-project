-- Registra qué pregunta respondió cada usuario y con qué opción, para evitar
-- que reintentar una pregunta ya acertada vuelva a sumar puntos al reto.
CREATE TABLE user_answers (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT    NOT NULL REFERENCES users(id)     ON DELETE CASCADE,
    question_id BIGINT    NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    option_id   BIGINT    NOT NULL REFERENCES options(id)   ON DELETE CASCADE,
    correct     BOOLEAN   NOT NULL,
    answered_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_user_question UNIQUE (user_id, question_id)
);

CREATE INDEX idx_user_answers_user_id ON user_answers(user_id);
