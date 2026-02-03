import { ForgotPasswordInputDTO, ForgotPasswordOutputDTO } from "../../dtos/forgotPasswordDTO";

export interface IForgotPasswordUsecase {
    execute(request: ForgotPasswordInputDTO): Promise<ForgotPasswordOutputDTO>
}