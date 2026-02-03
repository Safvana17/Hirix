import userRole from "../../../Domain/enums/userRole.enum"

export interface verifyRegisterCandidateOtpInputDTO {
    email: string
    otp: string
}

export interface verifyRegisterCandidateOtpOutputDTO {
    accessToken: string
    refreshToken: string
    candidate: {
        id: string,
        name: string,
        email: string,
        role: userRole
    }
}