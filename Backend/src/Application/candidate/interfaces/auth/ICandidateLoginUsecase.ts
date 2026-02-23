import { LoginCandidateInputDTO, LoginCandidateOutputDTO } from "../../dtos/LoginCandidateDTO";

export interface ICandidateLoginUsecase {
    execute(input: LoginCandidateInputDTO): Promise<LoginCandidateOutputDTO>
}