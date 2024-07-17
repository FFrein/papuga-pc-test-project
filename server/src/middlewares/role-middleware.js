const ApiError = require("../exceptions/api-error");

module.exports = function(req, res, next){
    console.log('role-middleware')
    try{
        const url = req.url.split('/')[2]
        const method = req.method
        const role = req.user.role

        if(role != "admin" && url == "users" && method == "GET"){
            return next(ApiError.AccessError());
        }
        if(role != "admin" && url == "users" && method == "GET"){
            return next(ApiError.AccessError());
        }
        if(role != "admin" && url == "users" && method == "GET"){
            return next(ApiError.AccessError());
        }
        if(role != "admin" && url == "users" && method == "GET"){
            return next(ApiError.AccessError());
        }
        if(role != "admin" && url == "users" && method == "GET"){
            return next(ApiError.AccessError());
        }
        if(role != "admin" && url == "users" && method == "GET"){
            return next(ApiError.AccessError());
        }
        console.log("role-middleware next")
        next();
    }
    catch(e){
        console.log(e)
    }
};
