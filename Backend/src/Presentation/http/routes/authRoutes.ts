import Express from 'express'
import { iAdminAuthController, iCandidateAuthController, iCompanyAuthController } from '../controllers/factory'
const router = Express.Router()


//candidate
router.post('/candidate/register', iCandidateAuthController.register)
router.post('/candidate/verifyotp', iCandidateAuthController.VerifyOtp)
router.post('/candidate/resendotp', iCandidateAuthController.resendOtp)
router.post('/candidate/login', iCandidateAuthController.login)
router.post('/candidate/forgotpassword', iCandidateAuthController.forgotPassword)
router.post('/candidate/resetpassword', iCandidateAuthController.resetPassword)
router.post('/candidate/refresh', iCandidateAuthController.refreshToken)
// router.post('/candidate/google-login', iAuthController.googleLogin)


//company
router.post('/company/register', iCompanyAuthController.register)
router.post('/comapny/verifyotp', iCompanyAuthController.verifyOtp)
router.post('/company/resendotp', iCompanyAuthController.resendOtp)
router.post('/company/login', iCompanyAuthController.login)
// router.post('/company/forgotpassword', iCompanyAuthController.forgotPassword)
// router.post('/company/resetpassword', iCompanyAuthController.resetPassword)
// router.post('/ccompany/refresh', iCompanyAuthController.refreshToken)


//admin
router.post('/admin/login', iAdminAuthController.login)

export default router;