'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";

export function TotalBalanceCard() {
    const { data } = useSWR<{ total_balance: string, percentage_change: string }>('api/dashboard/total-balance')
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-primary text-sm font-medium">
                    Saldo Total
                </CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {data ? (
                        data.total_balance
                    ) : (
                        <Skeleton className="w-24 h-6" />
                    )}
                </div>
                <p className="text-xs text-muted-foreground">
                    {data ? (
                        <span>{data.percentage_change} desde o último mês </span>
                    ) : (
                        <Skeleton className="w-16 h-4 mt-1" />
                    )}
                </p>
            </CardContent>
        </Card>
    )
}
