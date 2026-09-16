/** "1 click" / "1,428 clicks" — the design's count labels. */
export function formatCount(count: number, noun: string): string {
    return `${count.toLocaleString('en-US')} ${count === 1 ? noun : `${noun}s`}`;
}
