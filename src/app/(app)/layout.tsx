'use client'

import { useAuth } from '@/hooks/auth'
import Loading from '../../components/loading'
import Navbar from '@/components/navigation/nav-bar'

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>
) => {
    const { user, logout } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar user={user} logout={logout} />
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
