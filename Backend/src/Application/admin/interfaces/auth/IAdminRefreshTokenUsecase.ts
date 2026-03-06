import { AdminRefreshTokenInputDTO, AdminRefreshTokenOutputDTO } from "../../dtos/auth/AdminRefreshTokenDTO";


export interface IAdminRefreshTokenUsecase{
    execute(request: AdminRefreshTokenInputDTO): Promise<AdminRefreshTokenOutputDTO>
}