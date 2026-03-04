import React, { useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import LoginBg from '../../../assets/images/LoginImage.jpg'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../redux/store'
import { loginSchema } from '../../../lib/validation/authValidation'
import { ZodError } from 'zod'
import { adminLogin } from '../../../redux/slices/features/auth/adminAuthSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AdminLogin: React.FC= () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState<Record<string, string>>({})

    const { loading } = useSelector((state: RootState) => state.adminAuth)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const validate = () => {
        try {
            loginSchema.parse(formData)
            setError({})
            return true
        } catch (error) {
            if(error instanceof ZodError){
                const errors: Record<string, string> = {}
                error.issues.forEach((issue) => {
                    const field = issue.path[0]
                    if(typeof field === 'number' || typeof field === 'string')
                       errors[field] = issue.message
                })
                setError(errors)
            }
            return false
        }
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        if(!validate()) return
        const result = await dispatch(adminLogin({email: formData.email, password: formData.password}))

        if(adminLogin.fulfilled.match(result)){
            toast.success('Admin logged in successfully')
            navigate('/admin/dashboard')
        }

        if(adminLogin.rejected.match(result)){
            toast.error(result.payload || 'Failed to login')
        }
    }
  return (
    <AuthLayout title='Welcome, Nice to see you again' subtitle=''>
      <div className='grid md:grid-cols-2 gap-0'>
       <div>
         <img src={LoginBg} alt="Auth image" className='w-full h-full object-cover'/>
       </div>
        <div>
          <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm text-black font-medium mb-1'>Email</label>
                <input 
                    type='email'
                    placeholder='example@gmail.com'
                    required
                    className='w-full bg-white rounded-xl px-4 py-3 text-black '
                    onChange={(e) => setFormData({...formData, email: e.target.value }) }
                />
                {error.email && <p className='text-red-500 text-sm'>{error.email}</p>}
              </div>

              <div>
                <label className='block text-sm text-black font-medium mb-1'>Password</label>
                <input 
                    type='password'
                    placeholder='••••••••'
                    required
                    className='w-full bg-white rounded-xl px-4 py-3 text-black '
                    onChange={(e) => setFormData({...formData, password: e.target.value }) }
                />
                {error.password && <p className='text-red-500 text-sm'>{error.password}</p>}
              </div>

              <button
                type='submit'
                disabled={loading}
                className='w-50 bg-[#E9C788] rounded-xl text-white font-bold disabled:opacity-50'
              >
                {loading ? 'logging...' : 'Login'}
              </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default AdminLogin
