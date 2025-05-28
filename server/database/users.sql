-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL,
    fullname TEXT NOT NULL,
    grade INTEGER NOT NULL,
    friends UUID[] DEFAULT '{}'
);

ALTER TABLE  users ADD avatar TEXT DEFAULT '';

SELECT * FROM users

