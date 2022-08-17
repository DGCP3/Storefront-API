REQUIREMENT

# API Reference

## **Auth routes**

**Login**

```http
  POST /api/login
```

| Parameter  | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `email`    | `string` | **Required**. valid user email |
| `password` | `string` | **Required**. user password    |

**Logout**

```http
  GET /api/logout
```

**Register**

```http
  POST /api/register
```

| Parameter  | Type     | Description                                                                                                                     |
| :--------- | :------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `fullname` | `string` | **Required**.                                                                                                                   |
| `email`    | `string` | **Required**. valid email                                                                                                       |
| `password` | `string` | **Required**. Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character. |

## **User Routes**

**authentication token(cookie)** is required for all user routes

## User order route

_GET_ all order details

```http
  GET /api/users/orders
```

_GET_ a single order details

```http
  GET /api/users/orders/${orderID}
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `orderID` | `number` | **Required**. |

_GET_ products details in a single order

```http
  GET /api/users/orders/${orderID}/products
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `orderID` | `number` | **Required**. |

## User cart route

**_get_** get detail about a single cart

```http
  GET /api/users/cart
```

**_add_** a product to cart

```http
  POST /api/users/cart
```

| Parameter   | Type     | Description   |
| :---------- | :------- | :------------ |
| `productId` | `number` | **Required**. |
| `quantity`  | `number` | **Required**. |

_delete_ a product from cart

```http
  DELETE /api/users/cart
```

| Parameter   | Type     | Description   |
| :---------- | :------- | :------------ |
| `productId` | `number` | **Required**. |

_update_ a product in cart

```http
  patch /api/users/cart
```

## **Product Route**

_GET_ all products

```http
  GET /api/products
```

_GET_ a single product

```http
  GET /api/products/${productId}
```

| Parameter   | Type     | Description   |
| :---------- | :------- | :------------ |
| `productId` | `number` | **Required**. |

_DELETE_ a product by id

```http
  DELETE /api/products/${productId}
```

| Parameter   | Type     | Description   |
| :---------- | :------- | :------------ |
| `productId` | `number` | **Required**. |

_UPDATE_ a product by id

```http
  PATCH /api/products/${productId}
```

| Parameter   | Type     | Description   |
| :---------- | :------- | :------------ |
| `productId` | `number` | **Required**. |

_CREATE_ a new product

```http
  POST /api/products
```

| Parameter   | Type     | Description   |
| :---------- | :------- | :------------ |
| `productId` | `number` | **Required**. |

## Order Route

_GET_ all orders

```http
  GET /api/orders
```

_GET_ a single order

```http
  GET /api/orders/${orderId}
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `orderId` | `number` | **Required**. |

[![Run in Postman](https://run.pstmn.io/button.svg)](#)

# Dashboard Schema

![database schema](https://i.imgur.com/1GRGLec.png)

# Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`POSTGRES_URL`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_PORT`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `JWT_COOKIE_EXPIRES_IN`, `NODE_ENV`, `PORT`
