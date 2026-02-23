import { ResendOtpInputDTO, ResendOtpOutputDTO } from "../../dtos/ResendOtpDTO";

export interface IResendOtpUsecase {
    execute(request: ResendOtpInputDTO): Promise<ResendOtpOutputDTO>
}