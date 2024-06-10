'use client'
import {
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    MoreVertical,
    Truck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"
import { useContext } from "react"
import { SelectedTransactionContext } from "@/components/providers/selected-transaction-provider"
import useSWR from "swr"
import { Account } from "@/hooks/accounts"

export default function SingleTransactionCard() {
    const { selectedTransaction } = useContext(SelectedTransactionContext)

    const { data: account, error, isLoading }: {
        data: Account | undefined, error: any, isLoading: boolean
    } = useSWR(`/api/account/${selectedTransaction?.account_id}`)

    if (!selectedTransaction) return null

    if (!account || isLoading) return null

    return (
        <Card className="overflow-hidden">
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="outline" className="h-8 w-8">
                                <MoreVertical className="h-3.5 w-3.5" />
                                <span className="sr-only">More</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Export</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Trash</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
                <div className="grid gap-3">

                    <div className="font-semibold">Detalhes da Transação</div>
                    <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Valor
                            </span>
                            <span>{selectedTransaction.amount}</span>
                        </li>

                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground w-1/2">Memo</span>
                            <span className="text-right break-words">
                                {selectedTransaction.memo}
                            </span>
                        </li>

                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Realizada
                            </span>
                            <span>
                                {new Date(selectedTransaction.date_posted).toLocaleDateString('pt-BR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </span>
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
        </Card >
    )
}
