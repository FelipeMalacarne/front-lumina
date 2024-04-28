'use client'
import InputError from "@/components/InputError"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/auth"
import { Errors } from "@/lib/types"
import { Label } from "@radix-ui/react-label"
import { Dispatch, SetStateAction, useState } from "react"

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

export default function LoginForm({ className, ...props }: LoginFormProps) {
    const { login } = useAuth({ middleware: 'guest' })
    const [errors, setErrors] = useState<Errors>({})
    const [status, setStatus] = useState<string>('')
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        props.setIsLoading(true)

        await login({ credentials, setErrors, setStatus })

        props.setIsLoading(false)
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
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        className={errors.email ? 'border-destructive' : ''}

                    />
                    <InputError messages={errors.email} className="mb-2" />

                    <Label className="sr-only" htmlFor="password">
                        Password
                    </Label>
                    <Input
                        id="password"
                        placeholder="Password"
                        type="password"
                        autoComplete="current-password"
                        disabled={props.isLoading}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        className={errors.password ? 'border-destructive' : ''}
                    />
                    <InputError messages={errors.password} className="mb-2" />

                </div>
                <Button disabled={props.isLoading} className="mt-3">
                    {props.isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign In with Email
                </Button>
            </div>
        </form>
    )
}
