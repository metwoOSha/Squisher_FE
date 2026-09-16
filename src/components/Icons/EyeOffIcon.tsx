import type { IconProps } from './types';

export default function EyeOffIcon({ size = 16, className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
            <path
                d="M1.4 8s2.5-4.2 6.6-4.2c1 0 1.9.25 2.7.63M14.6 8s-2.5 4.2-6.6 4.2c-1 0-1.9-.25-2.7-.63"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M6.6 6.6a2 2 0 0 0 2.8 2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2.6 2.6l10.8 10.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}
