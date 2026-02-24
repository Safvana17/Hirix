import { ResendOtpCompanyInputDTO, ResendOtpCompanyOutputDTO } from "../../dtos/ResendOtpCompanyDTO";

export interface IResendOtpCompanyUsecase {
    execute(request: ResendOtpCompanyInputDTO): Promise<ResendOtpCompanyOutputDTO>
}