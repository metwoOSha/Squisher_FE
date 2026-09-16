import { SHORT_LINK_ORIGIN } from '@/config';

/** Full URL — this is what lands on the clipboard and what the browser opens. */
export function getShortUrl(shortCode: string): string {
    return `${SHORT_LINK_ORIGIN}/${shortCode}`;
}

/** Protocol-less form for display, mirroring the design's "squish.li/a7f2kq". */
export function getShortLabel(shortCode: string): string {
    return getShortUrl(shortCode).replace(/^https?:\/\//, '');
}
