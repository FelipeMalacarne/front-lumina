'use client'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OfxTab } from "./ofx-tab"
import { useState } from "react"
import { ManualTab } from "./manual-tab"

export const AddTransactionSheet = () => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <Sheet open={open} onOpenChange={setOpen} >
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

                <Tabs defaultValue="manual">
                    <TabsList>
                        <TabsTrigger value="manual">Manual</TabsTrigger>
                        <TabsTrigger value="ofx"> Ofx</TabsTrigger>
                        <TabsTrigger value="csv">Csv</TabsTrigger>
                    </TabsList>
                    <OfxTab close={()=> setOpen(false)} />
                    <ManualTab close={()=> setOpen(false)} />
                </Tabs>

            </SheetContent>
        </Sheet>
    )
}

