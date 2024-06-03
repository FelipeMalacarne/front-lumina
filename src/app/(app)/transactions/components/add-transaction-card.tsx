import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const AddTransactionCard = () => {
    return (
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0" >
            <CardHeader className="pb-3">
                <CardTitle>Suas Transações</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Adicione suas transações para ter um controle financeiro mais preciso.
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button>Adicione transações</Button>
            </CardFooter>
        </Card>
    )
}
