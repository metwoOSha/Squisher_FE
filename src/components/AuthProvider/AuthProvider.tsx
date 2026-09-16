import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { getMe, login, logout, register } from '@/api/Auth.api';
import { AuthContext } from '@/hooks/useAuth';
import type { LoginBody, RegisterBody, User } from '@/types/user.types';

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    /* A 401 here is the normal "guest" case — restore the session silently. */
    const restoreSession = useCallback(async () => {
        try {
            setUser(await getMe());
        } catch {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void restoreSession();
    }, [restoreSession]);

    const handleLogin = useCallback(async (body: LoginBody) => {
        await login(body);
        setUser(await getMe());
    }, []);

    const handleRegister = useCallback(async (body: RegisterBody) => {
        await register(body);
        setUser(await getMe());
    }, []);

    const handleLogout = useCallback(async () => {
        await logout();
        setUser(null);
    }, []);

    const value = useMemo(
        () => ({
            user,
            isLoading,
            isAuthenticated: Boolean(user),
            handleLogin,
            handleRegister,
            handleLogout,
        }),
        [user, isLoading, handleLogin, handleRegister, handleLogout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
