import { AppError } from "../../../Domain/errors/AppError";
import ICompanyRepository from "../../../Domain/repositoryInterface/ICompanyRepository";
import { authMessages } from "../../../Shared/constsnts/messages/authMessages";
import { statusCode } from "../../../Shared/Enumes/statusCode";
import { IHashService } from "../../interface/service/IHashService";
import { ITokenService } from "../../interface/service/ITokenService";
import { LoginCompanyInputDTO, LoginCompanyOutputDTO } from "../dtos/LoginCompanyDTO";
import { ILoginCompanyUsecase } from "../interfaces/auth/ILoginCompanyUsecase";

export class LoginCompanyUsecase implements ILoginCompanyUsecase{
    constructor(
        private companyRepository: ICompanyRepository,
        private tokenService: ITokenService,
        private hashService: IHashService
    ) {}

    async execute(request: LoginCompanyInputDTO): Promise<LoginCompanyOutputDTO> {
        const company = await this.companyRepository.findByEmail(request.email)
        if(!company){
            throw new AppError(authMessages.error.COMPANY_NOT_FOUND, statusCode.NOT_FOUND)
        }

        const isValidPassword = await this.hashService.compare(request.password, company.getPassword())
        if(!isValidPassword){
            throw new AppError(authMessages.error.INVALID_PASSWORD, statusCode.BAD_REQUEST)
        }

        const id = company.id
        if(!id){
            throw new AppError(authMessages.error.COMPANY_ID_NOT_FOUND, statusCode.NOT_FOUND)
        }

        const refreshToken =  this.tokenService.generateRefreshToken({id: id})
        const accessToken = this.tokenService.generateAccessToken({id: id, email: company.getEmail(), role: company.getRole()})

        return {
            accessToken,
            refreshToken,
            company: {
                id: id,
                name: company.getName(),
                email: company.getEmail(),
                role: company.getRole()
            }
        }
    }
}