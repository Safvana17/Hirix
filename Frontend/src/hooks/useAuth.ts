import { useDispatch, useSelector } from "react-redux"
import {type AppDispatch, type RootState } from "../redux/store"
import { clearError, getMe, loginUser, logoutUser } from "../redux/slices/authSlice"
import type { UserRole } from "../constants/role"
import type { LoginData } from "../types/user"

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { user, isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth)

    const handleError = () => dispatch(clearError())

    const login = async (role: UserRole, data: LoginData) => {
        return dispatch(loginUser({role, data})).unwrap()
    }

    const logout = async(role: UserRole) => {
        return dispatch(logoutUser(role)).unwrap()
    }

    const checkAuth = async () => {
        return dispatch(getMe()).unwrap()
    }

    return {
        user,
        isAuthenticated,
        loading,
        error,
        clearError: handleError,
        login,
        logout,
        checkAuth,
        isAdmin: user?.role === 'admin',
        isCandidate: user?.role === 'candidate',
        isCompany: user?.role === 'company'
    }
}