const errorResponder = (err, req, res, next) => {
    let error
    if (err.name === "ValidationError" || err.name === "AuthorizationError" || err.name === "InternalServerError") {
        error = err
    } else {
        error = {
        name: err.name,
        error: true,
        message: err.message,
        statusCode: 500,
        stack: err.stack
        }
    }
    res.status(error.statusCode).send(error)

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
}

const invalidPath = (req, res, next) => {
    res.status(404).send({
        name: "InvalidPathError",
        error: true,
        message: "invalid url",
        data: {
            path: req.url
        }
    })
}

module.exports = {
    errorResponder,
    invalidPath
}