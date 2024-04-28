'use client'
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/auth"
import { Label } from "@radix-ui/react-label"
import { useState } from "react"

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
}

export default function RegisterForm({ className, ...props }: RegisterFormProps) {
    const { register } = useAuth({ middleware: 'guest' })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [credentials, setCredentials] = useState({
        email: '',
        name: '',
        password: '',
        password_confirmation: '',
    })


    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        props.setIsLoading(true)


        try {
            console.log(credentials)
            register({ credentials, setErrors })
            console.log(errors)
        } catch (error) {
            console.log(errors)
            console.error(error)
        }

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
                    />

                    <Label className="sr-only" htmlFor="Name">
                        Name
                    </Label>
                    <Input
                        id="name"
                        placeholder="Name"
                        type="text"
                        autoCapitalize="words"
                        autoComplete="name"
                        disabled={props.isLoading}
                        onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
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
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />

                    <Label className="sr-only" htmlFor="password">
                        Password Confirmation
                    </Label>
                    <Input
                        id="password_confirmation"
                        placeholder="Confirm Password"
                        type="password"
                        disabled={props.isLoading}
                        onChange={(e) => setCredentials({ ...credentials, password_confirmation: e.target.value })}
                    />
                </div>
                <Button onClick={onSubmit} disabled={props.isLoading}>
                    {props.isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}

                    Sign Up with Email
                </Button>
            </div>
        </form>
    )
}
