'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { TransactionsTable } from "./transactions-table"
import { TransactionType, useTransactions } from "@/hooks/transactions"
import { TablePagination } from "@/components/table-pagination"
import { useEffect } from "react"

export const CreditTab = () => {
    const { transactions, params, setParams } = useTransactions()

    useEffect(() => {
        setParams({...params, type: TransactionType.CREDIT} )
    }, [])

    return (
        <TabsContent value="credit">
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Entradas</CardTitle>
                    <CardDescription>
                        Ultimas entradas realizadas
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
