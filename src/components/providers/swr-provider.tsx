'use client';
import axios from '@/lib/axios';
import { SWRConfig } from 'swr'

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <SWRConfig value={{
            fetcher: (resource, init) => axios(resource, init).then(res => res.data),
        }}>
            {children}
        </SWRConfig>
    )
};
