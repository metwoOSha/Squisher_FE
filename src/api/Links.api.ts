import type { CreateLinkBody, Link, LinkStats } from '@/types/link.types';
import { get, post } from './http';

const LINKS = '/links';

export async function createLink(body: CreateLinkBody): Promise<Link> {
    const res = await post(LINKS, body);
    return res.json();
}

export async function getMyLinks(): Promise<Link[]> {
    const res = await get(LINKS);
    return res.json();
}

export async function getLinkStats(shortCode: string): Promise<LinkStats> {
    const res = await get(`${LINKS}/${shortCode}/stats`);
    return res.json();
}
