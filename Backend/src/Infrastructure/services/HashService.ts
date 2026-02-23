import { IHashService } from "../../Application/candidate/interfaces/service/IHashService";
import bcrypt from 'bcrypt'

export class HashService implements IHashService{
    async hash(password: string): Promise<string> {
        const saltRounds = 10
        return await bcrypt.hash(password, saltRounds)
    }

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword)
    }

    // async hashToken(token: string): Promise<string> {
    //     return await crypto.createHash("sha256").update(token).digest("hex")
    // }
}