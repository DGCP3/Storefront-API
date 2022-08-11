# Storefront API

This is a REST API that is used to power [e-commerce](#api-reference) storefront UI.

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

# Run Locally

Clone the project

```bash
  git clone https://github.com/DGCP3/Storefront-API.git
```

Docker-compose

```bash
  docker-compose up
```

Go to the project directory

```bash
  cd Storefront-API
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Start server in production mode

```bash
  npm run build
```

```bash
  npm run start
```

# Tech Stack

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [pg-node](https://www.npmjs.com/package/pg)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [zod](https://www.npmjs.com/package/zod)
- [supertest](https://www.npmjs.com/package/supertest)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- [typescript](https://www.typescriptlang.org/)
- [jest](https://jestjs.io/)
- [ts-jest](https://www.npmjs.com/package/ts-jest)

# Authors

- [@DGCP3](https://www.github.com/DGCP3)
