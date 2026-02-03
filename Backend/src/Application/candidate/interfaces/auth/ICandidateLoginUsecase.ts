import { LoginCandidateInputDTO, LoginCandidateOutputDTO } from "../../dtos/loginCandidateDTO";

export interface ICandidateLoginUsecase {
    execute(input: LoginCandidateInputDTO): Promise<LoginCandidateOutputDTO>
}