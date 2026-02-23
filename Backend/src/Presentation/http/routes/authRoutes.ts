import Express from 'express'
import { iCandidateAuthController, iCompanyAuthController } from '../controllers/factory'
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

export default router;