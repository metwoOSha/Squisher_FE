import type { AuthMessage, LoginBody, RegisterBody, User } from '@/types/user.types';
import { get, post } from './http';

const AUTH = (type: string) => `/auth/${type}`;

export async function login(body: LoginBody): Promise<AuthMessage> {
    const res = await post(AUTH('login'), body);
    return res.json();
}

export async function register(body: RegisterBody): Promise<AuthMessage> {
    const res = await post(AUTH('register'), body);
    return res.json();
}

export async function logout(): Promise<AuthMessage> {
    const res = await post(AUTH('logout'));
    return res.json();
}

export async function getMe(): Promise<User> {
    const res = await get(AUTH('me'));
    return res.json();
}
