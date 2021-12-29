# Deposit

Deposits amount into recipient's account

**URL** : `/api/transactions/deposit`
**Method** : `POST`
**Auth required** : NO

**Request Data constraints**

```json
{
    "amount": "[number]",
    "recipient_id": "[recipients id]",
    "type":"[deposit]"
}
```

**Request Data Example**

```json
{
    "amount": "50",
    "recipient_id": "61cce30838da0c4b97579ff0",
    "type" : "deposit"
}
```

## Success Response

**Code** : `201`

**Content example**
```json
{
    "message": "deposit created",
    "data": {
        "amount": "50",
        "recipient_id": "61cce30838da0c4b97579ff0",
        "type": "deposit",
        "transaction_id": "61cce39e80ca709023f9e686"
    }
}
```

# Withdraw

withdraws amount from sender's account

**URL** : `/api/transactions/withdraw`
**Method** : `POST`
**Auth required** : YES
    Header - Authorization - [token from register or login]

**Request Data constraints**

```json
{
    "amount": "[number]",
    "sender_id": "[sender id]",
    "type":"[withdraw]"
}
```

**Request Data Example**

```json
{
    "amount": "30",
    "sender_id": "61cce30838da0c4b97579ff0",
    "type":"withdraw"
}
```

## Success Response

**Code** : `201`

**Content example**
```json
{
    "message": "withdraw created",
    "data": {
        "amount": "-30",
        "sender_id": "61cce30838da0c4b97579ff0",
        "type": "withdraw",
        "transaction_id": "61cce4c0ca61453871df9a27"
    }
}
```


# Transfer

transfers amount from sender's account to recipient's account

**URL** : `/api/transactions/transfer`
**Method** : `POST`
**Auth required** : YES
    Header - Authorization - [token from register or login]

**Request Data constraints**

```json
{
    "amount": "[number]",
    "sender_id": "[sender's id]",
    "recipient_id":"[recipient's id]",
    "type":"transfer"
}
```

**Request Data Example**

```json
{
    "amount": "20",
    "sender_id": "61cce30838da0c4b97579ff0",
    "recipient_id":"61cce30838da0c4b97579ff0",
    "type":"transfer"
}
```

## Success Response

**Code** : `201`

**Content example**
```json
{
    "message": "transfer created",
    "data": {
        "amount": "5",
        "sender_id": "61cce30838da0c4b97579ff0",
        "recipient_id": "61cce63356eb0687e6ba854a",
        "type": "transfer",
        "transaction_id": "61cce678bbd837f2bba53bb2"
    }
}
```
