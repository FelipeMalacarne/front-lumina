import { Icons } from "./icons"

const Loading = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-background text-foreground">
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        </div>
    )
}

export default Loading
