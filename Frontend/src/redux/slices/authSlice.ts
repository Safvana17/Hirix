import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { UserRole } from "../../constants/role";
import type { AuthState, LoginPayload, User } from "../../types/user";
import api from "../../lib/axios";


const initialState: AuthState = {
    user: null,
    loading: true,
    error: null,
    role: (localStorage.getItem('userRole') as UserRole) || null,
    isAuthenticated: false
}

// interface LoginPayload {
//     role: UserRole;
//     data: {
//         email: string;
//         password: string;
//     }
// }

export const loginUser = createAsyncThunk< 
{user: User; role: UserRole}, LoginPayload, {rejectValue: string}
> ('auth/login', async({role, data}, {rejectWithValue}) => {
    try {
        const response = await api.post(`/${role}/login`, data);
        const user = response.data.candidate ||
                     response.data.company ||
                     response.data.admin
        return {user, role}
    } catch (error) {
        return rejectWithValue(`login failed: ${error}`)
    }
})

export const logoutUser = createAsyncThunk <
void,
UserRole,
{rejectValue: string}
> ('auth/logout', async(role, {rejectWithValue}) => {
    try {
        await api.post(`/${role}/logout`)
    } catch (error) {
        return rejectWithValue(`Logout failed: ${error}`)
    }
})

export const getMe = createAsyncThunk <
{user: User, role: UserRole},
void,
{ rejectValue: string}
> ('auth/getMe', async(_, {rejectWithValue}) => {
    const role = localStorage.getItem('userRole') as UserRole | null

    if(!role) {
        return rejectWithValue('Norole found')
    }

    try {
        const response = await api.get(`/${role}/me`)
        const user = response.data.candidate || response.data.company || response.data.admin

        return {user, role}
    } catch (error) {
        return rejectWithValue(`session expired: ${error}`)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (bulider) => {
        bulider
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.role = action.payload.role
            state.isAuthenticated = true

            localStorage.setItem('userRole', action.payload.role)
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Login error'
        })
    }
})

export const {clearError} = authSlice.actions;
export default authSlice.reducer
