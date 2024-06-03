import { PaginatedResource } from "@/lib/types"
import { useState } from "react"
import useSWR, { preload } from "swr"

export interface Transaction {
    id: string
    amount: number
    date_posted: string
    memo: string
    account_id: string
    created_at: string
}

enum TransactionType {
    CREDIT = "credit",
    DEBIT = "debit"
}

type TransactionsQueryParams = {
    page: number
    type?: TransactionType
}

export const useTransactions = (): {
    transactions: PaginatedResource<Transaction>
    params: TransactionsQueryParams
    setParams: (params: TransactionsQueryParams) => void
    isLoading: boolean,
    error: any,
} => {
    const [params, setParams] = useState<TransactionsQueryParams>({ page: 1 })

    const query = Object.entries(params).map(([key, value]) => `${key}=${value}`).join("&")

    const { data: transactions, isLoading, error } = useSWR(`/api/transaction?${query}`)

    return { transactions, isLoading, error, params, setParams }
}
