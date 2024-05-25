import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Account } from "@/hooks/accounts";
import { cn } from "@/lib/utils";
import { Landmark } from "lucide-react";

type AccountCardProps = {
    account: Account
}

export function AccountCard({ account }: AccountCardProps) {

    const colors = {
        'lavender': { background: 'bg-lavender', foreground: 'text-lavender-foreground' },
        'orange': { background: 'bg-orange', foreground: 'text-orange-foreground' },
        'green': { background: 'bg-green', foreground: 'text-green-foreground' },
        'yellow': { background: 'bg-yellow', foreground: 'text-yellow-foreground' },
        'emerald': { background: 'bg-emerald', foreground: 'text-emerald-foreground' },
    }

    const selected = account.color || 'lavender'

    return (
        <Card className="w-80 hover:shadow-lg transition-shadow cursor-pointer">
            <CardTitle>
                <div className={cn(`w-full flex justify-center align-middle p-4 py-8 rounded-t-lg`, colors[selected].background)}>
                    <Landmark size={64} className={colors[selected].foreground} />
                </div>
            </CardTitle>
            <CardHeader>
                <CardTitle>
                    {account.name}
                </CardTitle>

                <CardDescription className={"h-24 text-ellipsis overflow-hidden line-clamp-5"}>
                    {account.description}
                </CardDescription>
            </CardHeader>
            <CardContent>

            </CardContent>

                <CardFooter>
                <div className="grid grid-cols-2">
                    <p className="text-sm/10 font-medium text-ellipsis overflow-hidden line-clamp-1">
                        {account.number + '-' + account.check_digit}
                    </p>

                    <p className="text-sm/10 font-medium text-ellipsis line-clamp-1 justify-self-end">
                        {account.bank_name}
                    </p>
                </div>
                </CardFooter>

        </Card >
    )
}
