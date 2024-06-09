import {  useToast } from "@/components/ui/use-toast"
import axios from "@/lib/axios"
import { ErrorResponse, PaginatedResource } from "@/lib/types"
import { useState } from "react"
import useSWR, { preload } from "swr"

export interface Transaction {
    id: string
    amount: number
    date_posted: string
    memo: string
    account_id: string
    created_at: string
    updated_at: string
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
    importOfx: (file: File) => void
} => {
    const { toast } = useToast()
    const [params, setParams] = useState<TransactionsQueryParams>({ page: 1 })

    const query = Object.entries(params).map(([key, value]) => `${key}=${value}`).join("&")

    const { data: transactions, isLoading, error, mutate } = useSWR(`/api/transaction?${query}`)

    const importOfx = async (file: File) => {

        try {
            const formData = new FormData()
            formData.append("file", file)
            const response = await axios.post("/api/transaction/import/ofx", formData)

            const count = response.data.count
            toast({ title: "Successo", description: `${count}x transações importadas!` })

            mutate()

        } catch (error: any) {
            toast({ title: "Erro", description: error.response.data.message, variant: "destructive" })
        }
    }

    return { transactions, isLoading, error, params, setParams, importOfx }
}
