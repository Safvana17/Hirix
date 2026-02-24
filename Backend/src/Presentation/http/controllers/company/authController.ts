import { NextFunction, Request, Response } from "express";
import { ICompanyRegisterUsecase } from "../../../../Application/company/interfaces/auth/ICompanyRegisterUsecase";
import { otpSchema, registerSchema, resendOtpSchema } from "../../validators/registerValidator";
import { RegisterCompanyInputDTO } from "../../../../Application/company/dtos/RegisterCompanyDTO";
import { statusCode } from "../../../../Shared/Enumes/statusCode";
import { authMessages } from "../../../../Shared/constsnts/messages/authMessages";
import { IVerifyRegisterCompanyUsecase } from "../../../../Application/company/interfaces/auth/ICompanyVerifyRegisterUsecase";
import { VerifyCompanyInputDTO } from "../../../../Application/company/dtos/VerifyCompanyDTO";
import { ResendOtpCompanyInputDTO } from "../../../../Application/company/dtos/ResendOtpCompanyDTO";
import { IResendOtpCompanyUsecase } from "../../../../Application/company/interfaces/auth/IResendOtpUsecase";

export class CompanyAuthController {
    constructor(
        private registerUsecase: ICompanyRegisterUsecase,
        private verifyCompanyUsecase: IVerifyRegisterCompanyUsecase,
        private resendOtpCompanyUsecase: IResendOtpCompanyUsecase
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
}