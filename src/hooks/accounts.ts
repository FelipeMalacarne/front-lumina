import useSWR from "swr"

export interface Account {
    id: string
    name: string
    type: string
    number: string
    checkDigit: string
    balance: number
    bankId: string
    projectId: string
}

export function useAccounts(): {
    accounts: Account[],
    isLoading: boolean,
    error: any,
    mutate: () => Promise<any>,
} {
    const { data: accounts, isLoading, error, mutate } = useSWR('/api/accounts')

    return { accounts, isLoading, error, mutate }
}

