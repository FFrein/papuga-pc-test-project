const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController{
    async registration(req,res,next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
            }

            const {email, password} = req.body;
            const userData = await userService.registration(email, password, "user");

            res.cookie(
                'refreshToken',
                userData.refreshToken,
                {
                    maxAge: 30 * 24 * 60 * 60 * 1000, //30days
                    httpOnly: true //что бы нельзя было изменять и получать в браузере из js
                }
            )

            return res.json(userData);
        }
        catch (e){
            next(e);
        }
    }

    async activate(req,res,next){
        try{
            const activateLink = req.params.link;
            await userService.activate(activateLink);
            return res.redirect(process.env.CLIENT_URL);
        }
        catch (e){
            next(e);
        }
    }

    async login(req,res,next){
        try{
            const {email, password} = req.body;
            const userData = await userService.login(email, password);

            res.cookie(
                'refreshToken',
                userData.refreshToken,
                {
                    maxAge: 30 * 24 * 60 * 60 * 1000, //30days
                    httpOnly: true, //что бы нельзя было изменять и получать в браузере из js
                    sameSite: 'None',  // Указание SameSite: None
                    secure: true       // Указание Secure: true
                }
            )

            return res.json(userData);
        }
        catch (e){
            next(e);
        }
    }

    async logout(req,res,next){
        try{
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(200);
        }
        catch (e){
            next(e);
        }
    }

    async refresh(req,res,next){
        try{
            //const {refreshToken} = req.body;
            const {refreshToken} = req.cookies;
            
            const userData = await userService.refresh(refreshToken);
            
            //console.log(userData.refreshToken);
            res.cookie(
                'refreshToken',
                userData.refreshToken,
                {
                    maxAge: 30 * 24 * 60 * 60 * 1000, //30days
                    httpOnly: true //что бы нельзя было изменять и получать в браузере из js
                }
            )
            return res.json(userData);
        }
        catch (e){
            next(e);
        }
    }
    
    async getUsers(req,res,next){
        try{
            const users = await userService.getAllUsers();
            return res.json(users);
        }
        catch (e){
            next(e);
        }
    }

    async banStatus(req, res, next){
        try{
            const {userId, ban} = req.body;
            const userData = await userService.banStatusUser(userId, ban);
            return res.json(userData);
        }
        catch (e){
            next(e);
        }
    }
}

module.exports = new UserController();