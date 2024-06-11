'use client'
import { CalendarIcon, Check, ChevronLeft, ChevronRight, Copy, MoreVertical, X, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Pagination, PaginationContent, PaginationItem, } from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"
import { useContext, useEffect, useState } from "react"
import { SelectedTransactionContext } from "@/components/providers/selected-transaction-provider"
import { Account, useAccounts } from "@/hooks/accounts"
import { useTransactions } from "@/hooks/transactions"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { DeleteDialog } from "@/components/delete-dialog"

const formSchema = z.object({
    amount: z.coerce.number({ required_error: "O valor é obrigatório" })
        .max(9999999)
        .refine((val) => val !== 0, { message: "O valor não pode ser 0" })
        .transform((val) => Math.round(val * 100)),
    date_posted: z.date({ required_error: "A data é obrigatória" }),
    memo: z.string().max(255).optional(),
})

export default function SingleTransactionCard() {
    const { selectedTransaction, setSelectedTransaction } = useContext(SelectedTransactionContext)
    const { accounts } = useAccounts()
    const { deleteTransaction, updateTransaction } = useTransactions()

    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 0,
            memo: '',
            date_posted: new Date()
        }
    });

    useEffect(() => {
        setIsEditing(false)
    }, [selectedTransaction])

    if (!selectedTransaction || !accounts) return null;

    const account = accounts.find((account: Account) => account.id === selectedTransaction.account_id)

    if (!account) return null

    const handleEditClick = () => {
        setIsEditing(true);

        form.setValue('amount', selectedTransaction.amount / 100)
        form.setValue('memo', selectedTransaction.memo ?? '')
        form.setValue('date_posted', new Date(selectedTransaction.date_posted))
    };
    const handleDelete = () => {
        deleteTransaction(selectedTransaction.id)
        setSelectedTransaction(null)
        setShowDeleteDialog(false)
    }

    const handleUpdate = (data: z.infer<typeof formSchema>) => {
        updateTransaction(selectedTransaction.id, data)

        setSelectedTransaction({
            ...selectedTransaction,
            ...data,
            amount: data.amount
        })

        setIsEditing(false)
    }

    return (
        <Card className="overflow-hidden">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleUpdate)}>

                    <DeleteDialog
                        onConfirm={handleDelete}
                        open={showDeleteDialog}
                        setOpen={setShowDeleteDialog}
                    />

                    <CardHeader className="flex flex-row items-start bg-muted/50">
                        <div className="grid gap-0.5">
                            <CardTitle className="group flex items-center gap-2 text-lg">
                                Transação {selectedTransaction?.id}
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                >
                                    <Copy className="h-3 w-3" onClick={() => navigator.clipboard.writeText(selectedTransaction?.id)} />
                                    <span className="sr-only">Copy Transaction ID</span>
                                </Button>
                            </CardTitle>
                        </div>
                        <div className="ml-auto flex items-center gap-1">

                            {isEditing ? (
                                <div className="flex items-center gap-1">
                                    <Button size="icon" variant="outline" className="h-8 w-8" type="submit">
                                        <Check className="h-3.5 w-3.5" />
                                    </Button>

                                    <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => setIsEditing(false)} >
                                        <X className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            ) : (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="outline" className="h-8 w-8">
                                            <MoreVertical className="h-3.5 w-3.5" />
                                            <span className="sr-only">More</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={handleEditClick}>Editar</DropdownMenuItem>
                                        <DropdownMenuItem>Exportar</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>Excluir</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}

                        </div>
                    </CardHeader>
                    <CardContent className="p-6 text-sm">
                        <div className="grid gap-3">

                            <div className="font-semibold">Detalhes da Transação</div>

                            <ul className="grid gap-3">
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground"> Valor </span>
                                    {isEditing ? (
                                        <FormField
                                            control={form.control}
                                            name="amount"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input {...field} type="number" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ) : (
                                        <span>
                                            {new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            }).format(selectedTransaction.amount / 100)}
                                        </span>
                                    )}
                                </li>

                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground w-1/2">Memo</span>
                                    {isEditing ? (
                                        <FormField
                                            control={form.control}
                                            name="memo"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ) : (
                                        <span className="text-right break-words"> {selectedTransaction.memo} </span>
                                    )}
                                </li>

                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground"> Realizada </span>
                                    {isEditing ? (
                                        <FormField
                                            control={form.control}
                                            name="date_posted"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-full pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "PPP", { locale: ptBR })
                                                                    ) : (
                                                                        <span>Escolha uma data</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                locale={ptBR}
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                    date > new Date() || date < new Date("1900-01-01")
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ) : (
                                        <span>
                                            {new Date(selectedTransaction.date_posted).toLocaleDateString('pt-BR', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    )}
                                </li>

                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        Adicionada em
                                    </span>
                                    <span>
                                        {new Date(selectedTransaction.created_at).toLocaleDateString('pt-BR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </span>

                                </li>
                            </ul>

                        </div>
                        <Separator className="my-2" />
                        <div className="grid gap-3">
                            <div className="font-semibold">Informações da Conta</div>
                            <ul className="grid gap-3">
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        Identificador
                                    </span>
                                    <span>{account.id}</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        Nome
                                    </span>
                                    <span>{account.name}</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        Número
                                    </span>
                                    <span>{account.number}</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        Dígito Verificador
                                    </span>
                                    <span>{account.check_digit}</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        Banco
                                    </span>
                                    <span>{account.bank_name}</span>
                                </li>
                            </ul>
                        </div>
                    </CardContent >
                    <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                        <div className="text-xs text-muted-foreground">
                            Atualizado <time dateTime={selectedTransaction.updated_at.toString()}>
                                {new Date(selectedTransaction.updated_at).toLocaleDateString('pt-BR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </time>
                        </div>
                        <Pagination className="ml-auto mr-0 w-auto">
                            <PaginationContent>
                                <PaginationItem>
                                    <Button size="icon" variant="outline" className="h-6 w-6">
                                        <ChevronLeft className="h-3.5 w-3.5" />
                                        <span className="sr-only">Previous Order</span>
                                    </Button>
                                </PaginationItem>
                                <PaginationItem>
                                    <Button size="icon" variant="outline" className="h-6 w-6">
                                        <ChevronRight className="h-3.5 w-3.5" />
                                        <span className="sr-only">Next Order</span>
                                    </Button>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </CardFooter>

                </form>
            </Form>
        </Card >
    )
}
