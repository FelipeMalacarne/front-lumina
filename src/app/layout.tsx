import { Inter as FontSans } from "next/font/google"
import "./globals.css";

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SWRProvider } from "@/components/providers/swr-provider";

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
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <SWRProvider>
                        <div className="relative flex min-h-screen flex-col">
                            {children}
                        </div>
                    </SWRProvider>
                </ThemeProvider>
            </body>
        </html >
    );
}
