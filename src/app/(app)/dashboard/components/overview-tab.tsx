import { TabsContent } from "@/components/ui/tabs";
import { TotalBalanceCard } from "./cards/total-balance";
import { IncomesCard } from "./cards/incomes";
import { ExpensesCard } from "./cards/expenses";
import { CreditCard } from "./cards/credit-card";
import { OverviewCard } from "./cards/overview";
import { LastTransactionsCard } from "./cards/last-transactions";

export function OverviewTab() {
    return (
        <>
            <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <TotalBalanceCard />
                    <IncomesCard />
                    <ExpensesCard />
                    <CreditCard />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                    <OverviewCard />
                    <LastTransactionsCard />



                </div>
            </TabsContent>
        </>
    )
}
