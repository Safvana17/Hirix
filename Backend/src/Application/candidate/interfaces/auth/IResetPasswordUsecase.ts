import { ResetPasswordInputDTO, ResetPasswordOutputDTO } from "../../dtos/ResetPasswordDTO";

export interface IResetPasswordUsecase {
    execute(request: ResetPasswordInputDTO): Promise<ResetPasswordOutputDTO>
    
}