import { IOtpService } from "../../Application/candidate/interfaces/service/IOtpService";
import bcrypt from 'bcrypt'
import { logger } from "../../utils/logging/loger";

export class OtpService implements IOtpService{
    generate(): string {
        const otp = Math.floor(100000 + Math.random() * 900000)
        logger.info(`your otp is: ${otp}`)
        return otp.toString()
    }

    async hash(otp: string): Promise<string> {
        const saltRounds = 10
        return await bcrypt.hash(otp, saltRounds)
    }

    async compare(EnteredOtp: string, hashedOtp: string): Promise<boolean>{
        return await bcrypt.compare(EnteredOtp, hashedOtp)
    }
}