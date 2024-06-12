'use client'
import { SelectedTransactionContext } from "@/components/providers/selected-transaction-provider"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Transaction } from "@/hooks/transactions"
import { PaginatedResource } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useContext } from "react"

export const TransactionsTable = ({ transactions }: {
    transactions: PaginatedResource<Transaction>
}) => {
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
                            <TableCell>
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(transaction.amount / 100)}
                            </TableCell>
                            <TableCell className='hidden sm:table-cell'>
                                <div className='flex items-center space-x-2'>
                                    <div className={`w-2 h-2 rounded-full mr-2 bg-${transaction.account.color}`}/>
                                    {transaction.account.name}
                                </div>
                            </TableCell>
                            <TableCell>{transaction.date_posted.toLocaleString()}</TableCell>
                        </TableRow>
                    )) : Array.from({ length: 15 }).map((_, index) => (<RowSkeleton key={index} />))
                    }
                </TableBody>
            </Table>
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
