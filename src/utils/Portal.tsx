import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

const noopSubscribe = () => () => {};

export default function Portal({ children }: { children: ReactNode }) {
    const mounted = useSyncExternalStore(
        noopSubscribe,
        () => true,
        () => false
    );

    if (!mounted) return null;

    return createPortal(children, document.body);
}
