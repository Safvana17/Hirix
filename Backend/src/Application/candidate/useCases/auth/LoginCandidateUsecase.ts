import ICandidateRepository from "../../../../Domain/repositoryInterface/ICandidateRepository";
import { LoginCandidateInputDTO, LoginCandidateOutputDTO } from "../../dtos/loginCandidateDTO";
import { IHashService } from "../../interfaces/service/IHashService";
import { ITokenService } from "../../interfaces/service/ITokenService";

export class loginCandidateUsecase {
    constructor(
        private candidateRepository: ICandidateRepository,
        private tokenService: ITokenService,
        private hashService: IHashService
    ) {}

    async execute(request: LoginCandidateInputDTO): Promise<LoginCandidateOutputDTO> {

        const candidate = await this.candidateRepository.findByEmail(request.email)
        if(!candidate){
            throw new Error('Candidate not found')
        }

        const isValidPassword = await this.hashService.compare(request.password, candidate.getPassword())
        if(!isValidPassword){
            throw new Error('Invalid credentials')
        }

        const id = candidate.getId()
        const candidateId = id!;
        if(!id){
            throw new Error('user id is not found')
        }

        const refreshToken = this.tokenService.generateRefreshToken({candidateId})
        const accessToken = this.tokenService.generateAccessToken({candidateId, email: candidate.getRole(), role: candidate.getRole()})

        return {refreshToken, accessToken, candidate: {
            id: candidateId,
            email: candidate.getEmail(),
            name: candidate.getName(),
            role: candidate.getRole()
        }}

    }
}