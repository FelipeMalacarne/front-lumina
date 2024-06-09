import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddTransactionCard } from "./components/add-transaction-card";
import { MonthlyCard } from "./components/monthly-card";
import { WeeklyCard } from "./components/weekly-card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { File, ListFilter } from "lucide-react";
import { AllTab } from "./components/all-tab";
import { SelectedTransactionProvider } from "@/components/providers/selected-transaction-provider";
import SingleTransactionCard from "./components/single-transaction-card";

export const metadata = {
    title: "Transações",
    description: "Página de transações do usuário",
}

const TransactionsPage = () => {

    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="space-y-4">
                <main className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    <SelectedTransactionProvider>
                        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                                <AddTransactionCard />
                                <WeeklyCard />
                                <MonthlyCard />
                            </div>
                            <Tabs defaultValue="all">
                                <div className="flex items-center">
                                    <TabsList>
                                        <TabsTrigger value="all">Todas</TabsTrigger>
                                        <TabsTrigger value="incomes">Ganhos</TabsTrigger>
                                        <TabsTrigger value="expenses">Despesas</TabsTrigger>
                                    </TabsList>
                                    <div className="ml-auto flex items-center gap-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-7 gap-1 text-sm"
                                                >
                                                    <ListFilter className="h-3.5 w-3.5" />
                                                    <span className="sr-only sm:not-sr-only">Filter</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuCheckboxItem checked>
                                                    Fulfilled
                                                </DropdownMenuCheckboxItem>
                                                <DropdownMenuCheckboxItem>
                                                    Declined
                                                </DropdownMenuCheckboxItem>
                                                <DropdownMenuCheckboxItem>
                                                    Refunded
                                                </DropdownMenuCheckboxItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7 gap-1 text-sm"
                                        >
                                            <File className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only">Export</span>
                                        </Button>
                                    </div>

                                </div>
                                <AllTab />

                            </Tabs>

                        </div>

                        <SingleTransactionCard />

                    </SelectedTransactionProvider>
                </main>

            </div>
        </div>
    )
}

export default TransactionsPage;
