import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp } from "lucide-react";

export function IncomesCard() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Receitas
                </CardTitle>
                <ArrowUp />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">R$2,231.89</div>
                <p className="text-xs text-muted-foreground">
                    +20.1%  desde o último mês
                </p>
            </CardContent>
        </Card>
    )
}
