import { useState } from 'react';
import type { FormEvent } from 'react';
import clsx from 'clsx';
import ModalOverlay from '@/components/ModalOverlay/ModalOverlay';
import { MIN_PASSWORD_LENGTH } from '@/config';
import { useAuth } from '@/hooks/useAuth';
import type { AuthMode } from '@/types/user.types';
import cls from './AuthModal.module.css';

interface AuthModalProps {
    onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
    const { handleLogin, handleRegister } = useAuth();

    const [mode, setMode] = useState<AuthMode>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isRegister = mode === 'register';

    const switchMode = (next: AuthMode) => {
        setMode(next);
        setError(null);
        setRepeatPassword('');
    };

    /* Catches what the server would reject anyway, so the user sees it sooner. */
    const validate = (): string | null => {
        if (!email.trim()) return 'Enter your email';
        if (password.length < MIN_PASSWORD_LENGTH) {
            return `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`;
        }
        if (isRegister && password !== repeatPassword) return 'Passwords don’t match';
        return null;
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (isSubmitting) return;

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const credentials = { email: email.trim(), password };
            if (isRegister) await handleRegister(credentials);
            else await handleLogin(credentials);

            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong. Try again');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ModalOverlay onClose={onClose}>
            <form onSubmit={handleSubmit} noValidate>
                <div className={cls.tabs}>
                    <button
                        type="button"
                        className={clsx(cls.tab, !isRegister && cls.tabActive)}
                        onClick={() => switchMode('login')}
                    >
                        Sign in
                    </button>
                    <button
                        type="button"
                        className={clsx(cls.tab, isRegister && cls.tabActive)}
                        onClick={() => switchMode('register')}
                    >
                        Sign up
                    </button>
                </div>

                <label className={cls.label} htmlFor="auth-email">
                    Email
                </label>
                <input
                    id="auth-email"
                    className={cls.input}
                    type="email"
                    autoComplete="email"
                    placeholder="you@mail.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <label className={clsx(cls.label, cls.labelSpaced)} htmlFor="auth-password">
                    Password
                </label>
                <input
                    id="auth-password"
                    className={cls.input}
                    type="password"
                    autoComplete={isRegister ? 'new-password' : 'current-password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                {isRegister && (
                    <div>
                        <label className={clsx(cls.label, cls.labelSpaced)} htmlFor="auth-repeat">
                            Repeat password
                        </label>
                        <input
                            id="auth-repeat"
                            className={cls.input}
                            type="password"
                            autoComplete="new-password"
                            placeholder="••••••••"
                            value={repeatPassword}
                            onChange={(event) => setRepeatPassword(event.target.value)}
                        />
                    </div>
                )}

                {error && <p className={cls.error}>{error}</p>}

                <button type="submit" className={cls.submit} disabled={isSubmitting}>
                    {isRegister ? 'Create account' : 'Sign in'}
                </button>
                <button type="button" className={cls.close} onClick={onClose}>
                    Close
                </button>
            </form>
        </ModalOverlay>
    );
}
