import { useCallback, useEffect, useRef, useState } from 'react';

const THRESHOLD = 4;
const FADE = '26px';

/**
 * Fades the top/bottom edges of a scroll container only while there is more
 * content in that direction — the design's `linksMask`.
 */
export function useScrollMask<T extends HTMLElement>() {
    const elementRef = useRef<T | null>(null);
    const [fadeTop, setFadeTop] = useState(false);
    const [fadeBottom, setFadeBottom] = useState(false);

    const measure = useCallback(() => {
        const el = elementRef.current;
        if (!el) return;

        setFadeTop(el.scrollTop > THRESHOLD);
        setFadeBottom(el.scrollTop + el.clientHeight < el.scrollHeight - THRESHOLD);
    }, []);

    const setRef = useCallback(
        (el: T | null) => {
            elementRef.current = el;
            if (el) requestAnimationFrame(measure);
        },
        [measure]
    );

    useEffect(() => {
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [measure]);

    const mask = `linear-gradient(to bottom,${fadeTop ? `transparent 0,#000 ${FADE}` : '#000 0'},${
        fadeBottom ? `#000 calc(100% - ${FADE}),transparent 100%` : '#000 100%'
    })`;

    return { setRef, mask, onScroll: measure, remeasure: measure };
}
