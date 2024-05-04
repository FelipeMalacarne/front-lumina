import { cn } from "@/lib/utils";
import Link from "next/link";

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
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
    )
}
