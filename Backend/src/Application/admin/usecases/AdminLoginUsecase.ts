import { AppError } from "../../../Domain/errors/AppError";
import IAdminRepository from "../../../Domain/repositoryInterface/IAdminRepository";
import { authMessages } from "../../../Shared/constsnts/messages/authMessages";
import { statusCode } from "../../../Shared/Enumes/statusCode";
import { IHashService } from "../../interface/service/IHashService";
import { ITokenService } from "../../interface/service/ITokenService";
import { LoginAdminInputDto, LoginAdminOutputDTO } from "../dtos/LoginAdminDTO";
import { IAdminLoginUsecase } from "../interfaces/IAdminLoginUsecase";

export class AdminLoginUsecase implements IAdminLoginUsecase {
    constructor(
        private adminRepository: IAdminRepository,
        private hashService: IHashService,
        private tokenService: ITokenService
    ) {}

    /**
     * 
     * @param request login request with credentials
     * @returns access token, refresh token and admin details
     */
    async execute(request: LoginAdminInputDto): Promise<LoginAdminOutputDTO> {
        const admin = await this.adminRepository.findByEmail(request.email)
        if(!admin){
            throw new AppError(authMessages.error.ADMIN_NOT_FOUND, statusCode.NOT_FOUND)
        }

        const iValidPassword = await this.hashService.compare(request.password, admin.password)
        if(!iValidPassword){
            throw new AppError(authMessages.error.INVALID_PASSWORD, statusCode.BAD_REQUEST)
        } 

        const id = admin.id
        if(!id){
            throw new AppError(authMessages.error.ADMIN_NOT_FOUND, statusCode.NOT_FOUND)
        }

        const refreshToken = this.tokenService.generateRefreshToken({candidateId: id})
        const accessToken = this.tokenService.generateAccessToken({candidateId: id, email: admin.email, role: admin.role})

        return {
           accessToken,
           refreshToken,
           admin
        }
    }
}