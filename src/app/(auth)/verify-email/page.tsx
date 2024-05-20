'use client'
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/auth"
import { useState, useEffect } from "react";

export default function VerifyPage() {
    const { resendEmailVerification } = useAuth({ middleware: 'guest' });
    const [status, setStatus] = useState('');
    const [remainingTime, setRemainingTime] = useState(60);
    const [isResendEnabled, setIsResendEnabled] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (remainingTime > 0) {
            timer = setTimeout(() => {
                setRemainingTime(remainingTime - 1);
            }, 1000);
        } else {
            setIsResendEnabled(true);
        }

        return () => clearTimeout(timer);
    }, [remainingTime]);

    const handleResend = () => {
        if (isResendEnabled) {
            resendEmailVerification({ setStatus });
            setRemainingTime(60);
            setIsResendEnabled(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen px-4 md:px-6">
            <div className="max-w-md w-full space-y-4 text-center">
                <h1 className="text-3xl font-bold">Verifique Seu Email</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Enviamos uma mensagem de verificação para sua caixa de entrada. Por favor, verifique seu email e clique no link para confirmar sua conta.
                </p>
                <Button onClick={handleResend} disabled={!isResendEnabled}>
                    {isResendEnabled ? 'Resend Verification Email' : `Resend in ${remainingTime}s`}
                </Button>
                <p className="text-muted-foreground">{status}</p>
            </div>
        </div>
    );
}

