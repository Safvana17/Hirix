import { AppError } from "../../../Domain/errors/AppError";
import ICompanyRepository from "../../../Domain/repositoryInterface/ICompanyRepository";
import { authMessages } from "../../../Shared/constsnts/messages/authMessages";
import { statusCode } from "../../../Shared/Enumes/statusCode";
import { ITokenService } from "../../interface/service/ITokenService";
import { CompanyRefreshTokenInputDTO, CompanyRefreshTokenOutputDTO } from "../dtos/CompanyRefreshTokenDTO";
import { ICompanyRefreshTokenUsecase } from "../interfaces/auth/ICompanyRefreshTokenUsecase";

export class CompanyRefreshTokenUsecase implements ICompanyRefreshTokenUsecase{
    constructor(
        private companyRepository: ICompanyRepository,
        private tokenService: ITokenService
    ) {}

    async execute(request: CompanyRefreshTokenInputDTO): Promise<CompanyRefreshTokenOutputDTO> {
        if(!request.token){
            throw new AppError(authMessages.error.REFRESH_TOKEN_NOT_FOUND, statusCode.UNAUTHORIZED)
        }

        const payload = this.tokenService.verifyRefreshToken(request.token)
        const companyId = payload.id

        if(!companyId){
            throw new AppError(authMessages.error.INVALID_REFRESH_TOKEN, statusCode.UNAUTHORIZED)
        }

        const candidate = await this.companyRepository.findById(companyId)
        if(!candidate){
            throw new AppError(authMessages.error.COMPANY_NOT_FOUND, statusCode.NOT_FOUND)
        }

        const newAccessToken = this.tokenService.generateAccessToken({
            id: companyId,
            email: candidate.getEmail(),
            role: candidate.getRole()
        })

        const newRefereshToken = this.tokenService.generateRefreshToken({id: companyId})

        return {
            companyId,
            accessToken: newAccessToken,
            refreshToken: newRefereshToken
        }
    }
}