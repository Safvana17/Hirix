import { LoginAdminInputDto, LoginAdminOutputDTO } from "../dtos/LoginAdminDTO";

export interface IAdminLoginUsecase{
    execute(request: LoginAdminInputDto): Promise<LoginAdminOutputDTO>
}