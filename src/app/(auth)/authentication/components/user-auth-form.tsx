'use client'
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Label } from "@radix-ui/react-label"
import { useState } from "react"
import LoginForm from "./login-form"
import RegisterForm from "./register-form"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    formType?: 'login' | 'register'
}

export default function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            {props.formType === 'register'
                ? <RegisterForm isLoading={isLoading} setIsLoading={setIsLoading} />
                : <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
            }

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>

            <div className="grid gap-2">

                <Button variant="outline" type="button" disabled={isLoading} className="text-orange-700 dark:text-orange-400 hover:text-orange-900 dark:hover:text-orange-300">
                    {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.google className="mr-2 h-4 w-4" />
                    )}{" "}
                    Google
                </Button>

                <Button variant="outline" type="button" disabled={isLoading} className="text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                    {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.facebook className="mr-2 h-4 w-4" />
                    )}{" "}
                    Facebook
                </Button>
            </div>
        </div>
    )
}
