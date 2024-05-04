import MaxWidthWrapper from "@/components/max-width-wrapper";
import previewImage from "@/assets/preview.png"
import fileUploadImage from "@/assets/file-upload-preview.jpg"
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LandingNavigation from "@/components/landing-nav";

export const metadata = {
    title: 'Lumina',
}

export default function Home() {
    return (
        <>
            <LandingNavigation />
            <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
                <div className="mx-auto mv-4 max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-border bg-background px-7 py-2 shadow-md backdrop-blur transition-all hover:border-border/25 hover:bg-background/50">
                    <p className="text-sm font-semibold text-card-foreground bg-card">
                        Lumina is now public!
                    </p>
                </div>
                <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl mt-5">
                    Manage your <span className="text-primary">finance</span> in one
                    place.
                </h1>
                <p className="mt-5 max-w-prose text-foreground/70 sm:text-lg">
                    Lumina is a personal finance app that helps you manage your money,
                    track your spending, and achieve your financial goals.
                </p>

                <Link
                    className={buttonVariants({
                        size: "lg",
                        className: "mt-5",
                    })}
                    href={'/authentication'}
                    target="_blank"
                >
                    Get started{" "}
                    <ArrowRight className="npm cache clean --forceml-2 h-5 w-5" />
                </Link>
            </MaxWidthWrapper>

            {/* value propositon section */}
            <div>
                <div className="relative isolate">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    >
                        <div
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        />
                    </div>

                    <div>
                        <div className="mx-auto max-w-6xl px-6 lg:px-8">
                            <div className="mt-16 flow-root sm:mt-24">
                                <div className="-m-2 rounded-xl bg-card p-2 ring-1 ring-inset ring-ring/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                                    {/* <Image
                    src={"/preview.png"}
                    alt={"Veil dashboard"}
                    // layout="responsive"
                    // objectFit="cover"
                    // objectPosition="center"
                    width={1364}
                    height={866}
                    quality={100}
                    className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                  /> */}
                                    <Image
                                        src={previewImage}
                                        alt="Lumina dashboard"
                                        layout="responsive"
                                        objectFit="cover"
                                        objectPosition="center"
                                        width={1364}
                                        height={866}
                                        className="rounded-md bg-background p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-ring/10"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    >
                        <div
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                            className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-35rem)] sm:w-[72.1875rem]"
                        />
                    </div>
                </div>
            </div>

            {/* feature section */}
            <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
                <div className="mb-12 px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl sm:text-center">
                        <h2 className="mt-2 font-bold text-4xl text-foreground sm:text-5xl">
                            Start managing your money today.
                        </h2>
                        <p className="mt-4 text-lg text-foreground/70">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
                            aspernatur est impedit, perferendis distinctio repellendus, error
                            omnis, doloribus expedita quam vel vitae mollitia inventore
                            deleniti architecto nihil sed? Aliquam, voluptas!
                        </p>
                    </div>
                </div>
                {/* steps */}
                <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
                    <li className="md:flex-1">
                        <div className="flex flex-col space-y-2 border-l-4 border-border/80 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                            <span className="text-sm font-medium text-primary">Step 1</span>
                            <span className="text-xl font-semibold">
                                Sign up for an account
                            </span>
                            <span className="mt-2 text-foreground/70">
                                Either starting out with a free plan or choose our{" "}
                                <Link href="pricing" className="text-primary underline-offset-2">
                                    pro plan
                                </Link>
                                .
                            </span>
                        </div>
                    </li>
                    <li className="md:flex-1">
                        <div className="flex flex-col space-y-2 border-l-4 border-border/80 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                            <span className="text-sm font-medium text-primary">Step 2</span>
                            <span className="text-xl font-semibold">
                                Upload your ofx files
                            </span>
                            <span className="mt-2 text-foreground/70">
                                We&apos;ll automatically process your{" "}
                                <a href="pricing" className="text-primary underline-offset-2">
                                    pro plan
                                </a>
                                .
                            </span>
                        </div>
                    </li>
                    <li className="md:flex-1">
                        <div className="flex flex-col space-y-2 border-l-4 border-border/80 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                            <span className="text-sm font-medium text-blue-600">Step 3</span>
                            <span className="text-xl font-semibold">
                                Start managing your money
                            </span>
                            <span className="mt-2 text-foreground/70">
                                It&apos;s that simple! Try out Lumina today.
                            </span>
                        </div>
                    </li>
                </ol>

                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <div className="mt-16 flow-root sm:mt-24">
                        <div className="-m-2 rounded-xl bg-card p-2 ring-1 ring-inset ring-ring/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                            {/* <Image
                src={"/file-upload-preview.jpg"}
                alt={"Upload file upload preview"}
                // layout="responsive"
                // objectFit="cover"
                // objectPosition="center"
                width={1419}
                height={732}
                quality={100}
                className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
              /> */}
                            <Image
                                src={fileUploadImage}
                                alt="Upload file upload preview"
                                width={1419}
                                height={732}
                                className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
