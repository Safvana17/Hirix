import { IHashService } from "../../Application/candidate/interfaces/service/IHashService";
import bcrypt from 'bcrypt'

export class hashService implements IHashService{
    async hash(password: string): Promise<string> {
        const saltRounds = 10
        return await bcrypt.hash(password, saltRounds)
    }

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword)
    }
}