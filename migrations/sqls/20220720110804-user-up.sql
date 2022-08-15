CREATE TABLE
    IF NOT EXISTS users (
        user_id_pk SERIAL PRIMARY KEY,
        user_name VARCHAR NOT NULL,
        user_email VARCHAR UNIQUE NOT NULL,
        user_password VARCHAR NOT NULL
    );

INSERT INTO
    users (user_name, user_email, user_password)
VALUES ('john doe','test@test.com','$2a$12$wVh3yznV.AqL8bIU0BVGHu/9Ot07KmGJWOJ9LWiJG2bMkrr4mwlEy');