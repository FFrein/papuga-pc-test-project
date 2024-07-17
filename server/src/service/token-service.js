const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model')

class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: '1m'
            }
        )
        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: '2m'
            }
        )

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token){
        try{
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch(e){
            return null;
        }
    }

    validateRefreshToken(token){
        try{
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch(e){
            return null;
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await tokenModel.findOne({user:userId});
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await tokenModel.create({
            user:userId,
            refreshToken
        })
        return token;
    }

    async removeToken(refreshToken){
        const tokeData = await tokenModel.deleteOne({refreshToken});
        return tokeData;
    }

    async findToken(refreshToken){
        //console.log("refreshToken", refreshToken)

        const tokeData = await tokenModel.findOne({refreshToken});
        
        //console.log("tokeData", tokeData)
        return tokeData;
    }
}

module.exports = new TokenService();