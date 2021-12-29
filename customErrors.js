class ValidationError extends Error {
    constructor(message, data) {
        super();
        this.name = this.constructor.name

        this.error = true
        this.message = message,
        this.data = data
        this.statusCode = 400
    }
}

class AuthorizationError extends Error {
    constructor(message, data, statusCode) {
        super()
        this.name = this.constructor.name
        
        this.error = true
        this.message = message
        this.data = data
        this.statusCode = statusCode ? statusCode : 401
    }
}

class InternalServerError extends Error {
    constructor(message, data, statusCode) {
        super()
        this.name = this.constructor.name
        
        this.error = true
        this.message = message
        this.data = data
        this.statusCode = statusCode ? statusCode : 500
    }
}

class ServiceError extends Error {
    constructor(message, data) {
        super()
        this.name = this.constructor.name
        
        this.error = true
        this.message = message
        this.data = data
        this.statusCode = 400
    }
}

module.exports = {
    ValidationError,
    AuthorizationError,
    ServiceError,
    InternalServerError,
}