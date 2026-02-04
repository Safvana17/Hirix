import ICandidateRepository from "../../../../Domain/repositoryInterface/ICandidateRepository";
import { ForgotPasswordInputDTO, ForgotPasswordOutputDTO } from "../../dtos/forgotPasswordDTO";
import { IForgotPasswordUsecase } from "../../interfaces/auth/IForgotPasswordUsecase";
import { IMailService } from "../../interfaces/service/IMailService";
import { IOtpService } from "../../interfaces/service/IOtpService";
import { IOtpStore } from "../../interfaces/service/IOtpStore";

export class ForgotPasswordUsecase implements IForgotPasswordUsecase{
    constructor(
        private candidateRepository: ICandidateRepository,
        private otpService: IOtpService,
        private otpStore: IOtpStore,
        private mailService: IMailService
    ) {}

    async execute(request: ForgotPasswordInputDTO): Promise<ForgotPasswordOutputDTO> {
        
        const candidate = await this.candidateRepository.findByEmail(request.email)

        if(!candidate || !candidate.getId()){
            throw new Error('Candidate not found')
        }

        const id = candidate.getId()
        const candidateId = id!;

        const otp = this.otpService.generate()
        const hashedOtp = await this.otpService.hash(otp)

        await this.otpStore.saveOtp(candidateId, hashedOtp, 120)
        await this.mailService.sentOtp(candidate.getEmail(), otp)

        return {success: true}
    }
}