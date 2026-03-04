import React, { useEffect, useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../redux/store'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { clearError, forgotPassword } from '../../../redux/slices/features/auth/authSlice'
import toast from 'react-hot-toast'

const ForgotPassword: React.FC= () => {

    const [email, setEmail] = useState('')
    // const [message, setMessage] = useState<string | null>(null)
    const { loading, error } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch<AppDispatch>()

    const role = location.pathname.includes('candidate')? 'candidate' : 'company' 

    useEffect(() => {
        return () => {
            dispatch(clearError())
        }
    }, [dispatch])

    const handleSubmit = async(e: React.FormEvent) => {
          e.preventDefault()
          const result = await dispatch(forgotPassword({role, email}))
          if(forgotPassword.fulfilled.match(result)){
             toast.success('OTP has been sent to your email')
             setTimeout(() => navigate(`/${role}/verifyotp`, {state: {email,role, type: 'forgotpassword'}}), 2000)
          }
    }

  return (
    <AuthLayout title='Forgot Password' subtitle='Enter your email to reset your password'> 
        <form onSubmit={handleSubmit}>
            <div>
                <label className='block text-sm font-medium text-white mb-2'>Email</label>
                <input
                   type='email'
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder='name@gmail.com'
                   className='bg-white w-full rounded-xl px-4 py-3 text-black '
                   required
                />
            </div>
            {error && <p className='text-red-500 text-sm'>{error}</p>}
            {/* {message && <p className='text-green-500 text-sm'>{message}</p>} */}

            <button 
               type='submit'
               disabled={loading}
               className='w-40 bg-[#E9C788] text-white rounded-xl disabled:opacity-50'>
                {loading? 'Sending...' : 'Send OTP'}
            </button>

            <div className='text-center text-sm'>
                <Link to={`/${role}/login`} className='text-black'>
                   Back to login
                </Link>
            </div>
        </form>
    </AuthLayout>
  )
}

export default ForgotPassword
