import useSWR from "swr"

export interface Account {
    id: string
    name: string
    type: string
    number: string
    check_digit: string
    balance: number
    bank_name: string
    description: string
    color: AccountColor
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
