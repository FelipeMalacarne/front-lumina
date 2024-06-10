'use client'
import { Transaction } from "@/hooks/transactions";
import { createContext, useState } from "react";

type SelectedTransactionContextType = {
    selectedTransaction: Transaction | null;
    setSelectedTransaction: (transaction: Transaction | null) => void;
}

export const SelectedTransactionContext = createContext<SelectedTransactionContextType>({} as SelectedTransactionContextType);

export const SelectedTransactionProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

    return (
        <SelectedTransactionContext.Provider value={{ selectedTransaction, setSelectedTransaction }}>
            {children}
        </SelectedTransactionContext.Provider>
    );
}
