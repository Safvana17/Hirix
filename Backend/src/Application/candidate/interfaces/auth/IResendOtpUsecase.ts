import { ResendOtpInputDTO, ResendOtpOutputDTO } from "../../dtos/resendOtpDTO";

export interface IResendOtpUsecase {
    execute(request: ResendOtpInputDTO): Promise<ResendOtpOutputDTO>
}