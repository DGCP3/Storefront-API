CREATE TABLE
    if not exists products (
        product_id_pk SERIAL PRIMARY KEY,
        product_name varchar(255) NOT NULL,
        product_desc TEXT,
        product_price decimal(10, 2) NOT NULL
    );

INSERT INTO
    products (
        product_name,
        product_desc,
        product_price
    )
VALUES (
        'Product 1',
        'Description 1',
        10.00
    );