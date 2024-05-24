import useSWR from "swr"

export interface Bank {
    id: number,
    name: string,
}

type Banks = {
    data: Bank[]
}

export const useBanks = (): {
    banks: Banks,
    isLoading: boolean,
    error: any,
} => {
    const { data: banks, isLoading, error } = useSWR('/api/bank')

    return { banks, isLoading, error }
}
