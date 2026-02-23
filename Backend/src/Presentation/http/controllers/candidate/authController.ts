import { NextFunction, Request, Response } from "express";
import { statusCode } from "../../../../Shared/Enumes/statusCode";
import { authMessages } from "../../../../Shared/constsnts/messages/authMessages";
import { ICandidateRegisterUsecase } from "../../../../Application/candidate/interfaces/auth/ICandidateRegisterUsecase";
import { IVerifyRegisterCandidate } from "../../../../Application/candidate/interfaces/auth/IVerifyRegisterCandidate";
import { RegisterCandidateInputDTO } from "../../../../Application/candidate/dtos/RegisterCandidateDTO";
import { forgotPasswordSchema, otpSchema, registerSchema, resendOtpSchema, resetPasswordSchema } from "../../validators/registerValidator";
import { verifyRegisterCandidateOtpInputDTO } from "../../../../Application/candidate/dtos/VerifyRegisterCandidateOtpDTO";
import { loginSchema, refreshTokenSchema } from "../../validators/loginValidator";
import { LoginCandidateInputDTO } from "../../../../Application/candidate/dtos/LoginCandidateDTO";
import { ICandidateLoginUsecase } from "../../../../Application/candidate/interfaces/auth/ICandidateLoginUsecase";
import { IResendOtpUsecase } from "../../../../Application/candidate/interfaces/auth/IResendOtpUsecase";
import { ResendOtpInputDTO } from "../../../../Application/candidate/dtos/ResendOtpDTO";
import { IForgotPasswordUsecase } from "../../../../Application/candidate/interfaces/auth/IForgotPasswordUsecase";
import { IResetPasswordUsecase } from "../../../../Application/candidate/interfaces/auth/IResetPasswordUsecase";
import { ForgotPasswordInputDTO } from "../../../../Application/candidate/dtos/ForgotPasswordDTO";
import { ResetPasswordInputDTO } from "../../../../Application/candidate/dtos/ResetPasswordDTO";
import ICandidateRepository from "../../../../Domain/repositoryInterface/ICandidateRepository";
import { IHashService } from "../../../../Application/interface/service/IHashService";
import { IRefreshTokenUsecase } from "../../../../Application/candidate/interfaces/auth/IRefreshTokenUsecase";
import { RefreshTokenInputDTO } from "../../../../Application/candidate/dtos/RefreshTokenDTO";
// import { IGoogleLoginUsecase } from "../../../../Application/candidate/interfaces/auth/IGoogleLoginUsecase";


export class CandidateAuthController {
    constructor(
        private registerUsecase: ICandidateRegisterUsecase,
        private verifyOtp: IVerifyRegisterCandidate,
        private resendOtpUsecase: IResendOtpUsecase,
        private loginUsecase: ICandidateLoginUsecase,
        private forgotPasswordUsecase: IForgotPasswordUsecase,
        private resetPasswordUsecase: IResetPasswordUsecase,
        private candidateRepository: ICandidateRepository,
        private hashService: IHashService,
        private refreshTokenUsecase: IRefreshTokenUsecase
        // private googleLoginUsecase: IGoogleLoginUsecase
        
    ) {}


    /**
     * 
     * @param req candidate register request with candidate details
     * @param res 
     * @param next 
     */
    register = async (req:Request, res: Response, next: NextFunction) => {
        try {
            const parsed = registerSchema.parse(req.body)
            const payload: RegisterCandidateInputDTO = {
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

    VerifyOtp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = otpSchema.parse(req.body)
            const payload: verifyRegisterCandidateOtpInputDTO = {
                email: parsed.email,
                otp: parsed.otp
            }

            const savedCandidate = await this.verifyOtp.execute(payload)

            res.status(statusCode.CREATED).json({
                success: true,
                message: authMessages.success.CANDIDATE_REGISTER_SUCCESS,
                candidate: savedCandidate
            })

        } catch (error) {
            next(error)
        }
    }

    resendOtp = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = resendOtpSchema.parse(req.body)
            const payload: ResendOtpInputDTO = {
                email: parsed.email
            }

            await this.resendOtpUsecase.execute(payload)

            res.status(statusCode.OK).json({
                success: true,
                message: authMessages.success.OTP_SEND_SUCCESS
            })

        } catch (error) {
            next(error)
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload: LoginCandidateInputDTO = loginSchema.parse(req.body)
            const {refreshToken, accessToken, candidate} = await this.loginUsecase.execute(payload)

            const hashedToken = this.hashService.hashToken(refreshToken)
            await this.candidateRepository.updateToken(candidate.id, hashedToken)

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
                candidate: candidate,
                message: authMessages.success.COMPANY_LOGIN_SUCCESS
            })

            res.status(statusCode.OK).json({
                success: true,
                message: authMessages.success.TOKEN_REFRESHED
            })

        } catch (error) {
            next(error)
        }
    }

    forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = forgotPasswordSchema.parse(req.body)
            const payload: ForgotPasswordInputDTO = {
                email: parsed.email
            }

            await this.forgotPasswordUsecase.execute(payload)
            
            res.status(statusCode.OK).json({
                success: true,
                message: authMessages.success.RESET_PASSWORD_OTP_sEND
            })

        } catch (error) {
            next(error)
        }
    }

    resetPassword = async ( req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = resetPasswordSchema.parse(req.body)
            const payload: ResetPasswordInputDTO = {
                email: parsed.email,
                otp: parsed.otp,
                newPassword: parsed.newPassword,
                confirmPassword: parsed.confirmPassword 
            }

            await this.resetPasswordUsecase.execute(payload)
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
            const payload: RefreshTokenInputDTO = {
                token: parsed.token
            }

            const tokens = this.refreshTokenUsecase.execute(payload)
            
            const hashedRefreshToken = this.hashService.hashToken((await tokens).refreshToken)
            await this.candidateRepository.updateToken((await tokens).candidateId, hashedRefreshToken)

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

        } catch (error) {
            next(error)
        }
    }
    // googleLogin = async (req: Request, res: Response, next: NextFunction) =>{
    //     try {
    //        const parsed = 
    //     } catch (error) {
    //         next(error)
    //     }
    // }
}