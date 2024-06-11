'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Account, useAccounts } from "@/hooks/accounts";
import { cn } from "@/lib/utils";
import { Landmark, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/delete-dialog";
import { useState } from "react";

type AccountCardProps = {
    account: Account
}

export function AccountCard({ account }: AccountCardProps) {
    const { deleteAccount } = useAccounts()
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

    const colors = {
        'lavender': { background: 'bg-lavender', foreground: 'text-lavender-foreground' },
        'orange': { background: 'bg-orange', foreground: 'text-orange-foreground' },
        'green': { background: 'bg-green', foreground: 'text-green-foreground' },
        'yellow': { background: 'bg-yellow', foreground: 'text-yellow-foreground' },
        'emerald': { background: 'bg-emerald', foreground: 'text-emerald-foreground' },
    }

    const selected = account.color || 'lavender'

    const handleDelete = () => {
        deleteAccount(account.id)
        setShowDeleteModal(false)
    }

    return (
        <Card className="w-80 hover:shadow-lg transition-shadow">
            <DeleteDialog
                open={showDeleteModal}
                setOpen={setShowDeleteModal}
                onConfirm={handleDelete}
            />

            <CardTitle>
                <div className={cn(`relative w-full flex justify-center align-middle p-4 py-8 rounded-t-lg`, colors[selected].background)}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8 absolute top-2 right-2 hover:bg-opacity-10">
                                <MoreHorizontal className={colors[selected].foreground} />
                                <span className="sr-only">More</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem >Editar</DropdownMenuItem>
                            <DropdownMenuItem>Exportar</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setShowDeleteModal(true)} >Excluir</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Landmark size={64} className={colors[selected].foreground} />
                </div>
            </CardTitle>

            <CardHeader>
                <div className="flex justify-between">
                    <CardTitle>{account.name}</CardTitle>

                </div>

                <CardDescription className={"h-24 text-ellipsis overflow-hidden line-clamp-5"}>
                    {account.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="mt-auto">

                <p className="text-sm/10 font-medium text-ellipsis overflow-hidden line-clamp-1">
                    {account.number + (account.check_digit ? `-${account.check_digit}` : "")}
                </p>

                <p className="text-sm/10 font-medium text-ellipsis line-clamp-1 justify-self-end">
                    {account.bank_name}
                </p>

            </CardContent>
        </Card >
    )
}
