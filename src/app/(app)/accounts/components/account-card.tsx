import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Account, AccountColor } from "@/hooks/accounts";
import { cn } from "@/lib/utils";
import { Landmark } from "lucide-react";

type AccountCardProps = {
    account: Account
}

export function AccountCard({ color }: { color: AccountColor }) {

    const colors = {
        'lavender': { background: 'bg-lavender', foreground: 'text-lavender-foreground' },
        'orange': { background: 'bg-orange', foreground: 'text-orange-foreground' },
        'green': { background: 'bg-green', foreground: 'text-green-foreground' },
        'yellow': { background: 'bg-yellow', foreground: 'text-yellow-foreground' },
        'emerald': { background: 'bg-emerald', foreground: 'text-emerald-foreground' },
    }


    return (
        <Card className="max-w-xs hover:shadow-lg transition-shadow cursor-pointer">
            <CardTitle>
                <div className={cn(`w-full flex justify-center align-middle p-4 py-8 rounded-t-lg`, colors[color].background)}>
                    <Landmark size={64} className={colors[color].foreground} />
                </div>
            </CardTitle>
            <CardHeader>
                <CardTitle>
                    Nome da conta
                </CardTitle>
                <CardDescription className={"h-24 text-ellipsis overflow-hidden line-clamp-5"}>
                    Descrição da conta explicando pra quê ela serve
                </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between">
                <p>Numero da conta</p>
                <p>Banco</p>
            </CardContent>
        </Card >
    )
}
