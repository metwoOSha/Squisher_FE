import { useEffect, useRef, useState } from 'react';
import { ChevronIcon } from '@/components/Icons';
import LogoMark from '@/components/Logo/LogoMark';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import cls from './UserMenu.module.css';

interface UserMenuProps {
    email: string;
    onLogout: () => void;
}

export default function UserMenu({ email, onLogout }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEscapeKey(isOpen, () => setIsOpen(false));

    useEffect(() => {
        if (!isOpen) return;

        const handlePointerDown = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
        };

        document.addEventListener('pointerdown', handlePointerDown);
        return () => document.removeEventListener('pointerdown', handlePointerDown);
    }, [isOpen]);

    const handleLogout = () => {
        setIsOpen(false);
        onLogout();
    };

    return (
        <div className={cls.root} ref={rootRef}>
            <button
                type="button"
                className={cls.trigger}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={isOpen}
            >
                <LogoMark compact />
                <span className={cls.email}>{email}</span>
                <ChevronIcon className={cls.chevron} />
            </button>

            {isOpen && (
                <div className={cls.menu} role="menu">
                    <button type="button" className={cls.item} role="menuitem" onClick={handleLogout}>
                        Log out
                    </button>
                </div>
            )}
        </div>
    );
}
