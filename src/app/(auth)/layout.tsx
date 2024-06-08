'use client'

import Loading from "@/components/loading"
import { useAuth } from "@/hooks/auth"


const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const { user } = useAuth({ middleware: 'guest' })

    if (user) {
        return <Loading />

    }

    return (
        <main className="flex-1">
            {children}
        </main>
    )

}

export default AuthLayout
