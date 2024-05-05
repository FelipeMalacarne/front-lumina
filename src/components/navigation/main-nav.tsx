import { cn } from "@/lib/utils";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, Package2 } from "lucide-react";
import ProjectSwitcher from "./project-switcher";

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
    return (
        <>
            <nav
                className={cn("hidden md:flex items-center space-x-4 lg:space-x-6", className)}
                {...props}
            >
                <Link
                    href="/dashboard"
                    className="text-sm font-medium transition-colors hover:text-primary"
                >
                    Visão Geral
                </Link>
                <Link
                    href="/transactions"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    Transações
                </Link>
                <Link
                    href="/ledgers"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    Carteiras
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
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            Visão Geral
                        </Link>
                        <Link
                            href="/transactions"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Transações
                        </Link>
                        <Link
                            href="/ledgers"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Carteiras
                        </Link>
                        <Link
                            href="/project-configuration"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Configurações
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
        </>
    )
}
