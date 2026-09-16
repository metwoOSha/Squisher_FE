export interface Link {
    id: string;
    shortCode: string;
    originalUrl: string;
    userId?: string | null;
    anonId?: string | null;
    createdAt: string;
}

export interface LinkStats {
    shortCode: string;
    originalUrl: string;
    totalClicks: number;
}

/** GET /links has no click counts, so they are merged in from /links/:code/stats. */
export type LinkWithClicks = Link & { clicks: number };

export interface CreateLinkBody {
    originalUrl: string;
}
