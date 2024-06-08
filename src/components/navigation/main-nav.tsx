'use client'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, Package2 } from "lucide-react";
import { usePathname } from "next/navigation";

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
    const pathName = usePathname()

    const baseClass = "text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-2 py-1 rounded-lg"

    return (
        <>
            <nav
                className={cn("hidden md:flex items-center space-x-4 lg:space-x-6", className)}
                {...props}
            >
                <Link
                    href="/dashboard"
                    className={cn(baseClass, pathName === "/dashboard" ? "text-primary" : "text-muted-foreground")}
                >
                    Visão Geral
                </Link>
                <Link
                    href="/accounts"
                    className={cn(baseClass, pathName === "/accounts" ? "text-primary" : "text-muted-foreground")}
                >
                    Contas Bancárias
                </Link>
                <Link
                    href="/transactions"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    Transações
                </Link>
                <Link
                    href="/project-configuration"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    Configurações
                </Link>
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Package2 className="h-6 w-6" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>

                        <SheetClose asChild>
                            <Link
                                href="/dashboard"
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                Visão Geral
                            </Link>

                        </SheetClose>

                        <SheetClose asChild>
                            <Link
                                href="/accounts"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                Contas Bancárias
                            </Link>
                        </SheetClose>

                        <SheetClose asChild>
                            <Link
                                href="/transactions"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                Transações
                            </Link>
                        </SheetClose>


                        <SheetClose asChild>
                            <Link
                                href="/project-configuration"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                Configurações
                            </Link>
                        </SheetClose>

                    </nav>
                </SheetContent>
            </Sheet>
        </>
    )
}
