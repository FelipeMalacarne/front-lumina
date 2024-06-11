'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetHeader, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AccountColor, useAccounts } from "@/hooks/accounts";
import { useBanks } from "@/hooks/banks";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
    name: z
        .string({ required_error: "O nome é obrigatório." })
        .min(3, {
            message: "O nome precisa conter no mínimo 3 caracteres.",
        })
        .max(50, {
            message: "O nome pode conter no máximo 50 caracteres.",
        }),
    description: z
        .string()
        .max(255, {
            message: "A descrição precisa conter no máximo 255 caracteres.",
        })
        .optional(),
    number: z
        .string({ required_error: "O número é obrigatório." })
        .length(8, {
            message: "O número precisa conter 8 caracteres.",
        }),
    check_digit: z
        .string({ required_error: "Obrigatório" })
        .length(1, {
            message: "O dígito verificador precisa conter 1 caractere.",
        }),
    bank_id: z
        .string({ required_error: "O código do banco é obrigatório." })
        .length(3, {
            message: "O código do banco precisa conter 3 caracteres.",
        }),
    color: z
        .string({ required_error: "A cor é obrigatória." }),


    bank_name: z.string({ required_error: "O banco é obrigatório." })

})

export function ColorSquare({ color }: { color: AccountColor }) {
    return (
        <div className="flex gap-2 items-center">
            <div className={`h-6 w-6 rounded-md bg-${color}`} />
            {color.charAt(0).toUpperCase() + color.slice(1)}
        </div>
    )
}

export function NewAccountSheet() {
    const { banks, isLoading, error } = useBanks()
    const { createAccount } = useAccounts()
    const { toast } = useToast()
    const [bankName, setBankName] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            description: '',
            number: '',
            check_digit: '',
            bank_id: '',
            color: 'lavender',
            bank_name: '',
        },
    })

    useEffect(() => {
        if (error) {
            toast({
                title: 'Erro',
                description: 'Ocorreu um erro ao buscar os bancos.',
            })
        }
    }, [error])

    if (isLoading) {
        return <Loading />
    }

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        const account = {
            name: values.name,
            description: values.description,
            number: values.number,
            check_digit: values.check_digit,
            bank_id: values.bank_id,
            color: values.color as AccountColor
        }

        createAccount({ account })

        form.reset({
            name: '',
            description: '',
            number: '',
            check_digit: '',
            bank_id: '',
            color: 'lavender',
            bank_name: '',
        })

        setIsOpen(false)
    }

    function handleBankChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const bank = banks.data.find((bank) => String(bank.id) === event.target.value)

        bank ? setBankName(bank.name) : setBankName('')
    }

    return (
        <>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button onClick={() => setIsOpen(true)} size={'lg'}>
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
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Nome:*
                                        </FormLabel>
                                        <Input {...field} placeholder="Nome da conta" />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="description"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Descricão:
                                        </FormLabel>
                                        <Textarea
                                            placeholder="Descrição"
                                            className="resize-none"
                                            {...field}
                                        />
                                        <FormDescription>
                                            Este campo é opcional.
                                            Pode ser usado explicar melhor a finalidade da conta.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                                <FormField
                                    name="number"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="col-span-3 sm:col-span-2">
                                            <FormLabel>
                                                Conta:
                                            </FormLabel>

                                            <Input
                                                {...field}
                                                placeholder="00000000"
                                                type="number"
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name="check_digit"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="col-span-1 sm:col-span-1">
                                            <FormLabel>
                                                CV:*
                                            </FormLabel>
                                            <Input
                                                placeholder="1"
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name="bank_id"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="col-span-4 sm:col-span-2">
                                            <FormLabel>
                                                Banco:*
                                            </FormLabel>
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="000"
                                                onChangeCapture={(e: any) => handleBankChange(e)}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                name="bank_name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <Input {...field} value={bankName} readOnly />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="color"
                                control={form.control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione uma Cor" />
                                            </SelectTrigger>

                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(AccountColor).map((color) => (
                                                <SelectItem key={color} value={color}>
                                                    <ColorSquare color={color} />
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                        <FormMessage />
                                    </Select>
                                )}
                            />

                            <SheetFooter>
                                <Button type="submit">Adicionar</Button>
                            </SheetFooter>
                        </form>
                    </Form>
                </SheetContent>
            </Sheet >
        </>
    )

}
