
export interface LoginAdminInputDto {
    email: string,
    password: string
}

export interface LoginAdminOutputDTO {
    accessToken: string
    refreshToken: string
}