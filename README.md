# API Reference

## **Auth routes**

Login

```http
  POST /api/login
```

| Parameter  | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `email`    | `string` | **Required**. valid user email |
| `password` | `string` | **Required**. user password    |

Logout

```http
  GET /api/logout
```

_create_ user account

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

## order

**_get_** all order details

```http
  GET /api/users/orders
```

**_get_** a single order details

```http
  GET /api/users/orders/${orderID}
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `orderID` | `number` | **Required**. |

**_get_** products details in a single order

```http
  GET /api/users/orders/${orderID}/products
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `orderID` | `number` | **Required**. |

## Cart

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
