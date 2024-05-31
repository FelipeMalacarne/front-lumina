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

export type LinkType = {
    url: string | null
    label: string
    active: boolean
}

export type PaginatedResource<T> = {
    data: T[]
    meta: {
        total: number
        page: number
        last_page: number
        from: number
        to: number
        links: LinkType[]
    }
    links: {
        first: string
        last: string
        prev: string | null
        next: string | null
    }
}
