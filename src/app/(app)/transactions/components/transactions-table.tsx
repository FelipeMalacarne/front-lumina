'use client'
import { SelectedTransactionContext } from "@/components/providers/selected-transaction-provider"
import { TablePagination } from "@/components/table-pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAccounts } from "@/hooks/accounts"
import { useTransactions } from "@/hooks/transactions"
import { cn } from "@/lib/utils"
import { useContext } from "react"

export const TransactionsTable = () => {
    const { transactions, params, setParams } = useTransactions()
    const { accounts } = useAccounts()
    const { selectedTransaction, setSelectedTransaction } = useContext(SelectedTransactionContext)

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='hidden md:table-cell'> Id </TableHead>
                        <TableHead> Amount </TableHead>
                        <TableHead className='hidden sm:table-cell'> Account </TableHead>
                        <TableHead > Date </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {transactions ? transactions.data.map((transaction) => (
                        <TableRow
                            key={transaction.id}
                            onClick={() => setSelectedTransaction(transaction)}
                            className={cn('cursor-pointer', selectedTransaction?.id === transaction.id && 'bg-muted')}
                        >
                            <TableCell className='hidden md:table-cell'>{transaction.id}</TableCell>
                            <TableCell>{transaction.amount}</TableCell>
                            <TableCell className='hidden sm:table-cell'>
                                {accounts.find(account => account.id === transaction.account_id)?.name
                                    || transaction.account_id}
                            </TableCell>
                            <TableCell>{transaction.date_posted.toLocaleString()}</TableCell>
                        </TableRow>
                    )) : Array.from({ length: 15 }).map((_, index) => (<RowSkeleton key={index} />))
                    }
                </TableBody>
            </Table>

            {transactions && transactions.meta.total > 0 &&
                <TablePagination
                    currentPage={params.page}
                    totalPages={transactions.meta.last_page}
                    onPageChange={(page) => setParams({ ...params, page })}
                />
            }
        </>
    )
}

const RowSkeleton = () => (
    <TableRow>
        <TableCell>
            <Skeleton className="h-4 rounded w-32"></Skeleton>
        </TableCell>
        <TableCell>
            <Skeleton className="h-4 rounded w-16"></Skeleton>
        </TableCell>
        <TableCell>
            <Skeleton className="h-4 rounded w-16"></Skeleton>
        </TableCell>
        <TableCell>
            <Skeleton className="h-4 rounded w-16"></Skeleton>
        </TableCell>
    </TableRow>
)
