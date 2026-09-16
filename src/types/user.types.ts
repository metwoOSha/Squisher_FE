export interface User {
    id: string;
    email: string;
    createdAt: string;
}

export interface AuthMessage {
    message: string;
}

export interface LoginBody {
    email: string;
    password: string;
}

export type RegisterBody = LoginBody;

export type AuthMode = 'login' | 'register';
