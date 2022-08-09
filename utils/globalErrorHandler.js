const ApplicationError = require('./ApplicationError');

const handleDevelopmentError = (err, res) => {
    console.log(err);
    return res.status(err.statusCode).json({
        error: {
            message: err.message,
            stack: err.stack
        }
    })
}

const validationError = err => {
    const message = Object.values(err.errors).map(element => element.message).join('. ')
    return new ApplicationError(400, `Invalid input data. ${message}`)
}

// when a string can't be properly cast to an ObjectId
const castError = err => {
    return new ApplicationError(400, `${err.value} is not a valid ID`)
}

const jwtError = () => new ApplicationError(401, `Invalid token. Please log in again.`)

const tokenExpiredError = () => new ApplicationError(401, `Your token has expired. Please log in again.`)

const duplicateKeyError = err => {
    const values = Object.entries(err.keyValue).map(el => `${el[0]} (${el[1]})`).join(', ')
    const message = `A user with this ${values} already exists. Please enter a different value.`
    return new ApplicationError(400, message)
}

const handleProductionError = (err, res) => {
    // start with the original error value
    // let error = { ...err }

    if (err.code && err.code === 11000) {
        err = duplicateKeyError(err);
    } else if (err.name) {
        switch (err.name) {
            case 'ValidationError':
                err = validationError(err)
                break;
            case 'CastError':
                err = castError(err)
                break;
            case 'JsonWebTokenError':
                err = jwtError()
                break;
            case 'TokenExpiredError':
                err = tokenExpiredError()
                break;
            default:
                break;
        }
    }


    return res.status(err.statusCode).json({
        error: {
            message: err.message
        }
    })
}


module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;

    // TODO: handle different errors from mongoose
    // TODO: handle token errors

    if (process.env.NODE_ENV === 'development') {
        handleDevelopmentError(err, res)
    } else {
        handleProductionError(err, res)
    }
}