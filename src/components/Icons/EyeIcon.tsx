import type { IconProps } from './types';

export default function EyeIcon({ size = 16, className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
            <path
                d="M1.4 8s2.5-4.2 6.6-4.2S14.6 8 14.6 8s-2.5 4.2-6.6 4.2S1.4 8 1.4 8Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <circle cx="8" cy="8" r="1.9" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}
