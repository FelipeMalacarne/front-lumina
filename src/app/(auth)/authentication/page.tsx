'use client'
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import UserAuthForm from "./components/user-auth-form";
import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";

// export const metadata = {
//     title: "Authentication",
//     description: "Authentication page",
// }

export default function AuthenticationPage() {
    const [formType, setFormType] = useState<'login' | 'register'>('login')

    return (
        <>
            <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">

                <div className="hidden md:flex absolute right-4 top-4 md:right-8 md:top-8">
                    <Button
                        variant="ghost"
                        onClick={() => setFormType((prev) => (prev === 'login' ? 'register' : 'login'))
                        }>
                        {formType === 'login' ? "Don't Have an Account?" : "Already Have an Account?"}
                    </Button>

                    <ModeToggle className="ml-4" />
                </div>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-primary-foreground lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-primary" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        Lumina Inc
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;Esse aplicativo de finanças salvou minha vida, agora tenho dinheiro o suficiente pra sustentar
                                meu vicio no tigrinho, estou muito feliz por poder jogar todo dia!
                                &rdquo;
                            </p>
                            <footer className="text-sm">Sérgio Sacani</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="p-8">

                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center items-center">

                            <span className="scroll-m-20 text-4xl my-8 font-extrabold tracking-wide lg:hidden flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-6 w-6"
                                >
                                    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                                </svg>
                                Lumina
                            </span>

                            <h1 className="text-2xl font-semibold tracking-tight">
                                {formType === 'register'
                                    ? "Create an account"
                                    : "Sign in"
                                }
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {formType === 'register'
                                    ? "Enter your email below to create your account"
                                    : "Enter your email below to sign in"
                                }
                            </p>
                        </div>

                        <UserAuthForm formType={formType} />

                        <p className="px-8 text-center text-sm text-muted-foreground md:hidden">

                            {formType === 'register'
                                ? "Already have an account? "
                                : "Don't have an account? "
                            }
                            <a
                                className="underline underline-offset-4 text-primary hover:text-primary/80"
                                onClick={() => setFormType((prev) => (prev === 'login' ? 'register' : 'login'))
                                }>
                                {formType === 'login' ? "Sign Up" : "Sign In"}
                            </a>

                        </p>


                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <a
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
