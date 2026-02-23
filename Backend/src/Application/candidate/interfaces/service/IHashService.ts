export interface IHashService {
    hash(password: string): Promise<string>
    // hashToken(token: string): Promise<string>
    compare(password: string, hashedPassword: string): Promise<boolean>
}