import userRole from "../../../../Domain/enums/userRole.enum";
import { LoginCompanyOutputDTO } from "../../dtos/LoginCompanyDTO";

export interface ICompanyGoogleLoginUsecase {
    execute(token: string, role: userRole): Promise<LoginCompanyOutputDTO>
}