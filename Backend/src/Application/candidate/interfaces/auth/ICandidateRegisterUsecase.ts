import { RegisterCandidateInputDTO, RegisterCandidateOutputDTO } from "../../dtos/RegisterCandidateDTO";

export interface ICandidateRegisterUsecase {
    execute(input: RegisterCandidateInputDTO): Promise<RegisterCandidateOutputDTO>
}