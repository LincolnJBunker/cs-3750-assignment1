CREATE TABLE IF NOT EXISTS users (
  id          SERIAL PRIMARY KEY,
  email       TEXT        NOT NULL UNIQUE,
  password    TEXT        NOT NULL,
  first_name  TEXT        NOT NULL,
  last_name   TEXT        NOT NULL,
  birthdate   DATE        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
