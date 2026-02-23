import { verifyRegisterCandidateOtpInputDTO, verifyRegisterCandidateOtpOutputDTO } from "../../dtos/VerifyRegisterCandidateOtpDTO";

export interface IVerifyRegisterCandidate {
    execute(request: verifyRegisterCandidateOtpInputDTO): Promise<verifyRegisterCandidateOtpOutputDTO>
}