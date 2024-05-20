import { useAuth } from "@/hooks/auth"
import { Auth } from "@/lib/types"
import { createContext } from "react"
import Loading from "../loading"

export const AuthContext = createContext<Auth>({} as Auth)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout
    } = useAuth({ middleware: "auth" })

    if (!user) {
        return <Loading />
    }

    return (
        <AuthContext.Provider value={{
            user,
            register,
            login,
            forgotPassword,
            resetPassword,
            resendEmailVerification,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
