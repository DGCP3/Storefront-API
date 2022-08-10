CREATE VIEW order_details_view as select
    order_item_id_pk as "item_number",
    order_id_fk as "order_id",
    order_status as "order_status",
    product_name,
    product_price,
    user_id_fk as "user_id",
    quantity
from products 
    inner join order_products on products.product_id_pk = order_products.product_id_fk
    inner join orders on order_products.order_id_fk = orders.order_id_pk
    inner join users on orders.user_id_fk = users.user_id_pk
