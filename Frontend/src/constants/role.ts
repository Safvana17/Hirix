export const ROLES = {
    ADMIN: 'admin',
    CANDIDATE: 'candidate',
    COMPANY: 'company'
}

export type UserRole = typeof ROLES[keyof typeof ROLES]