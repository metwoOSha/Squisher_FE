import type { MouseEvent, ReactNode } from 'react';
import Portal from '@/utils/Portal';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import cls from './ModalOverlay.module.css';

interface ModalOverlayProps {
    children: ReactNode;
    onClose: () => void;
    width?: number;
}

export default function ModalOverlay({ children, onClose, width = 392 }: ModalOverlayProps) {
    useEscapeKey(true, onClose);
    useLockBodyScroll(true);

    /* Only a click that starts and ends on the backdrop itself should close. */
    const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) onClose();
    };

    return (
        <Portal>
            <div className={cls.overlay} onClick={handleOverlayClick} role="presentation">
                <div className={cls.card} style={{ maxWidth: width }} role="dialog" aria-modal="true">
                    {children}
                </div>
            </div>
        </Portal>
    );
}
