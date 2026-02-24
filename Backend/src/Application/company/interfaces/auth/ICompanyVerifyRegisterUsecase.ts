import { VerifyCompanyInputDTO, VerifyCompanyOutputDTO } from '../../dtos/VerifyCompanyDTO'

export interface IVerifyRegisterCompanyUsecase {
    execute(request: VerifyCompanyInputDTO): Promise<VerifyCompanyOutputDTO>
}