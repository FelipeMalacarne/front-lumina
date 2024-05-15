import { ModeToggle } from "../mode-toggle";
import { MainNav } from "./main-nav";
import ProjectSwitcher from "./project-switcher";
import { UserNav } from "./user-nav";

const Navbar = () => {
    return (
        <>
            <div className="flex-col flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <div className="flex">
                            <MainNav className="mx-6 md:order-2" />
                            <ProjectSwitcher className="mx-1 md:order-1 " />
                        </div>

                        <div className="ml-auto flex items-center space-x-4">
                            <ModeToggle />
                            <UserNav />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;
