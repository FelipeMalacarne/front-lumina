import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { z } from "zod"
import { OfxTab } from "./ofx-tab"

export const AddTransactionSheet = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>
                    Adicione Transações
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        Adicionar novas Transações
                    </SheetTitle>
                    <SheetDescription>
                        Adicione novas transações ao seu painel, utilizando um dos métodos abaixo.
                    </SheetDescription>
                </SheetHeader>

                <Separator className="my-4" />

                <Tabs defaultValue="ofx">
                    <TabsList>
                        <TabsTrigger value="manual">Manual</TabsTrigger>
                        <TabsTrigger value="ofx"> Ofx</TabsTrigger>
                        <TabsTrigger value="csv">Csv</TabsTrigger>
                    </TabsList>
                    <OfxTab/>
                </Tabs>

            </SheetContent>
        </Sheet>
    )
}

