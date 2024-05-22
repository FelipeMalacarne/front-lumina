import { Button } from "@/components/ui/button";
import { AccountCard } from "./components/account-card";
import { AccountColor } from "@/hooks/accounts";

export const metadata = {
    title: "Contas Bancárias",
    description: "Contas Bancárias page",
}

const AccountsPage = async () => {

    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Contas Bancárias</h2>

                <Button size={'lg'}>
                    + Adicionar Conta
                </Button>
            </div>


            <div className="space-y-4">

                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <AccountCard color={AccountColor.LAVENDER} />
                    <AccountCard color={AccountColor.ORANGE} />
                    <AccountCard color={AccountColor.GREEN} />
                    <AccountCard color={AccountColor.YELLOW} />
                    <AccountCard color={AccountColor.EMERALD} />
                </div>

            </div>

        </div>
    )
}

export default AccountsPage;
