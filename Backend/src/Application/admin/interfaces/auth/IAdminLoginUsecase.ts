import { LoginAdminInputDto, LoginAdminOutputDTO } from "../../dtos/auth/LoginAdminDTO";

export interface IAdminLoginUsecase{
    execute(request: LoginAdminInputDto): Promise<LoginAdminOutputDTO>
}