import { AccountList } from "./components/account-list";
import { NewAccountSheet } from "./components/new-account-sheet";

export const metadata = {
    title: "Contas Bancárias",
    description: "Contas Bancárias page",
}

const AccountsPage = () => {

    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between">

                <h2 className="text-3xl font-bold tracking-tight">Contas Bancárias</h2>
                <NewAccountSheet />

            </div>

            <div className="space-y-4">
                <AccountList />
            </div>

        </div>
    )
}

export default AccountsPage;
