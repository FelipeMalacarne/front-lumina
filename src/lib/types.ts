export interface User {
    id: number
    name: string
    email: string
    email_verified_at: Date
}

export interface ErrorResponse {
    message: string
    errors: Errors
}

export type Errors = Record<string, string[]>


