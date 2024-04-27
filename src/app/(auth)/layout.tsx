'use client'

import Loading from "@/components/loading"
import { useAuth } from "@/hooks/auth"


const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const { user } = useAuth({ middleware: 'guest' })

    if (user) {
        return <Loading />

    }
    return (
        <div className="min-h-screen bg-background">
            <main>{children}</main>
        </div>
    )

}

export default AuthLayout
