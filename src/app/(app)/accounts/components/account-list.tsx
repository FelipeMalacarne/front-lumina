'use client'
import { useAccounts } from "@/hooks/accounts"
import { AccountCard } from "./account-card"
import Loading from "@/components/loading"

export function AccountList() {
    const { accounts, isLoading, error } = useAccounts()

    if (!accounts || isLoading) {
        return <Loading />
    }

    return (
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {accounts.map(account => (
                <div key={account.id}>
                    <AccountCard account={account} />
                </div>
            ))}
        </div>
    )
}
