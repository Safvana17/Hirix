import userRole from "../../../../Domain/enums/userRole.enum";
import { LoginCandidateOutputDTO } from "../../dtos/LoginCandidateDTO";

export interface IGoogleLoginUsecase {
    execute(token: string, role: userRole): Promise<LoginCandidateOutputDTO>
}