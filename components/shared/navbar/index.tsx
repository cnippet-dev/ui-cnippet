// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useTheme } from "next-themes";
// import { RiMoonFill, RiSunLine } from "@remixicon/react";

// import { CommandMenu } from "@/components/ui/command-menu";
// import { MobileNav } from "@/components/shared/navbar/mobile-nav";
// import NavUser from "./nav-user";

// const Nav1 = () => {
//     const { theme, setTheme } = useTheme();
//     const [mounted, setMounted] = useState(false);

//     useEffect(() => {
//         setMounted(true);
//     }, []);

//     return (
//         <>
//             <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 mx-auto w-full max-w-full border-t-0 border-b px-4 backdrop-blur md:px-10 xl:px-20 2xl:px-30 dark:border-neutral-900 dark:bg-black/70">
//                 <div className="w-full border border-t-0 border-b-0 border-r-0 dark:border-neutral-800">
//                     <div className="grid grid-cols-2 divide-x-0 md:grid-cols-6 md:divide-x dark:divide-neutral-800">
//                         <div className="col-span-1 px-4 py-3 md:col-span-1">
//                             {mounted && (
//                                 <Link
//                                     className="mr-4 flex items-center gap-0 lg:mr-6"
//                                     href="/"
//                                 >
//                                     {theme === "dark" ? (
//                                         <Image
//                                             src="https://res.cloudinary.com/dphulm0s9/image/upload/v1746006954/logo-dark.png"
//                                             alt=""
//                                             className="size-9 rounded-full"
//                                             width={1080}
//                                             height={1080}
//                                         />
//                                     ) : (
//                                         <Image
//                                             src="https://res.cloudinary.com/dphulm0s9/image/upload/v1746006954/logo-light.png"
//                                             alt=""
//                                             className="size-9 rounded-full"
//                                             width={1080}
//                                             height={1080}
//                                         />
//                                     )}

//                                     <span className="hidden font-mono text-xl lg:inline-block">
//                                         Cnippet/ui
//                                     </span>
//                                 </Link>
//                             )}
//                         </div>

//                         <div className="col-span-3 hidden items-center px-4 md:flex">
//                             <nav className="flex items-center gap-4 text-sm xl:gap-6">
//                                 <Link
//                                     href="/components/button"
//                                     className="text-foreground/80 hover:text-foreground/80 transition-colors"
//                                 >
//                                     Components
//                                 </Link>
//                                 <Link
//                                     href="/motions/accordion"
//                                     className="text-foreground/80 hover:text-foreground/80 transition-colors"
//                                 >
//                                     Motion
//                                 </Link>
//                                 <Link
//                                     href="/charts/area-chart"
//                                     className="text-foreground/80 hover:text-foreground/80 transition-colors"
//                                 >
//                                     Charts
//                                 </Link>
//                                 <Link
//                                     href="#"
//                                     className="text-foreground/80 hover:text-foreground/80 transition-colors"
//                                 >
//                                     Sections
//                                 </Link>
//                             </nav>
//                         </div>

//                         <div className="col-span-1 hidden md:block">
//                             <CommandMenu />
//                         </div>

//                         <div className="col-span-1 hidden items-center justify-center md:flex">
//                             <nav className="flex items-center justify-center gap-0.5">
//                                 <Link
//                                     target="_blank"
//                                     rel="noreferrer"
//                                     className="hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring [&amp;_svg]:pointer-events-none [&amp;_svg]:size-5 [&amp;_svg]:shrink-0 inline-flex h-8 w-8 items-center justify-center gap-2 rounded-md px-0 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
//                                     href="https://github.com/cnippet-site/all-elements/"
//                                 >
//                                     <svg
//                                         viewBox="0 0 438.549 438.549"
//                                         className="size-5"
//                                     >
//                                         <path
//                                             fill="currentColor"
//                                             d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
//                                         ></path>
//                                     </svg>
//                                     <span className="sr-only">GitHub</span>
//                                 </Link>

//                                 {mounted && (
//                                     <div className="group/toggle focus-visible:ring-ring [&amp;_svg]:pointer-events-none [&amp;_svg]:size-5 [&amp;_svg]:shrink-0 inline-flex h-8 w-8 items-center justify-center gap-2 rounded-md px-0 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:bg-none focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
//                                         {theme === "dark" ? (
//                                             <button
//                                                 onClick={() =>
//                                                     setTheme("light")
//                                                 }
//                                                 className={`cursor-pointer rounded-full p-1.5`}
//                                                 aria-label="Light mode"
//                                             >
//                                                 <RiSunLine className="size-5" />
//                                             </button>
//                                         ) : (
//                                             <button
//                                                 onClick={() => setTheme("dark")}
//                                                 className={`cursor-pointer rounded-full p-1.5`}
//                                                 aria-label="Dark mode"
//                                             >
//                                                 <RiMoonFill className="size-5" />
//                                             </button>
//                                         )}

//                                         <span className="sr-only">
//                                             Toggle theme
//                                         </span>
//                                     </div>
//                                 )}

//                                 <NavUser />
//                             </nav>
//                         </div>

//                         <div className="col-span-1 ml-auto flex items-center justify-end md:col-span-0 md:hidden">
//                             <MobileNav />
//                         </div>
//                     </div>
//                 </div>
//             </header>
//         </>
//     );
// };

// export default Nav1;

"use client";
import React from "react";
import Link from "next/link";
import NavClientContent from "./nav-client-content";
import Image from "next/image";
import { useTheme } from "next-themes";

const Navbar = () => {
    const theme = useTheme();
    return (
        <>
            <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-0 flex h-full w-full overflow-visible">
                <div
                    className="absolute top-20 left-0 z-0 h-[1px] w-full flex-auto overflow-hidden border-t border-dashed border-gray-200 dark:border-neutral-700"
                    data-border="true"
                    data-framer-name="Top divider"
                ></div>

                <div
                    className="absolute top-0 left-1/2 z-0 h-28 w-full max-w-7xl flex-auto -translate-x-1/2 overflow-visible"
                    data-framer-name="Vertical lines"
                >
                    <div
                        className="absolute right-0 bottom-0 z-0 h-full w-[1px] border-r border-dashed border-gray-200 dark:border-neutral-700"
                        data-border="true"
                        data-framer-name="Right line"
                    >
                        <div
                            className="cnippet-dot"
                            data-border="true"
                            data-framer-name="Ellipsis"
                        ></div>
                    </div>
                    <div
                        className="absolute bottom-0 left-0 z-0 h-full w-[1px] border-r border-dashed border-gray-200 dark:border-neutral-700"
                        data-border="true"
                        data-framer-name="Left line"
                    >
                        <div
                            className="cnippet-dot"
                            data-border="true"
                            data-framer-name="Ellipsis"
                        ></div>
                    </div>
                </div>
            </div>

            <div className="sticky top-0 z-50">
                <div className="sticky top-4 z-50 pt-3 pb-6">
                    <nav className="mx-auto flex max-w-4xl items-center justify-between rounded-full bg-gray-200/60 px-2 py-2 backdrop-blur-md dark:bg-neutral-800/50">
                        <Link href="/" className="flex items-center">
                            <Image
                                src={
                                    theme.theme === "dark"
                                        ? "/logo-dark.png"
                                        : "/logo-light.png"
                                }
                                alt=""
                                className="size-10"
                                width={1080}
                                height={1080}
                            />
                            <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                Cnippet{" "}
                                <span className="text-gray-400 dark:text-gray-500">
                                    Ui
                                </span>
                            </span>
                        </Link>

                        <NavClientContent />
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Navbar;
