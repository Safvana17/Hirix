import { ForgotPasswordInputDTO, ForgotPasswordOutputDTO } from "../../dtos/ForgotPasswordDTO";

export interface IForgotPasswordUsecase {
    execute(request: ForgotPasswordInputDTO): Promise<ForgotPasswordOutputDTO>
}