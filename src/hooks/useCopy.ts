import { useCallback, useEffect, useRef, useState } from 'react';
import { COPY_FEEDBACK_MS } from '@/config';

/**
 * One copy state for the whole app: the result card, every link card and the
 * toast all read from it, so the highlight and the toast stay in sync.
 */
export function useCopy() {
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [copiedText, setCopiedText] = useState('');
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(
        () => () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        },
        []
    );

    const copy = useCallback((text: string, id: string) => {
        void navigator.clipboard?.writeText(text).catch(() => {});

        setCopiedId(id);
        setCopiedText(text.replace(/^https?:\/\//, ''));

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopiedId(null), COPY_FEEDBACK_MS);
    }, []);

    return { copiedId, copiedText, copy };
}

export type CopyState = ReturnType<typeof useCopy>;
