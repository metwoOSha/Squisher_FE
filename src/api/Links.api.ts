import type { CreateLinkBody, Link, LinkWithClicks } from '@/types/link.types';
import { get, post } from './http';

const LINKS = '/links';

export async function createLink(body: CreateLinkBody): Promise<Link> {
    const res = await post(LINKS, body);
    return res.json();
}

export async function getMyLinks(): Promise<LinkWithClicks[]> {
    const res = await get(LINKS);
    return res.json();
}
