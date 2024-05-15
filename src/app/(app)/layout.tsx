'use client'

import Navbar from '@/components/navigation/nav-bar'
import { AuthProvider } from '@/components/providers/auth-provider'

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>
) => {

    return (
        <AuthProvider>
            <div className="min-h-screen bg-background">
                <Navbar />
                <main>{children}</main>
            </div>
        </AuthProvider>
    )
}

export default AppLayout
