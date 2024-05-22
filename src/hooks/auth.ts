import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { User } from '@/lib/types'

export type Auth = {
    user: User,
    register: ({ credentials, setErrors }: RegisterArgs) => void,
    login: ({ credentials, setErrors, setStatus }: LoginArgs) => void,
    forgotPassword: ({ setErrors, setStatus, email }: { setErrors: any, setStatus: any, email: string }) => void,
    resetPassword: ({ setErrors, setStatus, ...props }: { setErrors: any, setStatus: any }) => void,
    resendEmailVerification: ({ setStatus }: { setStatus: any }) => void,
    logout: () => void,
}

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

export const useAuth = ({ middleware }: { middleware: 'auth' | 'guest', }): Auth => {
    const router = useRouter()
    const params = useParams()

    const { data: user, error, mutate } = useSWR('/api/user', async () =>
        axios
            .get('/api/user')
            .then(res => res.data.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ credentials, setErrors }: RegisterArgs) => {
        await csrf()

        setErrors([])

        axios
            .post('/register', credentials)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }


    const login = async ({ credentials, setErrors, setStatus }: LoginArgs) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', credentials)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }: { setErrors: any, setStatus: any, email: string }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }: { setErrors: any, setStatus: any }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = async ({ setStatus }: { setStatus: any }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/authentication'
    }

    useEffect(() => {
        if (middleware === 'auth' && !user && !error) {
            router.push('/authentication')
        }
        if (middleware === 'guest' && user && !error) {
            router.push('/dashboard')
        }

        if (window.location.pathname === '/verify-email' && user?.email_verified_at) {
            router.push('/dashboard')
        }

        if (middleware === 'auth' && error) logout()

    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
