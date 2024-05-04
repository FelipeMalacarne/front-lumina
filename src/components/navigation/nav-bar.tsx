import ProjectSwitcher from "./project-switcher";

const Navbar = () => {

    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <ProjectSwitcher />

                    </div>
                </div>
            </div>

        </>

    )
}

export default Navbar;
