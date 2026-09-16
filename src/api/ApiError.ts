export class ApiError extends Error {
    readonly status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }

    get isUnauthorized() {
        return this.status === 401;
    }

    get isConflict() {
        return this.status === 409;
    }

    get isThrottled() {
        return this.status === 429;
    }
}
