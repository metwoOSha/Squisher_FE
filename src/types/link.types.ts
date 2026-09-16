export interface Link {
    id: string;
    shortCode: string;
    originalUrl: string;
    createdAt: string;
}

export type LinkWithClicks = Link & { clicks: number };

export interface CreateLinkBody {
    originalUrl: string;
}
