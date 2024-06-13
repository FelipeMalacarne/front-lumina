import { useToast } from "@/components/ui/use-toast"
import axios from "@/lib/axios"
import { PaginatedResource } from "@/lib/types"
import { useState } from "react"
import useSWR from "swr"
import { Account } from "./accounts"

export interface Transaction {
    id: string
    amount: number
    date_posted: Date
    memo: string
    account: Account
    created_at: Date
    updated_at: Date
}

export enum TransactionType {
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
    manualCreate: (params: { amount: number, date_posted: Date, memo?: string, account_id: string }) => void
    deleteTransaction: (id: string) => void
    updateTransaction: (id: string, data: Partial<Transaction>) => void
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

    const manualCreate = async ({ amount, date_posted, memo, account_id }: {
        amount: number, date_posted: Date, memo?: string, account_id: string
    }) => {
        try {
            await axios.post("/api/transaction", { amount, date_posted, memo, account_id })
            toast({ title: "Successo", description: "Transação criada com sucesso!" })

            mutate()
        } catch (error: any) {
            toast({ title: "Erro", description: error.response.data.message, variant: "destructive" })
        }
    }

    const deleteTransaction = async (id: string) => {
        try {
            await axios.delete(`/api/transaction/${id}`)
            toast({ title: "Successo", description: "Transação deletada com sucesso!" })

            mutate()
        } catch (error: any) {
            toast({ title: "Erro", description: error.response.data.message, variant: "destructive" })
        }
    }

    const updateTransaction = async (id: string, data: Partial<Transaction>) => {
        try {
            await axios.put(`/api/transaction/${id}`, data)
            toast({ title: "Successo", description: "Transação atualizada com sucesso!" })

            mutate()
        } catch (error: any) {
            toast({ title: "Erro", description: error.response.data.message, variant: "destructive" })
        }
    }

    return {
        transactions,
        isLoading,
        error,
        params,
        setParams,
        importOfx,
        manualCreate,
        deleteTransaction,
        updateTransaction,
    }
}
