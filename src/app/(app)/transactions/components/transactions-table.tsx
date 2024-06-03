'use client'
import { TablePagination } from "@/components/table-pagination"
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAccounts } from "@/hooks/accounts"
import { useTransactions } from "@/hooks/transactions"

export const TransactionsTable = () => {
    const { transactions, params, setParams } = useTransactions()
    const { accounts } = useAccounts()

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
                    {transactions.data.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell className='hidden md:table-cell'>{transaction.id}</TableCell>
                            <TableCell>{transaction.amount}</TableCell>
                            <TableCell className='hidden sm:table-cell'>
                                {accounts.find(account => account.id === transaction.account_id)?.name
                                    || transaction.account_id}
                            </TableCell>
                            <TableCell>{transaction.date_posted}</TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>

            <TablePagination
                currentPage={params.page}
                totalPages={transactions.meta.last_page}
                onPageChange={(page) => setParams({ ...params, page })}
            />
        </>
    )
}

export const TransactionsTableSkeleton = () => {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead> Id </TableHead>
                        <TableHead> Amount </TableHead>
                        <TableHead> Account </TableHead>
                        <TableHead> Date </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {Array.from({ length: 15 }).map((_, index) => (
                        <TableRow key={index}>
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
                    ))}

                </TableBody>
            </Table>

                <Pagination>
                    <PaginationContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <PaginationItem key={index}>
                                <Skeleton className="h-9 w-9 rounded-sm"></Skeleton>
                            </PaginationItem>
                        ))}

                    </PaginationContent>
                </Pagination>
        </>
    )
}
