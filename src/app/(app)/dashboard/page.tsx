import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewTab } from "./components/overview-tab"
import { AnalyticsTab } from "./components/analytics-tab"
import { Button } from "@/components/ui/button"
import { CalendarDateRangePicker } from "@/components/calendar-date-range-picker"

export const metadata = {
    title: "Dashboard",
    description: "Dashboard page",
}

const DashboardPage = () => {

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Meu Painel</h2>
                {/* <div className="flex items-center space-x-2"> */}
                {/*     <CalendarDateRangePicker /> */}
                {/*     <Button>Download</Button> */}
                {/* </div> */}
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="analytics">Analises</TabsTrigger>
                    <TabsTrigger value="reports">Relatórios</TabsTrigger>
                    <TabsTrigger className="hidden sm:flex" value="notifications">Notificações</TabsTrigger>
                </TabsList>

                <OverviewTab />
                <AnalyticsTab />

            </Tabs>
        </div>
    )
}

export default DashboardPage
