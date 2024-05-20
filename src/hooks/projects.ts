import axios from "@/lib/axios"
import { Project } from "@/lib/types"
import useSWR from "swr"

type ProjectsHook = {
    projects: Project[],
    isLoading: boolean,
    error: any,
    mutate: () => Promise<any>,
}

export const useProjects = (): ProjectsHook => {
    const { data: projects, isLoading, error, mutate } = useSWR('/api/projects', async () =>
        axios.get('/api/projects')
            .then(res => res.data)
            .catch(error => { throw error })
    )

    return { projects, isLoading, error, mutate }
}