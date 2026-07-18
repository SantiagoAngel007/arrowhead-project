-- El registro de jugadores ahora se hace con alias + código de acceso de evento,
-- ya no con email, así que la columna deja de ser obligatoria.
ALTER TABLE users ALTER COLUMN email DROP NOT NULL;
