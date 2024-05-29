import { AddTransactionCard } from "./components/add-transaction-card";
import { MonthlyCard } from "./components/monthly-card";
import { WeeklyCard } from "./components/weekly-card";

export const metadata = {
    title: "Transactions",
    description: "Transactions page",
}

const TransactionsPage = () => {

    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between">

                <h2 className="text-3xl font-bold tracking-tight">Transações</h2>

            </div>

            <div className="space-y-4">
                <main className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                            <AddTransactionCard />
                            <WeeklyCard />
                            <MonthlyCard />
                        </div>

                    </div>

                </main>

            </div>

        </div>
    )
}

export default TransactionsPage;
