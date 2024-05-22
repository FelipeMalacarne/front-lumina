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

export enum AccountColor {
    LAVENDER = 'lavender',
    ORANGE = 'orange',
    YELLOW = 'yellow',
    GREEN = 'green',
    EMERALD = 'emerald',
}

export const useAccounts = (): {
    accounts: Account[],
    isLoading: boolean,
    error: any,
    mutate: () => Promise<any>,
} => {
    const { data: accounts, isLoading, error, mutate } = useSWR('/api/account')

    return { accounts, isLoading, error, mutate }
}
