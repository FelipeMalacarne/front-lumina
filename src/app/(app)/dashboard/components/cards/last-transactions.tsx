'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Transaction } from "@/hooks/transactions";
import { cn } from "@/lib/utils";
import useSWR from "swr";

export function LastTransactionsCard() {
    const { data, isLoading, error } = useSWR('/api/dashboard/last-transactions')

    const formatCurrency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format;

    return (
        <>
            <Card className="col-span-4 lg:col-span-3">
                <CardHeader>
                    <CardTitle>Ultimas Transações</CardTitle>
                    <CardDescription>
                        { data ? (
                            <span>Você fez {data.count} transações esse mês</span>
                        ) : (
                            <Skeleton className="w-24 h-4" />
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {data ? (
                            data.last_transactions.map((transaction: Transaction) => (
                                <div key={transaction.id} className="flex items-center">
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {transaction.memo}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {transaction.account.bank_name}
                                        </p>
                                    </div>
                                    <div className={cn("ml-auto font-medium", transaction.amount < 0
                                        ? "text-destructive"
                                        : "text-success")
                                    }>
                                        {formatCurrency(transaction.amount / 100)}
                                    </div>
                                </div>
                            ))
                        ) : (
                            Array.from({ length: 5 }).map((_, index) => (
                                <div key={index}>
                                    {transactionSkeleton()}
                                </div>
                            ))
                        )}

                        {data?.last_transactions.length === 0 && (
                            <div className="text-center text-muted-foreground">
                                Nenhuma transação efetuada no período
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

const transactionSkeleton = () => {
    return (
        <div className="flex items-center">
            <div className="ml-4 space-y-1">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-16 h-3" />
            </div>
            <Skeleton className="ml-auto w-16 h-4" />
        </div>
    )
}
