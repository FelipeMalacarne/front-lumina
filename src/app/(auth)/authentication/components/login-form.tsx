import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Dispatch, SetStateAction } from "react"

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

export default function LoginForm({ className, ...props }: LoginFormProps) {
    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        props.setIsLoading(true)
        setTimeout(() => {
            props.setIsLoading(false)
        }, 3000)
    }
    return (

        <form onSubmit={onSubmit}>
            <div className="grid gap-2">
                <div className="grid gap-1">
                    <Label className="sr-only" htmlFor="email">
                        Email
                    </Label>
                    <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={props.isLoading}
                    />

                    <Label className="sr-only" htmlFor="password">
                        Password
                    </Label>
                    <Input
                        id="password"
                        placeholder="Password"
                        type="password"
                        autoComplete="current-password"
                        disabled={props.isLoading}
                    />
                </div>
                <Button disabled={props.isLoading}>
                    {props.isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign In with Email
                </Button>
            </div>
        </form>
    )
}
