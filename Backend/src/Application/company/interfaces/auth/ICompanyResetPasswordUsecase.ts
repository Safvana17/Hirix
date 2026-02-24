import { CompanyResetPasswordInputDTO, CompanyResetPasswordOutputDTO } from "../../dtos/CompanyResetPasswordDTO";

export interface ICompanyResetPasswordUsecase{
    execute(request: CompanyResetPasswordInputDTO): Promise<CompanyResetPasswordOutputDTO>
}