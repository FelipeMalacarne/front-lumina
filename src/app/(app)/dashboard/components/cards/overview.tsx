"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Bar,  ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import useSWR from "swr";

const CustomTooltip = ({ active, payload, label }: {
    active: boolean, payload: any, label: string
}) => {
    const formatCurrency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format;
    if (active && payload && payload.length) {
        return (
            <div className="bg-card text-card-foreground border p-2 shadow-md rounded">
                <p className="text-primary"> {label} </p>
                <div className="border-b my-2"></div>
                <div className="grid grid-cols-2 gap-2">
                    <p className="text-sm"> Entradas: </p>
                    <p className="text-sm text-success"> {`R$${payload[0].value}`} </p>
                    <p className="text-sm"> Saídas: </p>
                    <p className="text-sm text-destructive"> {`R$${payload[1].value}`} </p>
                    <p className="text-sm"> Lucro: </p>
                    <p className={cn("text-sm", payload[2].value > 0 ? "text-success" : "text-destructive")}>
                        {formatCurrency(payload[2].value)}
                    </p>
                </div>
            </div>
        );
    }

    return null;
};

type InOut = {
    month: string,
    income: number,
    expense: number,
    profit: number
}

export function OverviewCard() {
    const { data } = useSWR<InOut[]>('/api/dashboard/in-out-year')

    if (!data) {
        return <Skeleton className="col-span-4" />
    }

    // hiding error until recharts updates or fix it 
    const error = console.error;
    console.error = (...args: any) => {
        if (/defaultProps/.test(args[0])) return;
        error(...args);
    };

    return (
        <>
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Visão Geral</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <ComposedChart data={data}>
                            <XAxis
                                dataKey="month"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `R$${value}`}
                            />
                            <Bar
                                dataKey="income"
                                name="Entradas"
                                radius={[4, 4, 0, 0]}
                                fill="#6eb071" // success
                            />

                            <Bar
                                dataKey="expense"
                                name="Saídas"
                                radius={[4, 4, 0, 0]}
                                fill="#A82525"
                            />
                            <Line
                                dataKey="profit"
                                name="Lucro"
                                strokeWidth={2}
                                type="monotone"
                            />
                            <Legend />
                            <Tooltip
                                content={<CustomTooltip active={true} payload={data} label={data[0].month} />}
                                cursor={{
                                    fill: "rgba(0, 0, 0, 0.2)",
                                    strokeWidth: 2,
                                }}

                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </>
    )
} 
