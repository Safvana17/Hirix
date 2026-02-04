import { AccessTokenPayload, ITokenService, RefreshTokenPayload } from "../../Application/candidate/interfaces/service/ITokenService";
import { jwtConfig } from "../config/jwt.config";
import jwt from 'jsonwebtoken'

export class TokenService implements ITokenService {
    generateRefreshToken(payload: RefreshTokenPayload): string {
        const refreshSecret = jwtConfig.refreshToken.secret
        if(!refreshSecret){
            throw new Error('Refresh secret isnot available')
        }
        return jwt.sign(payload,refreshSecret, {expiresIn: jwtConfig.refreshToken.expiresIn})
    }

    generateAccessToken(payload: AccessTokenPayload): string {
        const accessSecret = jwtConfig.accessToken.secret
        if(!accessSecret){
            throw new Error('Access secret is not available')
        }
        return jwt.sign(payload, accessSecret, {expiresIn: jwtConfig.accessToken.expiresIn})
    }

    verifyRefreshToken(token: string): RefreshTokenPayload {
        const refreshSecret = jwtConfig.refreshToken.secret
        if(!refreshSecret){
            throw new Error('Refresh token secret is not available')
        }
        return jwt.verify(token, refreshSecret)as RefreshTokenPayload
    }

    verifyAccessToken(token: string): AccessTokenPayload {
        const accessSecret = jwtConfig.accessToken.secret
        if(!accessSecret){
            throw new Error('Access token secret is not available')
        }
        return jwt.verify(token, accessSecret) as AccessTokenPayload
    }
}