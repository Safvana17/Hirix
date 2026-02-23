import { AccessTokenPayload } from "../../Application/candidate/interfaces/service/ITokenService";

declare global {
    namespace Express {
        interface Request {
            user? : AccessTokenPayload,
            cookies?: {
               accessToken?: string,
               refreshToken?: string
            }
        }
    }
}

export {}