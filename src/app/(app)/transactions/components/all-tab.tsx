'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { Suspense } from "react"
import { TransactionsTable, TransactionsTableSkeleton } from "./transactions-table"
import { useTransactionsTableStore } from "@/hooks/stores/transaction-table-store"

export const AllTab = () => {
    const { page, transactions, totalPages, setPage } = useTransactionsTableStore()

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
                    <Suspense fallback={<TransactionsTableSkeleton />}>
                        <TransactionsTable />
                    </Suspense>
                </CardContent>
            </Card>

        </TabsContent>
    )
}
