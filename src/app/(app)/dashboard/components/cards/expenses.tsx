import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown } from "lucide-react";

export function ExpensesCard() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Despesas
                </CardTitle>
                <ArrowDown />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">R$1,832.29</div>
                <p className="text-xs text-muted-foreground">
                    -50.1%  desde o último mês
                </p>
            </CardContent>
        </Card>
    )
}
