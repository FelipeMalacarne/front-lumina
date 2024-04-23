import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
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
