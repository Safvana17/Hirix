import Express from 'express'
import { iAuthController } from '../controllers/factory'
const router = Express.Router()


//candidate
router.post('/candidate/register', iAuthController.register)
router.post('/candidate/verifyotp', iAuthController.VerifyOtp)
router.post('/candidate/resendotp', iAuthController.resendOtp)
router.post('/candidate/login', iAuthController.login)
router.post('/candidate/forgotpassword', iAuthController.forgotPassword)
router.post('/candidate/resetpassword', iAuthController.resetPassword)




export default router;