import useSWR from "swr"

export interface Project {
    id: string
    name: string
    type: ProjectType
    role?: Role
}

export enum ProjectType {
    Personal = 'personal',
    Professional = 'professional',
}

export enum Role {
    Owner = 'owner',
    Admin = 'admin',
    Member = 'member',
    Viewer = 'viewer',
}

export const useProjects = (): {
    projects: Project[],
    isLoading: boolean,
    error: any,
    mutate: () => Promise<any>,
} => {
    const { data: projects, isLoading, error, mutate } = useSWR('/api/projects')

    return { projects, isLoading, error, mutate }
}
