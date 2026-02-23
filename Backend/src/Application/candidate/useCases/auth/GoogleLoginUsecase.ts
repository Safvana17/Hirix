import userRole from "../../../../Domain/enums/userRole.enum";
import { AppError } from "../../../../Domain/errors/AppError";
import ICandidateRepository from "../../../../Domain/repositoryInterface/ICandidateRepository";
import { authMessages } from "../../../../Shared/constsnts/messages/authMessages";
import { statusCode } from "../../../../Shared/Enumes/statusCode";
import { logger } from "../../../../utils/logging/loger";
import { LoginCandidateOutputDTO } from "../../dtos/LoginCandidateDTO";
import { IGoogleLoginUsecase } from "../../interfaces/auth/IGoogleLoginUsecase";
import { IGoogleAuthService } from "../../interfaces/service/IGoogleAuthService";
import { ITokenService } from "../../interfaces/service/ITokenService";

export class GoogleLoginUsecase implements IGoogleLoginUsecase{
    constructor(
        private candidateRepository: ICandidateRepository,
        private googleAuthService: IGoogleAuthService,
        private tokenService: ITokenService
    ) {}

    async execute(token: string, role: userRole): Promise<LoginCandidateOutputDTO> {
        logger.info(`userRole: ${role}`)
        const googleCandidate = await this.googleAuthService.getUserInfo(token)
        const candidate = await this.candidateRepository.findByEmail(googleCandidate.email)
        if(!candidate || !candidate.getId() || !candidate.getRole()){
            throw new AppError(authMessages.error.CANDIDATE_NOT_FOUND, statusCode.NOT_FOUND)
        }
        if(!candidate.getGoogleId()){
            await this.candidateRepository.updateGoogleId(googleCandidate.email, googleCandidate.googleId)
        }else if(candidate.getGoogleId() !== googleCandidate.googleId){
            throw new AppError(authMessages.error.INVALID_GOOGLE_ID, statusCode.BAD_REQUEST)
        }

        const id = candidate.getId()
        const candidateId = id!
        const refreshToken = this.tokenService.generateRefreshToken({candidateId})
        const accessToken = this.tokenService.generateAccessToken({
            candidateId,
            email: candidate.getEmail(),
            role: candidate.getRole()
        })

        return {refreshToken, accessToken, candidate:{
            id: candidateId,
            email: candidate.getEmail(),
            name: candidate.getName(),
            role: candidate.getRole()
        }}
    }
}