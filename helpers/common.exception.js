class AppError extends Error {

    constructor(code, message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);

        this.code = code;
        this.message = message;

        Error.captureStackTrace(this);
    }
}

export default AppError;