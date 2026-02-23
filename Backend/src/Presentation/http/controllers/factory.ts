import { redisClient } from "../../../Infrastructure/config/redis.config";
//controllers
import { AuthController } from "./candidate/authController";

//use case
import { RegisterCandidateUsecase } from "../../../Application/candidate/useCases/auth/RegisterCandidateUsecase";
import { VerifyRegisterCandidateOtpUsecase } from "../../../Application/candidate/useCases/auth/VerifyRegisterCandidateOtpUsecase";
import { ForgotPasswordUsecase  } from "../../../Application/candidate/useCases/auth/ForgotPasswordUsecase";
import { ResetPasswordUsecase } from "../../../Application/candidate/useCases/auth/ResetPasswordUsecase";
import { LoginCandidateUsecase } from "../../../Application/candidate/useCases/auth/LoginCandidateUsecase";

//repositories
import { CandidateRepository } from "../../../Infrastructure/repositories/candidateRepository";
import { OtpRepository } from "../../../Infrastructure/services/OtpStore";


//services
import { HashService } from "../../../Infrastructure/services/HashService";
import { OtpService } from "../../../Infrastructure/services/OtpService";
import { TokenService } from "../../../Infrastructure/services/TokenService";
import { MailService } from "../../../Infrastructure/services/MailService";
import { ResendOtpUsecase } from "../../../Application/candidate/useCases/auth/ResendOtpUsecase";
// import { GoogleLoginUsecase } from "../../../Application/candidate/useCases/auth/GoogleLoginUsecase";
// import { GoogleAuthService } from "../../../Infrastructure/services/GoogleAuthService";


const iCandidateRepository = new CandidateRepository()
const iOtpRepository = new OtpRepository(redisClient)

const iHashService = new HashService()
const iOtpService = new OtpService()
const iTokenService = new TokenService()
const iMailService = new MailService()
// const iGoogleAuthService = new GoogleAuthService()


const iVerifyRegisterCandidate = new VerifyRegisterCandidateOtpUsecase(
    iCandidateRepository,
    iOtpRepository,
    iOtpService,
    iTokenService
)
const iRegisterCandidate = new RegisterCandidateUsecase(
    iCandidateRepository,
    iHashService,
    iOtpService,
    iOtpRepository,
    iMailService
)

const iResendOtp = new ResendOtpUsecase(
    iCandidateRepository,
    iOtpService,
    iOtpRepository,
    iMailService
)

const iLoginCandidate = new LoginCandidateUsecase(
    iCandidateRepository,
    iTokenService,
    iHashService
)

const iForgotPassword = new ForgotPasswordUsecase(
    iCandidateRepository,
    iOtpService,
    iOtpRepository,
    iMailService
)

const iResetPassword = new ResetPasswordUsecase(
    iCandidateRepository,
    iOtpService,
    iOtpRepository,
    iHashService
)

// const iGoogleLogin = new GoogleLoginUsecase(
//     iCandidateRepository,
//     iGoogleAuthService,
//     iTokenService
// )

export const iAuthController = new AuthController(
    iRegisterCandidate,
    iVerifyRegisterCandidate,
    iResendOtp,
    iLoginCandidate,
    iForgotPassword,
    iResetPassword,
    iCandidateRepository,
    // iGoogleLogin
)