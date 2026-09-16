import AccentPicker from '@/components/AccentPicker/AccentPicker';
import Logo from '@/components/Logo/Logo';
import UserMenu from '@/components/UserMenu/UserMenu';
import { useAuth } from '@/hooks/useAuth';
import cls from './Header.module.css';

interface HeaderProps {
    accent: string;
    onPickAccent: (color: string) => void;
    onOpenAuth: () => void;
}

export default function Header({ accent, onPickAccent, onOpenAuth }: HeaderProps) {
    const { user, isLoading, handleLogout } = useAuth();

    return (
        <header className={cls.header}>
            <Logo />

            <div className={cls.actions}>
                <AccentPicker accent={accent} onPick={onPickAccent} />

                {/* While /auth/me is in flight neither state is shown, so the header doesn't flicker. */}
                {!isLoading &&
                    (user ? (
                        <UserMenu email={user.email} onLogout={() => void handleLogout()} />
                    ) : (
                        <button type="button" className={cls.signIn} onClick={onOpenAuth}>
                            Sign in
                        </button>
                    ))}
            </div>
        </header>
    );
}
