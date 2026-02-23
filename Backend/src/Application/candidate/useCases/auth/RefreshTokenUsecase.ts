import { AppError } from "../../../../Domain/errors/AppError";
import ICandidateRepository from "../../../../Domain/repositoryInterface/ICandidateRepository";
import { authMessages } from "../../../../Shared/constsnts/messages/authMessages";
import { statusCode } from "../../../../Shared/Enumes/statusCode";
import { RefreshTokenInputDTO, RefreshTokenOutputDTO } from "../../dtos/RefreshTokenDTO";
import { IRefreshTokenUsecase } from "../../interfaces/auth/IRefreshTokenUsecase";
import { ITokenService } from "../../interfaces/service/ITokenService";

export class RefreshTokenUsecase implements IRefreshTokenUsecase {
    constructor(
        private tokenService: ITokenService,
        private candidateRepository: ICandidateRepository
    ) {}

    /**
     * 
     * @param Request - request for generating new access token
     * @returns - returning new access token and refresh token
     */
    async execute(Request: RefreshTokenInputDTO): Promise<RefreshTokenOutputDTO> {
        if(!Request.token){
            throw new AppError(authMessages.error.REFRESH_TOKEN_NOT_FOUND, statusCode.UNAUTHORIZED)
        }

        const payload = this.tokenService.verifyRefreshToken(Request.token)
        const candidateId = payload.candidateId

        if(!candidateId){
            throw new AppError(authMessages.error.INVALID_REFRESH_TOKEN, statusCode.UNAUTHORIZED)
        }

        const candidate = await this.candidateRepository.findById(candidateId)
        if(!candidate){
            throw new AppError(authMessages.error.CANDIDATE_NOT_FOUND, statusCode.NOT_FOUND)
        }

        const newAccessToken = this.tokenService.generateAccessToken({
            candidateId,
            email: candidate.getEmail(),
            role: candidate.getRole()
        })

        const newRefereshToken = this.tokenService.generateRefreshToken({candidateId})

        return {
            candidateId,
            accessToken: newAccessToken,
            refreshToken: newRefereshToken
        }
    }
}