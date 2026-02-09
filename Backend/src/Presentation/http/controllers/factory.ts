import { redisClient } from "../../../Infrastructure/config/redis.config";
//controllers
import { authController } from "./candidate/authController";

//use case
import { registerCandidateUsecase } from "../../../Application/candidate/useCases/auth/RegisterCandidateUsecase";
import { VerifyRegisterCandidateOtpUsecase } from "../../../Application/candidate/useCases/auth/VerifyRegisterCandidateOtpUsecase";


//repositories
import { candidateRepository } from "../../../Infrastructure/repositories/candidateRepository";
import { otpRepository } from "../../../Infrastructure/services/OtpStore";


//services
import { hashService } from "../../../Infrastructure/services/HashService";
import { OtpService } from "../../../Infrastructure/services/OtpService";
import { TokenService } from "../../../Infrastructure/services/TokenService";
import { mailService } from "../../../Infrastructure/services/MailService";
import { loginCandidateUsecase } from "../../../Application/candidate/useCases/auth/LoginCandidateUsecase";
import { resendOtpUsecase } from "../../../Application/candidate/useCases/auth/ResendOtpUsecase";


const iCandidateRepository = new candidateRepository()
const iOtpRepository = new otpRepository(redisClient)

const iHashService = new hashService()
const iOtpService = new OtpService()
const iTokenService = new TokenService()
const iMailService = new mailService()


const iVerifyRegisterCandidate = new VerifyRegisterCandidateOtpUsecase(
    iCandidateRepository,
    iOtpRepository,
    iOtpService,
    iTokenService
)
const iRegisterCandidate = new registerCandidateUsecase(
    iCandidateRepository,
    iHashService,
    iOtpService,
    iOtpRepository,
    iMailService
)

const iResendOtp = new resendOtpUsecase(
    iCandidateRepository,
    iOtpService,
    iOtpRepository,
    iMailService
)

const iLoginCandidate = new loginCandidateUsecase(
    iCandidateRepository,
    iTokenService,
    iHashService
)


export const iAuthController = new authController(
    iRegisterCandidate,
    iVerifyRegisterCandidate,
    iResendOtp,
    iLoginCandidate
)