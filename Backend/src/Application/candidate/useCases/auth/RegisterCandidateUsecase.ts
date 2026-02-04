import candidateEntity from "../../../../Domain/entities/Candidate.entity";
import ICandidateRepository from "../../../../Domain/repositoryInterface/ICandidateRepository";
import { RegisterCandidateInputDTO, RegisterCandidateOutputDTO } from "../../dtos/registerCandidateDTO";
import { IOtpService } from "../../interfaces/service/IOtpService";
import { IHashService } from "../../interfaces/service/IHashService";
import { IMailService } from "../../interfaces/service/IMailService";
import { IOtpStore } from "../../interfaces/service/IOtpStore";
import { ICandidateRegisterUsecase } from "../../interfaces/auth/ICandidateRegisterUsecase";

export class registerCandidateUsecase implements ICandidateRegisterUsecase{
    constructor(
        private candidateRepository : ICandidateRepository,
        private hashService: IHashService,
        private otpService: IOtpService,
        private otpStore: IOtpStore,
        private mailService: IMailService
    ) {}

    async execute(request: RegisterCandidateInputDTO): Promise<RegisterCandidateOutputDTO> {

        const userExist = await this.candidateRepository.findByEmail(request.email)

        if(userExist){
            throw new Error('User with this email already exists!')
        }

        const hashedPassword = await this.hashService.hash(request.password)
        const candidate = new candidateEntity(request.name, request.email, hashedPassword, false)

        const savedCandidate = await this.candidateRepository.createCandidate(candidate)

        const otp = this.otpService.generate()
        const hashedOtp = await this.otpService.hash(otp)

        await this.otpStore.saveOtp(savedCandidate.getId()!, hashedOtp, 120)

        await this.mailService.sentOtp(savedCandidate.getEmail(), otp)

        return {
            success: true
        }
    }

}