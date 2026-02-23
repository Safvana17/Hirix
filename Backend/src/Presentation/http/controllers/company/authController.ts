import { NextFunction, Request, Response } from "express";
import { ICompanyRegisterUsecase } from "../../../../Application/company/interfaces/auth/ICompanyRegisterUsecase";
import { registerSchema } from "../../validators/registerValidator";
import { RegisterCompanyInputDTO } from "../../../../Application/company/dtos/RegisterCompanyDTO";
import { statusCode } from "../../../../Shared/Enumes/statusCode";
import { authMessages } from "../../../../Shared/constsnts/messages/authMessages";

export class CompanyAuthController {
    constructor(
        private registerUsecase: ICompanyRegisterUsecase,
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
}