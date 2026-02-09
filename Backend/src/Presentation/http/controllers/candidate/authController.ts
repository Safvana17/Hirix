import { NextFunction, Request, Response } from "express";
import { statusCode } from "../../../../Shared/Enumes/statusCode";
import { authMessages } from "../../../../Shared/constsnts/messages/authMessages";
import { ICandidateRegisterUsecase } from "../../../../Application/candidate/interfaces/auth/ICandidateRegisterUsecase";
import { IVerifyRegisterCandidate } from "../../../../Application/candidate/interfaces/auth/IVerifyRegisterCandidate";
import { RegisterCandidateInputDTO } from "../../../../Application/candidate/dtos/registerCandidateDTO";
import { otpSchema, registerSchema, resendOtpSchema } from "../../validators/registerValidator";
import { verifyRegisterCandidateOtpInputDTO } from "../../../../Application/candidate/dtos/verifyRegisterCandidateOtpDTO";
import { loginSchema } from "../../validators/loginValidator";
import { LoginCandidateInputDTO } from "../../../../Application/candidate/dtos/loginCandidateDTO";
import { ICandidateLoginUsecase } from "../../../../Application/candidate/interfaces/auth/ICandidateLoginUsecase";
import { IResendOtpUsecase } from "../../../../Application/candidate/interfaces/auth/IResendOtpUsecase";
import { ResendOtpInputDTO } from "../../../../Application/candidate/dtos/resendOtpDTO";
// import { IOtpService } from "../../../../Application/candidate/interfaces/service/IOtpService";


export class authController {
    constructor(
        private registerUsecase: ICandidateRegisterUsecase,
        private verifyOtp: IVerifyRegisterCandidate,
        private resendOtpUsecase: IResendOtpUsecase,
        private loginUsecase: ICandidateLoginUsecase
        
    ) {}

    register = async (req:Request, res: Response, next: NextFunction) => {
        try {
            const parsed = registerSchema.parse(req.body)
            const payload: RegisterCandidateInputDTO = {
                name: parsed.name,
                email: parsed.email,
                password: parsed.password
            }

            await this.registerUsecase.execute(payload)
          
            res.status(statusCode.CREATED).json({
                success: true,
                message: authMessages.success.CANDIDATE_REGISTER_SUCCESS
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
            const candidate = await this.loginUsecase.execute(payload)
            res.status(statusCode.OK).json({
                success: true,
                candidate: candidate,
                message: authMessages.success.COMPANY_LOGIN_SUCCESS
            })
        } catch (error) {
            next(error)
        }
    }
}