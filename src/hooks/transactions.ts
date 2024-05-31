import { PaginatedResource } from "@/lib/types"
import { useState } from "react"
import useSWR from "swr"

export interface Transaction {
    id: string
    amount: number
    date_posted: string
    memo: string
    account_id: string
    created_at: string
}

export const useTransactions = (): {
    transactions: PaginatedResource<Transaction>
    pageIndex: number
    setPageIndex: (index: number) => void,
    isLoading: boolean,
    error: any,
} => {
    const [pageIndex, setPageIndex] = useState(1)

    const { data: transactions, isLoading, error, mutate } = useSWR(`/api/transaction?page=${pageIndex}`)

    return { transactions, isLoading, error, pageIndex,setPageIndex }
}
