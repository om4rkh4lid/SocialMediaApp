class ApplicationError extends Error {
    constructor(code, message) {
        super(message)
        this.statusCode = code

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApplicationError