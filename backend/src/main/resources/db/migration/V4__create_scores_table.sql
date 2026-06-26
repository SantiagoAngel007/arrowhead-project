-- Tabla de puntuaciones (un registro por usuario por reto)
CREATE TABLE scores (
    id           BIGSERIAL PRIMARY KEY,
    user_id      BIGINT  NOT NULL REFERENCES users(id)      ON DELETE CASCADE,
    challenge_id BIGINT  NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    points       INTEGER NOT NULL DEFAULT 0,
    attempts     INTEGER NOT NULL DEFAULT 0,
    completed    BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at TIMESTAMP,
    CONSTRAINT uq_user_challenge UNIQUE (user_id, challenge_id)
);

-- Índice para acelerar las queries del ranking
CREATE INDEX idx_scores_user_id      ON scores(user_id);
CREATE INDEX idx_scores_challenge_id ON scores(challenge_id);
CREATE INDEX idx_scores_completed    ON scores(completed);
