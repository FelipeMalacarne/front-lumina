'use client'
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetHeader, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AccountColor } from "@/hooks/accounts";
import { useBanks } from "@/hooks/banks";
import { useState } from "react";
import Loading from "@/components/loading";

const FormSchema = z.object({
    name: z
        .string()
        .min(10, {
            message: "Bio must be at least 10 characters.",
        })
        .max(160, {
            message: "Bio must not be longer than 30 characters.",
        }),
})

function ColorSquare({ color }: { color: AccountColor }) {
    return (
        <div className="flex gap-2 items-center">
            <div className={`h-6 w-6 rounded-md bg-${color}`} />
            {color.charAt(0).toUpperCase() + color.slice(1)}
        </div>
    )
}

export function NewAccountSheet() {
    const { banks, isLoading, error } = useBanks()
    const [bankName, setBankName] = useState<string>('')

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    if (isLoading) {
        return <Loading />
    }

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        // props.setIsLoading(true)

        // await register({ credentials, setErrors })

        // props.setIsLoading(false)
    }

    function handleBankChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const bank = banks.data.find((bank) => String(bank.id) === event.target.value)

        bank ? setBankName(bank.name) : setBankName('')
    }

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button size={'lg'}>
                        Adicionar Conta
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>
                            Adicionar nova conta
                        </SheetTitle>
                        <SheetDescription>
                            Adicione uma nova conta bancária, preenchendo os campos abaixo.
                        </SheetDescription>
                    </SheetHeader>
                    <Separator className="my-4" />

                    <Form {...form}>
                        <form onSubmit={onSubmit} className="space-y-4">

                            <Input placeholder="Nome da Conta" />
                            <Textarea
                                placeholder="Descrição"
                                className="resize-none"
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input placeholder="Numero da conta" />
                                <Input
                                    placeholder="Código do banco"
                                    type="number"
                                    onChange={(e: any) => handleBankChange(e)}
                                />
                            </div>

                            <Input value={bankName} placeholder="Nome do banco" readOnly />
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma Cor" />

                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={AccountColor.LAVENDER} className="flex">
                                        <ColorSquare color={AccountColor.LAVENDER} />
                                    </SelectItem>
                                    <SelectItem value={AccountColor.ORANGE}>
                                        <ColorSquare color={AccountColor.ORANGE} />
                                    </SelectItem>
                                    <SelectItem value={AccountColor.YELLOW}>
                                        <ColorSquare color={AccountColor.YELLOW} />
                                    </SelectItem>
                                    <SelectItem value={AccountColor.GREEN}>
                                        <ColorSquare color={AccountColor.GREEN} />
                                    </SelectItem>
                                    <SelectItem value={AccountColor.EMERALD}>
                                        <ColorSquare color={AccountColor.EMERALD} />
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <SheetFooter>
                                <Button type="submit">Adicionar</Button>
                            </SheetFooter>
                        </form>

                    </Form>



                    <SheetFooter>

                    </SheetFooter>

                </SheetContent>
            </Sheet >
        </>
    )

}
