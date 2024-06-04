class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}


const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode);
}


const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    return res.status(500).json({ msg: 'Something went wrong, please try again' });
}



module.exports = {errorHandlerMiddleware, createCustomError};


