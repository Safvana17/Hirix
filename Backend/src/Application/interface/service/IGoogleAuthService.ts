import { GoogleAuthDTO } from "../../dtos/LoginCandidateDTO";

export interface IGoogleAuthService {
    getUserInfo(Token: string): Promise<GoogleAuthDTO>
}