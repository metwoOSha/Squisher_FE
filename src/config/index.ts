export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const SHORT_LINK_ORIGIN = import.meta.env.VITE_SHORT_LINK_ORIGIN ?? API_URL;

/** Protocol-less form shown in the UI, e.g. "squish.li/". */
export const SHORT_DOMAIN_LABEL = `${SHORT_LINK_ORIGIN.replace(/^https?:\/\//, '')}/`;

export const MIN_PASSWORD_LENGTH = 6;

/** Accent swatches offered in the header, straight from the design. */
export const ACCENT_SWATCHES = [
    { name: 'Peach', color: '#d79a6f' },
    { name: 'Lime', color: '#c9d17a' },
    { name: 'Periwinkle', color: '#a8b8e8' },
    { name: 'Blush', color: '#e8b4c8' },
] as const;

export const DEFAULT_ACCENT = ACCENT_SWATCHES[0].color;

export const ACCENT_STORAGE_KEY = 'squisher:accent';

/** How long a copied link stays highlighted, matching the design's timeout. */
export const COPY_FEEDBACK_MS = 1600;
