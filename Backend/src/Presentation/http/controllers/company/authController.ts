import { NextFunction, Request, Response } from "express";
import { ICompanyRegisterUsecase } from "../../../../Application/company/interfaces/auth/ICompanyRegisterUsecase";
import { forgotPasswordSchema, otpSchema, registerSchema, resendOtpSchema, resetPasswordSchema } from "../../validators/registerValidator";
import { RegisterCompanyInputDTO } from "../../../../Application/company/dtos/RegisterCompanyDTO";
import { statusCode } from "../../../../Shared/Enumes/statusCode";
import { authMessages } from "../../../../Shared/constsnts/messages/authMessages";
import { IVerifyRegisterCompanyUsecase } from "../../../../Application/company/interfaces/auth/ICompanyVerifyRegisterUsecase";
import { VerifyCompanyInputDTO } from "../../../../Application/company/dtos/VerifyCompanyDTO";
import { ResendOtpCompanyInputDTO } from "../../../../Application/company/dtos/ResendOtpCompanyDTO";
import { IResendOtpCompanyUsecase } from "../../../../Application/company/interfaces/auth/IResendOtpUsecase";
import { loginSchema, refreshTokenSchema } from "../../validators/loginValidator";
import { LoginCompanyInputDTO } from "../../../../Application/company/dtos/LoginCompanyDTO";
import { ILoginCompanyUsecase } from "../../../../Application/company/interfaces/auth/ILoginCompanyUsecase";
import { IHashService } from "../../../../Application/interface/service/IHashService";
import ICompanyRepository from "../../../../Domain/repositoryInterface/ICompanyRepository";
import { ICompanyForgotPasswordUsecase } from "../../../../Application/company/interfaces/auth/ICompanyForgotPasswordUsecase";
import { ICompanyResetPasswordUsecase } from "../../../../Application/company/interfaces/auth/ICompanyResetPasswordUsecase";
import { ICompanyRefreshTokenUsecase } from "../../../../Application/company/interfaces/auth/ICompanyRefreshTokenUsecase";
import { CompanyForgotPasswordInputDTO } from "../../../../Application/company/dtos/CompanyForgotPasswordDTO";
import { CompanyResetPasswordInputDTO } from "../../../../Application/company/dtos/CompanyResetPasswordDTO";
import { CompanyRefreshTokenInputDTO } from "../../../../Application/company/dtos/CompanyRefreshTokenDTO";

export class CompanyAuthController {
    constructor(
        private registerUsecase: ICompanyRegisterUsecase,
        private verifyCompanyUsecase: IVerifyRegisterCompanyUsecase,
        private resendOtpCompanyUsecase: IResendOtpCompanyUsecase,
        private loginCompanyUsecase: ILoginCompanyUsecase,
        private hashService: IHashService,
        private companyRepository: ICompanyRepository,
        private companyForgotPasswordUsecase: ICompanyForgotPasswordUsecase,
        private companyResetPasswordUsecase: ICompanyResetPasswordUsecase,
        private companyRefreshTokenUsecase: ICompanyRefreshTokenUsecase
    ) {}

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = registerSchema.parse(req.body)
            const payload: RegisterCompanyInputDTO = {
                name: parsed.name,
                email: parsed.email,
                password: parsed.password
            }

            await this.registerUsecase.execute(payload)
            res.status(statusCode.OK).json({
                success: true,
                message: authMessages.success.OTP_SEND_SUCCESS
            })

            
        } catch (error) {
            next(error)
        }
    }

    verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = otpSchema.parse(req.body)
            const payload: VerifyCompanyInputDTO = {
                email: parsed.email,
                otp: parsed.otp
            }

            const savedCompany = await this.verifyCompanyUsecase.execute(payload)

            res.status(statusCode.CREATED).json({
                success: true,
                company: savedCompany,
                message: authMessages.success.COMPANY_REGISTER_SUCCESS
            })

        } catch (error) {
            next(error)
        }
    }

    resendOtp = async (req: Request, res: Response, next: NextFunction) => {
            try {
                const parsed = resendOtpSchema.parse(req.body)
                const payload: ResendOtpCompanyInputDTO = {
                    email: parsed.email
                }

                await this.resendOtpCompanyUsecase.execute(payload)
                res.status(statusCode.OK).json({
                    success: true,
                    message: authMessages.success.COMPANY_REGISTER_SUCCESS
                })

                
            } catch (error) {
                next(error)
            }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = loginSchema.parse(req.body)
            const payload: LoginCompanyInputDTO = {
                email: parsed.email,
                password: parsed.password
            }

            const {refreshToken, accessToken, company} = await this.loginCompanyUsecase.execute(payload)

            const hashedRefreshToken = this.hashService.hashToken(refreshToken)
            await this.companyRepository.updateToken(company.id,hashedRefreshToken)

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
                company: company,
                message: authMessages.success.COMPANY_LOGIN_SUCCESS
            })
        } catch (error) {
            next(error)
        }
    }

    forgotPassword = async(req: Request, res: Response, next:NextFunction) => {
        try {
            const parsed = forgotPasswordSchema.parse(req.body)
            const payload: CompanyForgotPasswordInputDTO = {
                email: parsed.email
            }

            await this.companyForgotPasswordUsecase.execute(payload)
            
            res.status(statusCode.OK).json({
                success: true,
                message: authMessages.success.RESET_PASSWORD_OTP_sEND
            })
        } catch (error) {
            next(error)
        }
    }

    resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = resetPasswordSchema.parse(req.body)
            const payload: CompanyResetPasswordInputDTO = {
                email: parsed.email,
                otp: parsed.otp,
                newPassword: parsed.newPassword,
                confirmPassword: parsed.confirmPassword 
            }

            await this.companyResetPasswordUsecase.execute(payload)
            res.status(statusCode.OK).json({
                success: true,
                message: authMessages.success.PASSWORD_RESET
            })
        } catch (error) {
            next(error)
        }
    }

    refreshToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = refreshTokenSchema.parse(req.body)
            const payload: CompanyRefreshTokenInputDTO = {
                token: parsed.token
            }

            const tokens = this.companyRefreshTokenUsecase.execute(payload)
            
            const hashedRefreshToken = this.hashService.hashToken((await tokens).refreshToken)
            await this.companyRepository.updateToken((await tokens).companyId, hashedRefreshToken)

            res.cookie('refreshToken', (await tokens).refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV ==='production' ? 'none' : 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: '/'
            })

            res.cookie('accessToken', (await tokens).accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 15 * 60 * 1000,
                path: '/'
            })

            res.status(statusCode.OK).json({
                success: true,
                message: authMessages.success.TOKEN_REFRESHED
            })

        } catch (error) {
            next(error)
        }
    }
}