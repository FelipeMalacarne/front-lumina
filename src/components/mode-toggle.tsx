"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"
interface ModeToggleProps extends React.HTMLAttributes<HTMLButtonElement> { }

export function ModeToggle({ className, ...props }: ModeToggleProps) {
    const { theme, setTheme } = useTheme()

    const handleToggle = () => {
        theme === "light" ? setTheme("dark") : setTheme("light")
    }

    return (
        <Button variant="outline" size="icon" onClick={handleToggle} className={cn(className)} {...props}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
