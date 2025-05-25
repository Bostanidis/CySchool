CREATE TABLE IF NOT EXISTS users (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL,
    fullname TEXT NOT NULL,
    grade INTEGER NOT NULL 
);

INSERT INTO users (username, fullname, grade)
VALUES ('AlexSigma', 'Alexandros Sigma', 10);

SELECT * FROM users;