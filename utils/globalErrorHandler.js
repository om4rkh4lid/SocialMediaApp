const handleDevelopmentError = (err, res) => {
    return res.status(err.statusCode).json({
        error: {
            message: err.message,
            stack: err.stack
        }
    })
}

const handleProductionError = (err, res) => {
    return res.status(err.statusCode).json({
        error: {
            message: err.message,
        }
    })
}


module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;

    // TODO: handle different errors from mongoose
    // TODO: handle token errors

    if (process.env.NODE_ENV === 'development'){
        handleDevelopmentError(err, res)
    } else {
        handleProductionError(err, res)
    }
}