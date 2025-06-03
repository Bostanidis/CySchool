-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL,
    fullname TEXT NOT NULL,
    grade INTEGER NOT NULL,
    friends UUID[] DEFAULT '{}',
    avatar TEXT DEFAULT '',
    school INTEGER,
    isOnline BOOLEAN DEFAULT false
);

-- ALTER TABLE users ADD COLUMN isOnline BOOLEAN DEFAULT false;

-- TRUNCATE users;

SELECT * FROM users

