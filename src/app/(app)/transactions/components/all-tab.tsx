import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { TransactionsTable } from "./transactions-table"

export const AllTab = () => {

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
                    <TransactionsTable />
                </CardContent>
            </Card>

        </TabsContent>
    )
}
