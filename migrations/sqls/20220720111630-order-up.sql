CREATE TABLE
    IF NOT EXISTS orders (
        id_PK uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id_FK INT REFERENCES users(id_PK),
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    IF NOT EXISTS order_items (
        id_PK uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        order_id_FK uuid REFERENCES orders(id_PK),
        product_id_FK uuid REFERENCES products(id_PK),
        quantity integer NOT NULL,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    );