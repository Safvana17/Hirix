import { RegisterCandidateInputDTO, RegisterCandidateOutputDTO } from "../../dtos/registerCandidateDTO";

export interface ICandidateRegisterUsecase {
    execute(input: RegisterCandidateInputDTO): Promise<RegisterCandidateOutputDTO>
}