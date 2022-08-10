CREATE TABLE
    IF NOT EXISTS users (
        user_id_pk SERIAL PRIMARY KEY,
        user_name VARCHAR NOT NULL,
        user_email VARCHAR UNIQUE NOT NULL,
        user_password VARCHAR NOT NULL
    );

INSERT INTO
    users (user_name, user_email, user_password)
VALUES (
        'user1',
        'test@test.com',
        '$2a$12$UJNV3dY1EYTBovXrSjbEtO8AF3iPJ5u4QKLu6P8VHdM2eZb5XpGiK'
    );