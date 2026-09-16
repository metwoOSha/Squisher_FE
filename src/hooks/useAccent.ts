import { useCallback, useEffect, useState } from 'react';
import { ACCENT_STORAGE_KEY, DEFAULT_ACCENT } from '@/config';

function readStoredAccent(): string {
    try {
        return localStorage.getItem(ACCENT_STORAGE_KEY) ?? DEFAULT_ACCENT;
    } catch {
        return DEFAULT_ACCENT;
    }
}

/** Drives the --accent custom property the whole palette hangs off. */
export function useAccent() {
    const [accent, setAccent] = useState(readStoredAccent);

    useEffect(() => {
        document.documentElement.style.setProperty('--accent', accent);

        try {
            localStorage.setItem(ACCENT_STORAGE_KEY, accent);
        } catch {
            /* private mode — the accent just won't persist */
        }
    }, [accent]);

    const pickAccent = useCallback((color: string) => setAccent(color), []);

    return { accent, pickAccent };
}
