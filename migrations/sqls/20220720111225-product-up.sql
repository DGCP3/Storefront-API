CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE
    if not exists products (
        id_PK uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        name varchar(255) NOT NULL,
        description varchar(255) NOT NULL,
        price decimal(10, 2) NOT NULL,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    );