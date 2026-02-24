import { CompanyForgotPasswordInputDTO, CompanyForgotPasswordOutputDTO } from "../../dtos/CompanyForgotPasswordDTO";

export interface ICompanyForgotPasswordUsecase{
    execute(request: CompanyForgotPasswordInputDTO): Promise<CompanyForgotPasswordOutputDTO>
}