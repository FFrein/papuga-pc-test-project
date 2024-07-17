const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user.dto')
const ApiError = require('../exceptions/api-error');

class UserService{
    async registration(email,password, role){
        const candidate = await UserModel.findOne({email})
        if(candidate){
            throw ApiError.BadRequest(`$Пользователь ${email} существует`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4();
        const user = await UserModel.create({ email, password: hashPassword, role, activationLink });
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/` + activationLink)
        
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return{
            ...tokens,
            user:userDto//смысл юзер дату если она есть в токене?
        }
    }

    async activate(activationLink){
        const user = await UserModel.findOne({activationLink});
        if(!user){
            throw ApiError.BadRequest("Некорректная ссылка автивации");
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password){
        const user = await UserModel.findOne({email});
        
        if(!user){
            throw ApiError.BadRequest("Пользователь не найден");
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals){
            throw ApiError.BadRequest("Неверный пароль");
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        console.log("user service login", tokens);

        return{
            ...tokens,
            user:userDto//смысл юзер дату если она есть в токене?
        }
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        try{
            if(!refreshToken){
                throw ApiError.UnauthorizedError();
            }
            const userData = tokenService.validateRefreshToken(refreshToken);
            const tokenFromDataBase = await tokenService.findToken(refreshToken);
    
            //console.log("refreshToken\n", refreshToken, "\n====\n")
            //console.log("userData\n", userData, "\n=====\n")
            //console.log("tokenFromDataBase\n", tokenFromDataBase, "\n=====\n")
    
            if(!userData || !tokenFromDataBase || userData == null ){
                throw ApiError.UnauthorizedError("Не валидынй refreshToken");
            }
            //console.log(userData)
            const user = await  UserModel.findById(userData.id);
            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens({...userDto});
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
            
            console.log("user service refresh", tokens);

            return{
                ...tokens,
                user:userDto//смысл юзер дату если она есть в токене?
            }
        }
        catch(e){
            console.log("refresh user-service");
        }
    }

    async getAllUsers(){
        const users = await UserModel.find();
        return users;
    }

    async banStatusUser(_id, banned){
        const user = await UserModel.findOne({_id});

        if(user){
            user.banned = banned;
            return user.save();
        }

        return user;
    }
}

module.exports = new UserService();