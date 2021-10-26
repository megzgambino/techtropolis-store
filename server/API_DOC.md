# Techtropolis

## Users​

List of available endpoints:
​

-   `POST /register`
-   `POST /login`

### POST /register

Request:

-   data:

```json
{
    "full_name": "Tom Brady",
    "email": "tombradyisold@mail.com",
    "password": "1234567890"
}
```

Response:

-   status: 201
-   body:

```json
{
    "id": 8,
    "full_name": "Tom Brady",
    "email": "tombradyisold@mail.com"
}
```

-   status: 500
-   body:
    ​

```json
{
    "errors": "Internal Server Error"
}
```

-   status: 400
-   body:
    ​

```json
{
    "errors": "Validation Error"
}
```

### POST /login

Request:

-   data:

```json
{
    "email": "user1@mail.com",
    "password": "12345678"
}
```

Response:

-   status: 200
-   body:
    ​

```json
{
    "id": 1,
    "username": "Ted Mosby",
    "email": "user1@mail.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMxMjUzMjYwfQ.jDvducDr5A43oP5uuT4p-ZGRJpl8qhftkUefXogFxJ4"
}
```

-   status: 500
-   body:
    ​

```json
{
    "errors": "Internal Server Error"
}
```

-   status: 400
-   body:
    ​

```json
{
    "errors": "Validation Error"
}
```

## Products

List of available endpoints:
​

-   `GET /products`
-   `POST /products`
-   `GET /products/:id`
-   `PUT /products/:id`
-   `PATCH /products/:id`
-   `DELETE /products/:id`

### GET /products

Request:

Response:

-   status: 200
-   body:
    ​

```json
[
    {
        "id": 1,
        "name": "KBDFans kbd67 lite",
        "image_url": "https://i.ytimg.com/vi/QosGGSoY58U/maxresdefault.jpg",
        "price": 1500000,
        "quantity": 3,
        "UserId": 2,
        "createdAt": "2021-09-10T04:27:26.382Z",
        "updatedAt": "2021-09-10T04:27:26.382Z"
    },
    {
        "id": 2,
        "name": "Samsung Monitor 24 inch",
        "image_url": "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/11/23/2d514e24-b438-4068-bcc3-2bb3f5c39011.jpg",
        "price": 2300000,
        "quantity": 3,
        "UserId": 2,
        "createdAt": "2021-09-10T04:27:26.382Z",
        "updatedAt": "2021-09-10T04:27:26.382Z"
    },
    {
        "id": 3,
        "name": "Razer DeathAdder",
        "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2721271/razer_razer-deathadder-essential-gaming-mouse--6400-dpi-_full05.jpg",
        "price": 1500000,
        "quantity": 3,
        "UserId": 2,
        "createdAt": "2021-09-10T04:27:26.382Z",
        "updatedAt": "2021-09-10T04:27:26.382Z"
    }
]
```

-   status: 500
-   body:
    ​

```json
{
    "errors": "Internal Server Error"
}
```

-   status: 400
-   body:
    ​

```json
{
    "errors": "Validation Error"
}
```

### POST /products

Request:

-   data:

```json
{
    "name": "Razer DeathAdder",
    "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2721271/razer_razer-deathadder-essential-gaming-mouse--6400-dpi-_full05.jpg",
    "price": 1500000,
    "quantity": 3
}
```

Response:

-   status: 200
-   body:
    ​

```json
{
    "id": 8,
    "name": "Razer DeathAdder",
    "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2721271/razer_razer-deathadder-essential-gaming-mouse--6400-dpi-_full05.jpg",
    "price": 1500000,
    "quantity": 3,
    "updatedAt": "2021-10-20T16:23:01.191Z",
    "createdAt": "2021-10-20T16:23:01.191Z"
}
```

-   status: 500
-   body:
    ​

```json
{
    "errors": "Internal Server Error"
}
```

-   status: 400
-   body:
    ​

```json
{
    "errors": "Validation Error"
}
```

### DELETE /products/:id

Response:

-   status: 200
-   body:
    ​

```json
{
    "message": "product has been deleted!"
}
```

-   status: 500
-   body:
    ​

```json
{
    "errors": "Internal Server Error"
}
```

-   status: 400
-   body:
    ​

```json
{
    "errors": "Validation Error"
}
```
