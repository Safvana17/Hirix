
export interface AccessTokenPayload { 
    candidateId: string;
    email: string;
    role: string
}

export interface RefreshTokenPayload {
    candidateId: string;
}


export interface ITokenService {
    generateAccessToken(payload: AccessTokenPayload): string
    generateRefreshToken(payload: RefreshTokenPayload): string
    verifyAccessToken(token: string): AccessTokenPayload
    verifyRefreshToken(token: string): RefreshTokenPayload
}