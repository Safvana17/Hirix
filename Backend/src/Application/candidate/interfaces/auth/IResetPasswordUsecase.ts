import { ResetPasswordInputDTO, ResetPasswordOutputDTO } from "../../dtos/resetPasswordDTO";

export interface IResetPasswordUsecase {
    execute(request: ResetPasswordInputDTO): Promise<ResetPasswordOutputDTO>
    
}