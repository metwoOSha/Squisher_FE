import type { IconProps } from './types';

export default function CopyIcon({ size = 15, className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
            <rect x="5.2" y="5.2" width="9" height="9" rx="2.4" stroke="currentColor" strokeWidth="1.7" />
            <rect x="1.8" y="1.8" width="9" height="9" rx="2.4" stroke="currentColor" strokeWidth="1.7" opacity=".45" />
        </svg>
    );
}
