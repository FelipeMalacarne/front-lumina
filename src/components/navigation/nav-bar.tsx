import { User } from "@/lib/types";
import { ModeToggle } from "../mode-toggle";
import { MainNav } from "./main-nav";
import ProjectSwitcher from "./project-switcher";
import { UserNav } from "./user-nav";


interface NavbarProps {
    user: User
    logout: () => void
}

const Navbar = ({ user, logout }: NavbarProps) => {

    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <ProjectSwitcher />
                        <MainNav className="mx-6" />

                        <div className="ml-auto flex items-center space-x-4">
                            <ModeToggle />
                            <UserNav user={user} logout={logout} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;
