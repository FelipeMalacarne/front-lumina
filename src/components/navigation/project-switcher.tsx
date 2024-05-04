'use client'

import {
    CaretSortIcon,
    CheckIcon,
    PlusCircledIcon,
} from "@radix-ui/react-icons"
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "../ui/command";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

// TODO:: implement
const groups = [
    {
        label: "Projeto Pessoal",
        projects: [
            {
                label: "Felipe Malacarne",
                value: "personal",
            },
        ],
    },
    {
        label: "Projetoj",
        projects: [
            {
                label: "Acme Inc.",
                value: "acme-inc",
            },
            {
                label: "Monsters Inc.",
                value: "monsters",
            },
        ],
    },
]

type Project = (typeof groups)[number]["projects"][number]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface ProjectSwitcherProps extends PopoverTriggerProps { }

const ProjectSwitcher = ({ className }: ProjectSwitcherProps) => {

    const [open, setOpen] = useState(false)
    const [showNewProjectDialog, setShowNewProjectDialog] = useState(false)
    const [selectedProject, setSelectedProject] = useState<Project>(
        groups[0].projects[0]
    )

    return (
        <>
            <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            role="combobox"
                            aria-expanded={open}
                            aria-label="Select a team"
                            className={cn("w-[200px] justify-between text-ellipsis", className)}
                        >
                            <Avatar className="mr-2 h-5 w-5">
                                <AvatarImage
                                    // TODO: Avatar src
                                    src={`https://avatar.vercel.sh/${selectedProject.value}.png`}
                                    alt={selectedProject.label}
                                    className="grayscale"
                                />
                                <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                            {selectedProject.label}
                            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />

                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandList>
                                <CommandInput placeholder="Search team..." />
                                <CommandEmpty>Nenhum projeto encontrado.</CommandEmpty>
                                {groups.map((group) => (
                                    <CommandGroup key={group.label} heading={group.label}>
                                        {group.projects.map((project) => (
                                            <CommandItem
                                                key={project.value}
                                                onSelect={() => {
                                                    setSelectedProject(project)
                                                    setOpen(false)
                                                }}
                                                className="text-sm"
                                            >
                                                <Avatar className="mr-2 h-5 w-5">
                                                    <AvatarImage
                                                        src={`https://avatar.vercel.sh/${project.value}.png`}
                                                        alt={project.label}
                                                        className="grayscale"
                                                    />
                                                    <AvatarFallback>SC</AvatarFallback>
                                                </Avatar>
                                                {project.label}
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        selectedProject.value === project.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                ))}
                            </CommandList>
                            <CommandSeparator />
                            <CommandList>
                                <CommandGroup>
                                    <DialogTrigger asChild>
                                        <CommandItem
                                            onSelect={() => {
                                                setOpen(false)
                                                setShowNewProjectDialog(true)
                                            }}
                                        >
                                            <PlusCircledIcon className="mr-2 h-5 w-5" />
                                            Criar Projeto
                                        </CommandItem>
                                    </DialogTrigger>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Criar Projeto</DialogTitle>
                        <DialogDescription>
                            Adicione um novo projeto para gerenciar finanças e clientes.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <div className="space-y-4 py-2 pb-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome do Projeto</Label>
                                <Input id="name" placeholder="Acme Inc." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="plan">Plano de assinatura</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a plan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="free">
                                            <span className="font-medium">Free</span> -{" "}
                                            <span className="text-muted-foreground">
                                                Periodo de teste por duas semanas
                                            </span>
                                        </SelectItem>
                                        <SelectItem value="pro">
                                            <span className="font-medium">Pro</span> -{" "}
                                            <span className="text-muted-foreground">
                                                R$9/mês por usuário
                                            </span>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowNewProjectDialog(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Continuar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ProjectSwitcher;
