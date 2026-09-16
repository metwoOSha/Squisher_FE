import AccentPicker from '@/components/AccentPicker/AccentPicker';
import Logo from '@/components/Logo/Logo';
import UserMenu from '@/components/UserMenu/UserMenu';
import { useAuth } from '@/hooks/useAuth';
import mixins from '@/styles/mixins.module.css';
import cls from './Header.module.css';

interface HeaderProps {
    accent: string;
    onPickAccent: (color: string) => void;
    onOpenAuth: () => void;
}

export default function Header({ accent, onPickAccent, onOpenAuth }: HeaderProps) {
    const { user, isLoading, handleLogout } = useAuth();

    const renderAccount = () => {
        if (isLoading) {
            return (
                <div className={cls.accountSkeleton} aria-busy="true" aria-label="Checking your session">
                    <span className={`${mixins.skeleton} ${cls.skeletonMark}`} />
                    <span className={`${mixins.skeleton} ${cls.skeletonText}`} />
                </div>
            );
        }

        if (user) return <UserMenu email={user.email} onLogout={() => void handleLogout()} />;

        return (
            <button type="button" className={cls.signIn} onClick={onOpenAuth}>
                Sign in
            </button>
        );
    };

    return (
        <header className={cls.header}>
            <Logo />

            <div className={cls.actions}>
                <AccentPicker accent={accent} onPick={onPickAccent} />
                {renderAccount()}
            </div>
        </header>
    );
}
