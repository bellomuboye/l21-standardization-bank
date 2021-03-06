# Bell Omuboye
# Learnable 21 Standardization

## Authentication Endpoints

* [Register](docs/auth.md) : `POST /api/auth/register`
* [Login](docs/auth.md) : `POST /api/auth/login`

## User Endpoints
* [Add user](docs/user.md) : `POST /api/users` [ADMIN]
* [View user](docs/user.md) : `GET /api/users/:user_id`
* [View all users](docs/user.md) : `GET api/users` [ADMIN]
* [Delete user](docs/user.md) : `DELETE api/users/:user_id` [ADMIN]
* [Enable user](docs/user.md) : `PUT api/users/:user_id/enable`[ADMIN]
* [Disable user](docs/user.md) : `PUT api/users/:user_id/disable` [ADMIN]

## Transactions Endpoints
* [Deposit](docs/transaction.md) : `POST api/transactions/deposit`
* [Withdraw](docs/transaction.md) : `POST api/transactions/withdraw`
* [Transfer](docs/transaction.md) : `POST api/transactions/transfer`
* [View a user's transactions](docs/transaction.md) : `GET api/transactions/:user_id`
* [View aLL transaction](docs/transaction.md) : `GET /api/transactions` [ADMIN]
* [View a transaction details](docs/transaction.md) : `GET /api/transactions/transaction_id`
* [Reverse Transaction](docs/transaction.md) : `DELETE /api/transactions/:transaction_id/reverse`