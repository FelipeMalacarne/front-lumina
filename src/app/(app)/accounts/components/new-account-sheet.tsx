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
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

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


export function NewAccountSheet() {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        // props.setIsLoading(true)

        // await register({ credentials, setErrors })

        // props.setIsLoading(false)
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
                                <Input placeholder="Código do banco" />
                            </div>

                            <Input placeholder="Nome do banco" disabled />
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma Cor" />
                                </SelectTrigger>
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
