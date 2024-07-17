module.exports = class ApiError extends Error{
    status;
    errors;

    constructor(status, message, errors = []){
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError(message){
        return new ApiError(401, 'Пользоватьель не авторизован', message)
    }

    static AccessError(message){
        return new ApiError(403, 'Недостаточно прав', message)
    }

    static BadRequest(message, errors =[]){
        return new ApiError(400, message, errors);
    }
}