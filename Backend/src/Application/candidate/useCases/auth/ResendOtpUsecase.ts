import ICandidateRepository from "../../../../Domain/repositoryInterface/ICandidateRepository";
import { ResendOtpInputDTO, ResendOtpOutputDTO } from "../../dtos/resendOtpDTO";
import { IResendOtpUsecase } from "../../interfaces/auth/IResendOtpUsecase";
import { IMailService } from "../../interfaces/service/IMailService";
import { IOtpService } from "../../interfaces/service/IOtpService";
import { IOtpStore } from "../../interfaces/service/IOtpStore";

export class resendOtpUsecase implements IResendOtpUsecase {
    constructor(
        private candidateRepository: ICandidateRepository,
        private otpService: IOtpService,
        private otpStore: IOtpStore,
        private mailService: IMailService
    ) {}

    async execute(request: ResendOtpInputDTO): Promise<ResendOtpOutputDTO> {
        const candidate = await this.candidateRepository.findByEmail(request.email)
        if(!candidate){
            throw new Error('Candidate not found')
        }

        const id = candidate.getId()
        const candidateId = id!

        const otp = this.otpService.generate()

        const hashedOtp = await this.otpService.hash(otp)

        await this.otpStore.saveOtp(candidateId, hashedOtp, 120)

        await this.mailService.sentOtp(request.email, hashedOtp)

        return {
            success: true
        }
    }
}