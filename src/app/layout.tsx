import { Inter as FontSans } from "next/font/google"
import "./globals.css";

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/providers/theme-provider";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )} >

                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                // disableTransitionOnChange
                >
                    <div className="relative flex min-h-screen flex-col bg-background">
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html >
    );
}
