import { AppError } from "../../../../Domain/errors/AppError";
import ICandidateRepository from "../../../../Domain/repositoryInterface/ICandidateRepository";
import { authMessages } from "../../../../Shared/constsnts/messages/authMessages";
import { statusCode } from "../../../../Shared/Enumes/statusCode";
import { LoginCandidateInputDTO, LoginCandidateOutputDTO } from "../../dtos/LoginCandidateDTO";
import { IHashService } from "../../../interface/service/IHashService";
import { ITokenService } from "../../../interface/service/ITokenService";

export class LoginCandidateUsecase {
    constructor(
        private candidateRepository: ICandidateRepository,
        private tokenService: ITokenService,
        private hashService: IHashService
    ) {}

    /**
     * 
     * @param request - login credentials (email, password)
     * @returns - Authentication result with tokens and user info
     */
    async execute(request: LoginCandidateInputDTO): Promise<LoginCandidateOutputDTO> {

        const candidate = await this.candidateRepository.findByEmail(request.email)
        if(!candidate){
            throw new AppError(authMessages.error.CANDIDATE_NOT_FOUND, statusCode.NOT_FOUND)
        }

        const isValidPassword = await this.hashService.compare(request.password, candidate.getPassword())
        if(!isValidPassword){
            throw new AppError(authMessages.error.INVALID_PASSWORD, statusCode.UNAUTHORIZED)
        }

        const id = candidate.getId()
        const candidateId = id!;
        if(!id){
            throw new AppError(authMessages.error.CANDIDATE_ID_NOT_FOUND, statusCode.NOT_FOUND)
        }

        const refreshToken = this.tokenService.generateRefreshToken({candidateId})
        const accessToken = this.tokenService.generateAccessToken({candidateId, email: candidate.getEmail(), role: candidate.getRole()})

        // const hashedRefreshToken = this.hashService.hashToken(refreshToken)
        // await this.candidateRepository.updateToken(candidateId, refreshToken)


        return {refreshToken, accessToken, candidate: {
            id: candidateId,
            email: candidate.getEmail(),
            name: candidate.getName(),
            role: candidate.getRole()
        }}

    }
}