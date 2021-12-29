# Register

Registers user
Returns token used for Authorization

**URL** : `/api/register/`
**Method** : `POST`
**Auth required** : NO

**Request Data constraints**

```json
{
    "email": "[unique valid email address]",
    "password": "[password in plain text]",
    "full_name": "[names separated by space"
}
```

**Request Data Example**

```json
{
    "username": "iloveauth@example.com",
    "password": "abcd1234",
    "full_name": "Bell Omuboye"
}
```

## Success Response

**Code** : `201`

**Content example**
```json
{
    "message": "user created",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjFiOWMxMGY2YzMyMjVkMjQzYzZjZjFkIiwiaWF0IjoxNjM5NTYzNTM1LCJleHAiOjE2Mzk1NjQxMzV9.T8pdwtR-L4IU7GjJsWmZtP0gz3S3wFQ46l2DQfju-CE",
        "user_id": "61b9c10f6c3225d243c6cf1d",
        "email": "testing1@gmail.com",
        "full_name": "Testing First"
    }
}
```

## Error Response

**Condition** : If 'email' already exists
**Code** : `500`
**Content** :
```json
{
    "name": "ServiceError",
    "error": true,
    "message": "email already exists",
    "statusCode": 500,
}
```


# Login

Logs in user

**URL** : `/api/auth/login`
**Method** : `POST`
**Auth required** : NO

**Request Data constraints**

```json
{
    "email": "[unique valid email address]",
    "password": "[password in plain text]",
```

**Request Data Example**

```json
{
    "username": "iloveauth@example.com",
    "password": "abcd1234",
}
```

## Success Response

**Code** : `200`
**Content example**
```json
{
    "message": "user logged in",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjFjY2Q3ODA1ZjQxMTE0ZDk2NmI5ZmQ0IiwiaWF0IjoxNjQwODE2NDg1LCJleHAiOjE2NDA4MTcwODV9.joA9z5I0WgDSj3YR0qdwrA5U2Gimk1j6rjijIqa6ltY",
        "user_id": "61ccd7805f41114d966b9fd4",
        "email": "testin1@gmail.com",
        "full_name": "Testing First",
        "role": "user"
    }
}
```

## Error Response

**Condition** : If 'email' or 'password' is wrong
**Code** : `401`
**Content** :
```json
{
    "name": "AuthorizationError",
    "error": true,
    "message": "invalid email or password",
    "statusCode": 401
}
```