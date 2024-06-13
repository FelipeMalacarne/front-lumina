'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDown } from "lucide-react";
import useSWR from "swr";

export function ExpensesCard() {
    const { data } = useSWR<{ monthly_expense: number, percentage_change: number }>('/api/dashboard/monthly-expense')

    const formatCurrency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format;
    const formatPercentage = (number: number) => (number > 0 ? '+' : '') + number.toFixed(2) + '%';

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-primary text-sm font-medium">
                    Despesas
                </CardTitle>
                <ArrowDown color="hsl(var(--muted-foreground))" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {data ? (
                        formatCurrency(data.monthly_expense / 100)
                    ) : (
                        <Skeleton className="w-24 h-6" />
                    )}
                </div>
                <p className="text-xs text-muted-foreground">
                    {data ? (
                        <span>{formatPercentage(data.percentage_change)} desde o último mês </span>
                    ) : (
                        <Skeleton className="w-16 h-4 mt-1" />
                    )}
                </p>
            </CardContent>
        </Card >
    )
}
