'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "@/lib/axios";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function IncomesCard() {
    const [incomes, setIncomes] = useState<string>("R$ 0,00")
    const [percentageChange, setPercentageChange] = useState<string>("+0%")

    const getIncomes = async () => {
        try {
            const response = await axios<{ monthly_income: number, percentage_change: number }>('/api/dashboard/monthly-income')

            const formatCurrency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format;
            const formatPercentage = (number: number) => (number > 0 ? '+' : '') + number.toFixed(2) + '%';

            setIncomes(formatCurrency(response.data.monthly_income / 100));
            setPercentageChange(formatPercentage(response.data.percentage_change));

        } catch (error: any) {
            console.error(error)
        }
    }

    useEffect(() => {
        getIncomes();
    }, []);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-primary text-sm font-medium">
                    Receitas
                </CardTitle>
                <ArrowUp color="hsl(var(--muted-foreground))" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {incomes}
                </div>
                <p className="text-xs text-muted-foreground">
                    {percentageChange}  desde o último mês
                </p>
            </CardContent>
        </Card>
    )
}
