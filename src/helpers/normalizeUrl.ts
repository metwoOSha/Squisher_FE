/** Matches the design's client-side check before a URL is sent to the server. */
const URL_PATTERN = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([^\s]*)$/i;

export function isValidUrl(value: string): boolean {
    return URL_PATTERN.test(value.trim());
}

/** Users type "example.com" — the backend expects a full URL. */
export function normalizeUrl(value: string): string {
    const trimmed = value.trim();
    if (!trimmed) return trimmed;
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}
