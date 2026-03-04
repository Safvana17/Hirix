import { Suspense, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { getMe } from '../redux/slices/features/auth/authSlice'
import type { AppDispatch } from '../redux/store'
import Home from '../presentation/pages/home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthGatewayPage from '../presentation/pages/auth/AuthGatewayPage'
import VerifyOtp from '../presentation/pages/auth/VerifyOtp'
import CompanyDashboard from '../presentation/pages/company/CompanyDashboard'
import CandidateDashboard from '../presentation/pages/candidate/CandidateDashboard'
import ForgotPassword from '../presentation/pages/auth/ForgotPassword'
import ResetPassword from '../presentation/pages/auth/ResetPassword'
import AdminLogin from '../presentation/pages/auth/AdminLogin'
import AdminDashboard from '../presentation/pages/admin/AdminDashboard'

const App = () => {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])


  return (
     <BrowserRouter>
       <Toaster position='top-right' />
       <Suspense fallback={
        <div className='flex h-screen items-center justify-content'>
          <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary-600'></div>
        </div>
       }>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<AuthGatewayPage />}/>
          <Route path='/signup' element={<AuthGatewayPage />}/>

          <Route path='/company/verifyotp' element={<VerifyOtp />} />
          <Route path='/company/forgotpassword' element={<ForgotPassword />} />
          <Route path='/company/resetpassword' element={<ResetPassword />} />
          <Route path='/company/dashboard' element={<CompanyDashboard />} />


          <Route path='/candidate/verifyotp' element={<VerifyOtp />} />
          <Route path='/candidate/forgotpassword' element={<ForgotPassword />} />
          <Route path='/candidate/resetpassword' element={<ResetPassword /> } />
          <Route path='/candidate/dashboard' element={<CandidateDashboard />} />


          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<AdminDashboard /> } />
          
        </Routes>
       </Suspense>
     </BrowserRouter>
  )
}

export default App


