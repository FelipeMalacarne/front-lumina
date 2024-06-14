import { SidebarNav } from "@/components/sidebar-nav";
import { Separator } from "@/components/ui/separator";

const sidebarNavItems = [
    {
        title: "Perfil",
        href: "/user"
    },
    {
        title: "Aparência",
        href: "/user/appearance"
    }
]

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="space-y-6 p-10 pb-16">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Configurações - Usuário</h2>
                <p className="text-muted-foreground">
                    Visualize e edite as configurações relacionadas ao seu usuário
                </p>
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="mx-4 lg:w-1/5">
                    <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className="flex-1">{children}</div>
            </div>
        </div>
    )
}
