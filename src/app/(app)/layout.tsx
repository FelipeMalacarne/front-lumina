'use client'

import { useAuth } from '@/hooks/auth'
import Loading from '../../components/loading'

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>
) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-background">
            {/* <Navigation user={user} /> */}

            <main>{children}</main>
        </div>
    )
}

export default AppLayout
