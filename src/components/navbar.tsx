import { buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "./max-width-wrapper";

const Navbar = () => {
    return (
        <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-border bg-card backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between border-b border-border">
                    <a href="/" className="flex z-40 font-semibold">
                        <span>Lumina.</span>
                    </a>

                    {/* todo: add mobile navbar */}

                    <div className="hidden items-center space-x-4 sm:flex">
                        <>
                            <a
                                className={buttonVariants({
                                    variant: "ghost",
                                    size: "sm",
                                })}
                                href="/pricing"
                            >
                                Pricing
                            </a>
                        </>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
};

export default Navbar;
