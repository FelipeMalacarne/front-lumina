import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const data = [
    { memo: "Pagamento de boleto", amount: "-R$ 1.000,00", bank: "Caixa Econômica Federal" },
    { memo: "Recebimento de transferência", amount: "+R$ 2.000,00", bank: "Nubank" },
    { memo: "Depósito em conta", amount: "+R$ 500,00", bank: "Banco do Brasil" },
    { memo: "Saque em caixa eletrônico", amount: "-R$ 200,00", bank: "Santander" },
    { memo: "Pagamento de fatura", amount: "-R$ 350,00", bank: "Itaú" },
    // { memo: "Recebimento de salário", amount: "+R$ 4.000,00", bank: "Bradesco" },
    // { memo: "Compra em supermercado", amount: "-R$ 150,00", bank: "Nubank" },
    // { memo: "Pagamento de restaurante", amount: "-R$ 80,00", bank: "Caixa Econômica Federal" },
    // { memo: "Transferência para amigo", amount: "-R$ 100,00", bank: "Banco Inter" },
    // { memo: "Reembolso de despesa", amount: "+R$ 75,00", bank: "PicPay" },
];

export function LastTransactionsCard() {

    return (
        <>
            <Card className="col-span-4 lg:col-span-3">
                <CardHeader>
                    <CardTitle>Ultimas Transações</CardTitle>
                    <CardDescription>
                        Você fez 237 transações este mês
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {data.map((transaction, index) => (
                            <div key={index} className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">{transaction.memo}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {transaction.bank}
                                    </p>
                                </div>
                                <div className={cn("ml-auto font-medium", transaction.amount[0] === '-'
                                    ? "text-destructive"
                                    : "text-success")
                                }>
                                    {transaction.amount}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
