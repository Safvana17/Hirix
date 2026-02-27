import type { UserRole } from "../constants/role";
export interface User {
    id: string;
    email: string;
    name: string;
    role: string
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    role: UserRole | null
}

export interface LoginPayload {
    role: UserRole;
    data: {
        email: string;
        password: string;
    }
}

export interface LoginData {
    email: string,
    password: string
}