import AdminEntity from "../../../Domain/entities/admin.entity"

export interface LoginAdminInputDto {
    email: string,
    password: string
}

export interface LoginAdminOutputDTO {
    accessToken: string
    refreshToken: string
    admin: AdminEntity
}