import { RegisterCompanyInputDTO, RegisterCompanyOutputDTO } from "../../dtos/RegisterCompanyDTO";

export interface ICompanyRegisterUsecase {
    execute(input: RegisterCompanyInputDTO): Promise<RegisterCompanyOutputDTO>
}