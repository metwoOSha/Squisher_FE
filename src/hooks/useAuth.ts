import { createContext, useContext } from 'react';
import type { LoginBody, RegisterBody, User } from '@/types/user.types';

export interface AuthContextValue {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    handleLogin: (body: LoginBody) => Promise<void>;
    handleRegister: (body: RegisterBody) => Promise<void>;
    handleLogout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
}
