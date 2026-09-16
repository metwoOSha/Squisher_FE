import { useCallback, useEffect, useState } from 'react';
import { createLink, getLinkStats, getMyLinks } from '@/api/Links.api';
import { normalizeUrl } from '@/helpers/normalizeUrl';
import type { Link, LinkWithClicks } from '@/types/link.types';

/** GET /links carries no click counts, so they are pulled per link and merged in. */
async function withClicks(links: Link[]): Promise<LinkWithClicks[]> {
    return Promise.all(
        links.map(async (link) => {
            try {
                const { totalClicks } = await getLinkStats(link.shortCode);
                return { ...link, clicks: totalClicks };
            } catch {
                return { ...link, clicks: 0 };
            }
        })
    );
}

export function useLinks() {
    const [links, setLinks] = useState<LinkWithClicks[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchLinks = useCallback(async () => {
        try {
            setLinks(await withClicks(await getMyLinks()));
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Could not load your links');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchLinks();
    }, [fetchLinks]);

    /* Prepends on success so the new card runs its slide-in at the top of the list. */
    const create = useCallback(async (originalUrl: string): Promise<LinkWithClicks> => {
        setIsCreating(true);

        try {
            const created = await createLink({ originalUrl: normalizeUrl(originalUrl) });
            const link: LinkWithClicks = { ...created, clicks: 0 };

            setLinks((prev) => [link, ...prev.filter((item) => item.id !== link.id)]);
            return link;
        } finally {
            setIsCreating(false);
        }
    }, []);

    const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);

    return { links, totalClicks, isLoading, isCreating, error, create, refetch: fetchLinks };
}
