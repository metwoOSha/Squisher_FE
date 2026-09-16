import type { IconProps } from './types';

export default function CloseIcon({ size = 13, className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className} aria-hidden="true">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}
