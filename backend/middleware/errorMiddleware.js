// Middleware for any routes that don't exists
const notFound = (req, res, next) => {
    // Throw new error with the originalUrl from req
    const error = new Error(`Not Found - ${req.originalUrl}`)

    // send 404 not found status
    res.status(404)

    // Run next middleware and pass in error
    next(error)
}

// Error Middleware
const errorHandler = (err, req, res, next) => {
    // Set statusCode to 500 if its 200 if not leave the same
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode

    // Grab the error message
    let message = err.message

    // Check if the err name is CastError, check if the err kind is ObjectId
    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        statusCode = 404
        message = 'Resource not found'
    }

    // Respond with statusCode and error message and the stack
    res.status(statusCode).json({ 
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export {notFound, errorHandler}

