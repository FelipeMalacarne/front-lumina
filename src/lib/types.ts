export interface User {
    id: string
    name: string
    email: string
    default_project_id: string
    email_verified_at: Date
}

export interface ErrorResponse {
    message: string
    errors: Errors
}

export type Errors = Record<string, string[]>
