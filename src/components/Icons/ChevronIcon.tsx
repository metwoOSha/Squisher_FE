import type { IconProps } from './types';

export default function ChevronIcon({ size = 9, className }: IconProps) {
    return (
        <svg width={size} height={(size * 6) / 9} viewBox="0 0 10 6" fill="none" className={className} aria-hidden="true">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
    );
}
