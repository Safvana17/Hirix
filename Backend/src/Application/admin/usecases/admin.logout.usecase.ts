import IAdminRepository from "../../../Domain/repositoryInterface/IAdminRepository";
import { IAdminLogoutUsecase } from "../interfaces/IAdminLogoutUsecase";
import { IHashService } from "../../interface/service/IHashService";

export class AdminLogoutUsecase implements IAdminLogoutUsecase{
    constructor(
        private _adminRepository: IAdminRepository,
        private _hashService: IHashService
    ) {}

    async execute(refreshToken: string): Promise<void> {
        if(!refreshToken) return

        const hashedRefreshToken = this._hashService.hashToken(refreshToken)

        await this._adminRepository.revokeRefreshToken(hashedRefreshToken)
    
    }
}