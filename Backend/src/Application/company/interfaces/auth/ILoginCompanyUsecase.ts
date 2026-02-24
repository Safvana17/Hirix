import { LoginCompanyInputDTO, LoginCompanyOutputDTO } from '../../dtos/LoginCompanyDTO'

export interface ILoginCompanyUsecase{
    execute(request: LoginCompanyInputDTO): Promise<LoginCompanyOutputDTO>
}