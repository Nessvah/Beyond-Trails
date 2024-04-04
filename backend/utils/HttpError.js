/**
 * This HttpError class is used to create custom error objects that include
 * an error message and an associated error code.
 * It extends the built-in Error class, allowing us to specify a custom error
 * code/message when creating instances of this class.
 */
class HttpError extends Error {
    constructor(message, errCode) {
        super(message);
        this.errCode = errCode;
    }
}

module.exports = HttpError;