'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { TransactionsTable } from "./transactions-table"
import { useTransactions } from "@/hooks/transactions"
import { TablePagination } from "@/components/table-pagination"

export const AllTab = () => {
    const { transactions, params, setParams } = useTransactions()

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
                    <TransactionsTable transactions={transactions} />

                    {transactions && transactions.meta.total > 0 &&
                        <TablePagination
                            currentPage={params.page}
                            totalPages={transactions.meta.last_page}
                            onPageChange={(page) => setParams({ ...params, page })}
                        />
                    }
                </CardContent>
            </Card>

        </TabsContent>
    )
}
