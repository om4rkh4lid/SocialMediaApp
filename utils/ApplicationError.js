class ApplicationError extends Error {
    constructor(code, message) {
        super(message)
        this.statusCode = code

        // will create a 'stack' property on the object (already inherited) and remove the call to this.constructor from the stack
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApplicationError