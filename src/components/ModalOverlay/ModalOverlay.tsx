import type { ReactNode } from 'react';
import Portal from '@/utils/Portal';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import cls from './ModalOverlay.module.css';

interface ModalOverlayProps {
    children: ReactNode;
    onClose: () => void;
    width?: number;
}

/*
 * The backdrop is deliberately inert: these modals hold typed-in forms, and a
 * stray click outside used to throw the input away. Escape and the modal's own
 * close button are the ways out.
 */
export default function ModalOverlay({ children, onClose, width = 392 }: ModalOverlayProps) {
    useEscapeKey(true, onClose);
    useLockBodyScroll(true);

    return (
        <Portal>
            <div className={cls.overlay}>
                <div className={cls.card} style={{ maxWidth: width }} role="dialog" aria-modal="true">
                    {children}
                </div>
            </div>
        </Portal>
    );
}
