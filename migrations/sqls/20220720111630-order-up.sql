CREATE TYPE
    order_status AS ENUM(
        'open',
        'processing',
        'completed',
        'cancelled'
    );

CREATE TABLE IF NOT EXISTS orders (
        order_id_pk SERIAL PRIMARY KEY,
        order_status order_status NOT NULL DEFAULT 'open',
        user_id_fk BIGINT REFERENCES users(user_id_pk) ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS order_products (
        order_item_id_pk SERIAL PRIMARY KEY,
        quantity INTEGER NOT NULL,
        order_id_fk BIGINT REFERENCES orders(order_id_pk) ON DELETE CASCADE ,
        product_id_fk BIGINT REFERENCES products(product_id_pk)
    );
