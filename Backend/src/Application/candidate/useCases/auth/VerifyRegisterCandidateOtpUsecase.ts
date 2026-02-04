import ICandidateRepository from "../../../../Domain/repositoryInterface/ICandidateRepository";
import { verifyRegisterCandidateOtpInputDTO, verifyRegisterCandidateOtpOutputDTO } from "../../dtos/verifyRegisterCandidateOtpDTO";
import { IVerifyRegisterCandidate } from "../../interfaces/auth/IVerifyRegisterCandidate";
import { IOtpService } from "../../interfaces/service/IOtpService";
import { IOtpStore } from "../../interfaces/service/IOtpStore";
import { ITokenService } from "../../interfaces/service/ITokenService";

export class VerifyRegisterCandidateOtpUsecase implements IVerifyRegisterCandidate{
    constructor(
        private candidateRepository: ICandidateRepository,
        private otpStore: IOtpStore,
        private otpService: IOtpService,
        private tokenService: ITokenService
    ) {}

    async execute(request: verifyRegisterCandidateOtpInputDTO): Promise<verifyRegisterCandidateOtpOutputDTO> {

        const candidate = await this.candidateRepository.findByEmail(request.email)
        if(!candidate || !candidate.getId()){
            throw new Error('candidate not found')
        }

        if(candidate.isUserVerified()){
            throw new Error('User already verified')
        }

        const Id = candidate.getId()
        const candidateId = Id!;
        const storedOtp = await this.otpStore.getOtp(candidateId)
        if(!storedOtp){
            throw new Error("OTP expired or invalid")
        }

        const isValid = await this.otpService.compare(request.otp, storedOtp)

        if(!isValid){
            throw new Error('Invalid OTP')
        }

        candidate.markAsVerified()
        await this.candidateRepository.save(candidate)
        await this.otpStore.deleteOtp(candidateId)


        const refreshToken = this.tokenService.generateRefreshToken({candidateId})
        const accessToken = this.tokenService.generateAccessToken({candidateId, email: candidate.getEmail(), role: candidate.getRole()})

        return {
            refreshToken,
            accessToken,
            candidate: {
                id: candidateId,
                name: candidate.getName(),
                email: candidate.getEmail(),
                role: candidate.getRole()

            }
        }
    }
}