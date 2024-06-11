'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Account, AccountColor, useAccounts } from "@/hooks/accounts";
import { cn } from "@/lib/utils";
import { Check, Landmark, MoreHorizontal, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/delete-dialog";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ColorSquare } from "./new-account-sheet";

type AccountCardProps = {
    account: Account
}

const formSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().max(255).optional(),
    color: z.nativeEnum(AccountColor),
})

export function AccountCard({ account }: AccountCardProps) {
    const { deleteAccount, updateAccount } = useAccounts()
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: account.name,
            description: account.description,
            color: account.color,
        }
    })

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

    const handleUpdate = (data: z.infer<typeof formSchema>) => {
        updateAccount(account.id, data)
        setIsEditing(false)
    }

    return (
        <Card className="w-80 hover:shadow-lg transition-shadow">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleUpdate)}>
                    <DeleteDialog
                        open={showDeleteModal}
                        setOpen={setShowDeleteModal}
                        onConfirm={handleDelete}
                    />

                    <CardTitle>
                        <div className={cn(`relative w-full flex justify-center align-middle p-4 py-8 rounded-t-lg`, colors[selected].background)}>
                            {isEditing ? (
                                <div className="flex items-center gap-1 absolute top-2 right-2">
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
                                        <Button size="icon" variant="ghost" className="h-8 w-8 absolute top-2 right-2 hover:bg-opacity-10">
                                            <MoreHorizontal className={colors[selected].foreground} />
                                            <span className="sr-only">More</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => setIsEditing(true)}>Editar</DropdownMenuItem>
                                        <DropdownMenuItem>Exportar</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => setShowDeleteModal(true)} >Excluir</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                            <Landmark size={64} className={colors[selected].foreground} />
                        </div>
                    </CardTitle>

                    <CardHeader>
                        {isEditing ? (
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Nome" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : (
                            <div className="flex justify-between">
                                <CardTitle>{account.name}</CardTitle>
                            </div>
                        )}

                        {isEditing ? (
                            <FormField
                                name="description"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <Textarea
                                            placeholder="Descrição"
                                            className="resize-none"
                                            {...field}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : (
                            <CardDescription className={"h-24 text-ellipsis overflow-hidden line-clamp-5"}>
                                {account.description}
                            </CardDescription>
                        )}

                        {isEditing && (
                            <FormField
                                name="color"
                                control={form.control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione uma Cor"/>
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
                        )}
                    </CardHeader>

                    <CardContent className="mt-auto">

                        <p className="text-sm/10 font-medium text-ellipsis overflow-hidden line-clamp-1">
                            {account.number + (account.check_digit ? `-${account.check_digit}` : "")}
                        </p>

                        <p className="text-sm/10 font-medium text-ellipsis line-clamp-1 justify-self-end">
                            {account.bank_name}
                        </p>

                    </CardContent>

                </form>
            </Form>
        </Card >
    )
}
