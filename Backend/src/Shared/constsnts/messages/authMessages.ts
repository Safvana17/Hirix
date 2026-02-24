export const authMessages = {
    success: {
        CANDIDATE_REGISTER_SUCCESS: 'Candidate registered successfully',
        COMPANY_REGISTER_SUCCESS: 'Company registered successfully',
        CANDIDATE_LOGIN_SUCCESS: 'Candidate logged in successfully',
        COMPANY_LOGIN_SUCCESS: 'Company logges in successfully',
        OTP_SEND_SUCCESS: 'OTP is sent to the email',
        RESET_PASSWORD_OTP_sEND: 'Otp for reset password is send successfully',
        PASSWORD_RESET: 'Password reset successfully',
        TOKEN_REFRESHED: 'Token refreshed successfully',
        ADMIN_LOGIN_SUCCESS: 'Admin logged in successfully'
    },
    error: {
        CONFLICT: "Email already exist",
        BAD_REQUEST: 'Invalid email or password',
        INTERNAL_SERVER_ERROR: 'Internal server error',
        INVALID_GOOGLE_ID: "Invalid google id",
        CANDIDATE_NOT_FOUND: 'Candidate not found',
        COMPANY_NOT_FOUND: 'Company not found',
        ADMIN_NOT_FOUND: 'Admin not found',
        UNAUTHORIZED: 'Unauthorized access',
        INVALID_PASSWORD: 'Invalid passwod',
        OTP_EXPIRED: 'Otp expired',
        INVALID_OTP: 'Invalid otp',
        EMAIL_NOT_FOUND: 'Email not found',
        REFRESH_TOKEN_NOT_FOUND: 'Refresh token is missing',
        INVALID_REFRESH_TOKEN: 'Invalid refresh token payload',
        ACCESS_TOKEN_EXPIRED: 'Access token is expired',
        ALREADY_VERIFIED: 'User already verified',
        //candidate
        CANDIDATE_ID_NOT_FOUND: 'Candidate id not found',
        CANDIDATE_ALREADY_EXISTS: 'Candidate with this email already exists',


        //company
        COMPANY_ALREADY_EXISTS: 'Company with this email already exists',
        COMPANY_ID_NOT_FOUND: 'Company id not found',

    }
}