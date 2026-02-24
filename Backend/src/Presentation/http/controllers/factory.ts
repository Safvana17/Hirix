import { redisClient } from "../../../Infrastructure/config/redis.config";
//controllers
import { CandidateAuthController } from "./candidate/authController";

//use case
import { RegisterCandidateUsecase } from "../../../Application/candidate/useCases/auth/RegisterCandidateUsecase";
import { VerifyRegisterCandidateOtpUsecase } from "../../../Application/candidate/useCases/auth/VerifyRegisterCandidateOtpUsecase";
import { ForgotPasswordUsecase  } from "../../../Application/candidate/useCases/auth/ForgotPasswordUsecase";
import { ResetPasswordUsecase } from "../../../Application/candidate/useCases/auth/ResetPasswordUsecase";
import { LoginCandidateUsecase } from "../../../Application/candidate/useCases/auth/LoginCandidateUsecase";
import { RefreshTokenUsecase } from "../../../Application/candidate/useCases/auth/RefreshTokenUsecase";
//repositories
import { CandidateRepository } from "../../../Infrastructure/repositories/candidateRepository";
import { OtpRepository } from "../../../Infrastructure/services/OtpStore";


//services
import { HashService } from "../../../Infrastructure/services/HashService";
import { OtpService } from "../../../Infrastructure/services/OtpService";
import { TokenService } from "../../../Infrastructure/services/TokenService";
import { MailService } from "../../../Infrastructure/services/MailService";
import { ResendOtpUsecase } from "../../../Application/candidate/useCases/auth/ResendOtpUsecase";
import { CompanyAuthController } from "./company/authController";
import { RegisterCompanyUsecase } from "../../../Application/company/usecases/RegisterCompanyUsecase";
import { CompanyRepository } from "../../../Infrastructure/repositories/companyRepository";
import { AdminAuthController } from "./admin/authController";
import { AdminLoginUsecase } from "../../../Application/admin/usecases/AdminLoginUsecase";
import { AdminRepository } from "../../../Infrastructure/repositories/adminRepository";
import { VerifyRegisterCompanyUsecase } from "../../../Application/company/usecases/VerifyCompanyUsecase";
import { ResendOtpCompanyUsecase } from "../../../Application/company/usecases/ResendOtpCompanyUsecase";
import { LoginCompanyUsecase } from "../../../Application/company/usecases/LoginCompanyUsecase";
import { CompanyForgotPasswordUsecase } from "../../../Application/company/usecases/CompanyForgotPasswordUsecase";
import { CompanyResetPasswordUsecase } from "../../../Application/company/usecases/CompanyResetPasswordUsecase";
import { CompanyRefreshTokenUsecase } from "../../../Application/company/usecases/CompanyRefreshTokenUsecase";
// import { GoogleLoginUsecase } from "../../../Application/candidate/useCases/auth/GoogleLoginUsecase";
// import { GoogleAuthService } from "../../../Infrastructure/services/GoogleAuthService";


const iCandidateRepository = new CandidateRepository()
const iCompanyRepository = new CompanyRepository()
const iAdminRepository = new AdminRepository()
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

const iRefreshToken = new RefreshTokenUsecase (
    iTokenService,
    iCandidateRepository
)


//company

const iRegisterCompany = new RegisterCompanyUsecase(
      iCompanyRepository,
      iOtpService,
      iOtpRepository,
      iHashService,
      iMailService
)

const iVerifyCompany = new VerifyRegisterCompanyUsecase(
    iCompanyRepository,
    iOtpService,
    iOtpRepository
)

const iResendOtpCompny = new ResendOtpCompanyUsecase(
    iCompanyRepository,
    iMailService,
    iOtpRepository,
    iOtpService
)

const iLoginCompany = new LoginCompanyUsecase(
    iCompanyRepository,
    iTokenService,
    iHashService
)

const iCompanyForgotPassword = new CompanyForgotPasswordUsecase(
    iCompanyRepository,
    iMailService,
    iOtpService,
    iOtpRepository
)

const iCompanyResetPassword = new CompanyResetPasswordUsecase(
    iCompanyRepository,
    iOtpRepository,
    iOtpService,
    iHashService
)

const iCompanyRefreshToken = new CompanyRefreshTokenUsecase(
    iCompanyRepository,
    iTokenService
)

//admin

const iLoginAdmin = new AdminLoginUsecase(
    iAdminRepository,
    iHashService,
    iTokenService
)
// const iGoogleLogin = new GoogleLoginUsecase(
//     iCandidateRepository,
//     iGoogleAuthService,
//     iTokenService
// )

export const iCandidateAuthController = new CandidateAuthController(
    iRegisterCandidate,
    iVerifyRegisterCandidate,
    iResendOtp,
    iLoginCandidate,
    iForgotPassword,
    iResetPassword,
    iCandidateRepository,
    iHashService,
    iRefreshToken
    // iGoogleLogin
)

export const iCompanyAuthController = new CompanyAuthController(
    iRegisterCompany,
    iVerifyCompany,
    iResendOtpCompny,
    iLoginCompany,
    iHashService,
    iCompanyRepository,
    iCompanyForgotPassword,
    iCompanyResetPassword,
    iCompanyRefreshToken
)

export const iAdminAuthController = new AdminAuthController(
    iLoginAdmin,
    iHashService,
    iAdminRepository
)