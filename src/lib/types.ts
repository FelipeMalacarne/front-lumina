export interface User {
    id: string
    name: string
    email: string
    default_project_id: string
    email_verified_at: Date
}

export interface Project {
    id: string
    name: string
    type: ProjectType
    role?: Role
}

export enum ProjectType {
    Personal = 'personal',
    Professional = 'professional',
}

export enum Role {
    Owner = 'owner',
    Admin = 'admin',
    Member = 'member',
    Viewer = 'viewer',
}

export interface ErrorResponse {
    message: string
    errors: Errors
}

export type Errors = Record<string, string[]>

export type RegisterRequest = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
}

export type LoginRequest = {
    email: string,
    password: string,
}

export type RegisterArgs = {
    credentials: RegisterRequest,
    setErrors: (errors: any) => void,
}

export type LoginArgs = {
    credentials: LoginRequest,
    setErrors: (errors: any) => void,
    setStatus: (status: any) => void,
}

export type Auth = {
    user: User,
    register: ({ credentials, setErrors }: RegisterArgs) => void,
    login: ({ credentials, setErrors, setStatus }: LoginArgs) => void,
    forgotPassword: ({ setErrors, setStatus, email }: { setErrors: any, setStatus: any, email: string }) => void,
    resetPassword: ({ setErrors, setStatus, ...props }: { setErrors: any, setStatus: any }) => void,
    resendEmailVerification: ({ setStatus }: { setStatus: any }) => void,
    logout: () => void,
}


