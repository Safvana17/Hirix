import { NextFunction, Request, Response } from "express";
import { IAdminLoginUsecase } from "../../../../Application/admin/interfaces/IAdminLoginUsecase";
import { loginSchema } from "../../validators/loginValidator";
import { LoginAdminInputDto } from "../../../../Application/admin/dtos/LoginAdminDTO";
import { statusCode } from "../../../../Shared/Enumes/statusCode";
import { authMessages } from "../../../../Shared/constsnts/messages/authMessages";
import { env } from "../../../../Infrastructure/config/env";
import { IAdminLogoutUsecase } from "../../../../Application/admin/interfaces/IAdminLogoutUsecase";

export class AdminAuthController {
    constructor(
        private _loginUsecase: IAdminLoginUsecase,
        private _logoutUsecase: IAdminLogoutUsecase
    ) {}

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = loginSchema.parse(req.body)
            const payload: LoginAdminInputDto = {
                email: parsed.email,
                password: parsed.password
            }

            const {refreshToken, accessToken} = await this._loginUsecase.execute(payload)

            // const hashedToken = this.hashService.hashToken(refreshToken)
            // await this.adminRepository.updateToken(admin.id, hashedToken)

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: env.REFRESH_TOKEN_MAX_AGE,
                path: '/'
            })

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: env.ACCESS_TOKEN_MAX_AGE,
                path: '/'
            })

            return res.status(statusCode.OK).json({
                success: true,
                message: authMessages.success.ADMIN_LOGIN_SUCCESS
            })

        } catch (error) {
            next(error)
        }
    }

    logout = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const refreshToken = req.cookies?.refershToken
            await this._logoutUsecase.execute(refreshToken)
            res.clearCookie('refreshToken', {
                httpOnly: true,
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                secure: process.env.NODE_ENV === 'production',
            })

            res.clearCookie('accessToken', {
                httpOnly: true,
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                secure: process.env.NODE_ENV === 'production'
            })
            return res.status(statusCode.NO_CONTENT).json({
                success: true,
                message: authMessages.success.ADMIN_LOGOUT_SUCCESS
            })

        } catch (error) {
            next(error)
        }
    }
}

