import { NextFunction, Request, Response } from "express";
import { IAdminLoginUsecase } from "../../../../Application/admin/interfaces/IAdminLoginUsecase";
import { loginSchema } from "../../validators/loginValidator";
import { LoginAdminInputDto } from "../../../../Application/admin/dtos/LoginAdminDTO";
import { IHashService } from "../../../../Application/interface/service/IHashService";
import IAdminRepository from "../../../../Domain/repositoryInterface/IAdminRepository";
import { statusCode } from "../../../../Shared/Enumes/statusCode";
import { authMessages } from "../../../../Shared/constsnts/messages/authMessages";

export class AdminAuthController {
    constructor(
        private loginUsecase: IAdminLoginUsecase,
        private hashService: IHashService,
        private adminRepository: IAdminRepository
    ) {}

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = loginSchema.parse(req.body)
            const payload: LoginAdminInputDto = {
                email: parsed.email,
                password: parsed.password
            }

            const {refreshToken, accessToken, admin} = await this.loginUsecase.execute(payload)

            const hashedToken = this.hashService.hashToken(refreshToken)
            await this.adminRepository.updateToken(admin.id, hashedToken)

            res.cookie('refershToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 7 * 24 * 60 * 60,
                path: '/'
            })

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 15 * 60 * 1000,
                path: '/'
            })

            res.status(statusCode.OK).json({
                success: true,
                message: authMessages.success.ADMIN_LOGIN_SUCCESS
            })

        } catch (error) {
            next(error)
        }
    }
}