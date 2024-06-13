'use client'
import { useAccounts } from "@/hooks/accounts"
import { AccountCard } from "./account-card"
import { Skeleton } from "@/components/ui/skeleton"

export function AccountList() {
    const { accounts } = useAccounts()
  
    return (
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {accounts ? accounts.map(account => (
                <div key={account.id}>
                    <AccountCard account={account} />
                </div>
            )) : (
                <Skeleton className="w-80 h-120" />
            )}
        </div>
    )
}
