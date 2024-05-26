import { useToast } from "@/components/ui/use-toast"
import axios from "@/lib/axios"
import { ErrorResponse } from "@/lib/types"
import useSWR from "swr"

export interface Account {
    id: string
    name: string
    type: string
    number: string
    check_digit: string
    balance: number
    bank_name: string
    description?: string
    color: AccountColor
}

interface AccountCreateRequest {
    name: string
    bank_id: string
    color: AccountColor
    description?: string
    number?: string
    check_digit?: string
}

interface CreateAccountArgs {
    account: AccountCreateRequest
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
    createAccount: ({ account }: CreateAccountArgs) => Promise<void>,
} => {
    const { toast } = useToast()
    const { data: accounts, isLoading, error, mutate } = useSWR('/api/account')

    const createAccount = async ({ account }: CreateAccountArgs) => {
        try {
            const response = await axios('/api/account', {
                method: 'POST',
                data: account,
            })

            mutate((accounts: Account[] | undefined) => {
                return accounts ? [...accounts, response.data] : [response.data]
            })
        } catch (error: any) {
            const errorResponse: ErrorResponse = error.response.data
            toast({
                title: 'Error',
                description: errorResponse.message,
                variant: 'destructive'
            })
        }
    }


    return { accounts, isLoading, error, createAccount }
}
