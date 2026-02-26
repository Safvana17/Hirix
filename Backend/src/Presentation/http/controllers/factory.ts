import { redisClient } from "../../../Infrastructure/config/redis.config";
//controllers
import { CandidateAuthController } from "./candidate/authController";
import { CompanyAuthController } from "./company/authController";
import { AdminAuthController } from "./admin/authController";

//use case
import { RegisterCandidateUsecase } from "../../../Application/candidate/useCases/auth/RegisterCandidateUsecase";
import { VerifyRegisterCandidateOtpUsecase } from "../../../Application/candidate/useCases/auth/VerifyRegisterCandidateOtpUsecase";
import { ForgotPasswordUsecase  } from "../../../Application/candidate/useCases/auth/ForgotPasswordUsecase";
import { ResetPasswordUsecase } from "../../../Application/candidate/useCases/auth/ResetPasswordUsecase";
import { LoginCandidateUsecase } from "../../../Application/candidate/useCases/auth/LoginCandidateUsecase";
import { RefreshTokenUsecase } from "../../../Application/candidate/useCases/auth/RefreshTokenUsecase";
import { ResendOtpUsecase } from "../../../Application/candidate/useCases/auth/ResendOtpUsecase";
import { RegisterCompanyUsecase } from "../../../Application/company/usecases/RegisterCompanyUsecase";
import { VerifyRegisterCompanyUsecase } from "../../../Application/company/usecases/VerifyCompanyUsecase";
import { ResendOtpCompanyUsecase } from "../../../Application/company/usecases/ResendOtpCompanyUsecase";
import { LoginCompanyUsecase } from "../../../Application/company/usecases/LoginCompanyUsecase";
import { CompanyForgotPasswordUsecase } from "../../../Application/company/usecases/CompanyForgotPasswordUsecase";
import { CompanyResetPasswordUsecase } from "../../../Application/company/usecases/CompanyResetPasswordUsecase";
import { CompanyRefreshTokenUsecase } from "../../../Application/company/usecases/CompanyRefreshTokenUsecase";
import { AdminLogoutUsecase } from "../../../Application/admin/usecases/admin.logout.usecase";
import { CandidateLogoutUsecase } from "../../../Application/candidate/useCases/auth/CandidateLogoutUsecase";
import { CompanyLogoutUsecase } from "../../../Application/company/usecases/CompanyLogoutUsecase";
import { CandidateGoogleLoginUsecase } from "../../../Application/candidate/useCases/auth/GoogleLoginUsecase";
import { CompanyGoogleLoginUsecase } from "../../../Application/company/usecases/company.googleLogin.usecase";

//repositories
import { CandidateRepository } from "../../../Infrastructure/repositories/candidateRepository";
import { OtpRepository } from "../../../Infrastructure/services/OtpStore";
import { AdminLoginUsecase } from "../../../Application/admin/usecases/AdminLoginUsecase";
import { CompanyRepository } from "../../../Infrastructure/repositories/companyRepository";
import { AdminRepository } from "../../../Infrastructure/repositories/adminRepository";


//services
import { HashService } from "../../../Infrastructure/services/HashService";
import { OtpService } from "../../../Infrastructure/services/OtpService";
import { TokenService } from "../../../Infrastructure/services/TokenService";
import { MailService } from "../../../Infrastructure/services/MailService";
import { GoogleAuthService } from "../../../Infrastructure/services/GoogleAuthService";



const iCandidateRepository = new CandidateRepository()
const iCompanyRepository = new CompanyRepository()
const iAdminRepository = new AdminRepository()
const iOtpRepository = new OtpRepository(redisClient)

const iHashService = new HashService()
const iOtpService = new OtpService()
const iTokenService = new TokenService()
const iMailService = new MailService()
const iGoogleAuthService = new GoogleAuthService()


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
    iCandidateRepository,
    iHashService
)

const iLogoutCandidate = new CandidateLogoutUsecase(
    iCandidateRepository,
    iHashService
)

const iCandidateGoogleLogin = new CandidateGoogleLoginUsecase(
    iCandidateRepository,
    iTokenService,
    iHashService,
    iGoogleAuthService,
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
    iTokenService,
    iHashService
)

const iLogoutCompany = new CompanyLogoutUsecase(
    iCompanyRepository,
    iHashService
)

const iCompanyGoogleLogin = new CompanyGoogleLoginUsecase(
    iCompanyRepository,
    iTokenService,
    iHashService,
    iGoogleAuthService
)

//admin

const iLoginAdmin = new AdminLoginUsecase(
    iAdminRepository,
    iHashService,
    iTokenService
)

const iLogoutAdmin = new AdminLogoutUsecase(
    iAdminRepository,
    iHashService
)

export const iCandidateAuthController = new CandidateAuthController(
    iRegisterCandidate,
    iVerifyRegisterCandidate,
    iResendOtp,
    iLoginCandidate,
    iForgotPassword,
    iResetPassword,
    iRefreshToken,
    iLogoutCandidate,
    iCandidateGoogleLogin
)

export const iCompanyAuthController = new CompanyAuthController(
    iRegisterCompany,
    iVerifyCompany,
    iResendOtpCompny,
    iLoginCompany,
    iCompanyForgotPassword,
    iCompanyResetPassword,
    iCompanyRefreshToken,
    iLogoutCompany,
    iCompanyGoogleLogin
)

export const iAdminAuthController = new AdminAuthController(
    iLoginAdmin,
    iLogoutAdmin
)