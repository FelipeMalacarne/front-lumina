'use client'
import { TablePagination } from "@/components/table-pagination"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TabsContent } from "@/components/ui/tabs"
import { useAccounts } from "@/hooks/accounts"
import { useTransactions } from "@/hooks/transactions"

export const AllTab = () => {

    const { transactions, isLoading, error, pageIndex, setPageIndex } = useTransactions()
    const { accounts, isLoading: isLoadingAccounts, error: errorAccounts } = useAccounts()

    if (isLoading || error || isLoadingAccounts || errorAccounts) {
        return <div>Loading...</div>
    }



    return (
        <TabsContent value="all">
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Transações</CardTitle>
                    <CardDescription>
                        Ultimas transações realizadas
                    </CardDescription>
                </CardHeader>

                <CardContent>
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
                            {transactions.data.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>{transaction.id}</TableCell>
                                    <TableCell>{transaction.amount}</TableCell>
                                    <TableCell>
                                        {accounts.find(account => account.id === transaction.account_id)?.name
                                            || transaction.account_id}
                                    </TableCell>
                                    <TableCell>{transaction.date_posted}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <TablePagination
                        currentPage={pageIndex}
                        totalPages={transactions.meta.last_page}
                        onPageChange={setPageIndex}
                    />

                </CardContent>
            </Card>

        </TabsContent>
    )
}
