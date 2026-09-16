import { API_PREFIX } from '@/config';
import { ApiError } from './ApiError';

const STATUS_MESSAGES: Record<number, string> = {
    401: 'Wrong email or password',
    409: 'That email is already registered',
    429: 'Too many attempts — try again in a minute',
    500: 'Something went wrong. Try again',
};

function extractMessage(body: unknown, status: number): string {
    const message = (body as { message?: string | string[] } | null)?.message;

    if (Array.isArray(message)) return message[0];
    if (typeof message === 'string' && message.length) return message;

    return STATUS_MESSAGES[status] ?? `HTTP error: ${status}`;
}

async function handleResponse(res: Response): Promise<Response> {
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new ApiError(extractMessage(body, res.status), res.status);
    }
    return res;
}

export async function get(url: string): Promise<Response> {
    const res = await fetch(`${API_PREFIX}${url}`, {
        method: 'GET',
        credentials: 'include',
    });

    return handleResponse(res);
}

export async function post(url: string, body?: unknown): Promise<Response> {
    const res = await fetch(`${API_PREFIX}${url}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body ?? {}),
    });

    return handleResponse(res);
}
