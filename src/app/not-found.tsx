import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

const NotFoundPage = () => {
    return (
        <div className="flex h-[100dvh] flex-col items-center justify-center gap-6 bg-background px-4 ">
            <div className="space-y-2 text-center">
                <h1 className="text-9xl font-bold tracking-tighter text-foreground">404</h1>
                <p className="text-lg text-foreground">
                    Opa, a página que você está procurando não existe.
                </p>
            </div>
            <Link
                className={
                    buttonVariants({ variant: 'outline' })
                }
                href="/dashboard"
            >
                Back to Dashboard
            </Link>
        </div>
    )
}

export default NotFoundPage
