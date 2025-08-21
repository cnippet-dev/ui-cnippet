// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";

// import { useTheme } from "next-themes";
// import { Sun, Moon, Loader2 } from "lucide-react";
// import { RiGithubLine } from "@remixicon/react";
// import { toast } from "sonner";

// import { Newsletter } from "@/lib/actions/newsletter.actions";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function Footer() {
//     const { theme, setTheme } = useTheme();
//     const [mounted, setMounted] = useState(false);
//     const [email, setEmail] = useState("");
//     const [status, setStatus] = useState<
//         "idle" | "loading" | "success" | "error"
//     >("idle");
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         setMounted(true);
//     }, []);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setStatus("loading");

//         try {
//             if (!email || typeof email !== "string") {
//                 setStatus("error");
//                 setMessage("Invalid email address");
//                 return;
//             }

//             const response = await Newsletter({ email });

//             if (!response.success) {
//                 setStatus("error");
//                 setMessage(response.error || "Failed to subscribe");
//                 return;
//             }
//             toast.success(
//                 "Message sent successfully! We'll get back to you soon.",
//             );
//             setStatus("success");
//             setMessage("You've been subscribed to our newsletter!");
//             setEmail("");
//         } catch (error) {
//             setStatus("error");
//             setMessage(
//                 error instanceof Error ? error.message : "Failed to subscribe",
//             );
//             toast.error(
//                 error instanceof Error
//                     ? error.message
//                     : "Failed to send message",
//             );
//         }
//     };

//     return (
//         <footer className="bg-white px-4 pt-28 pb-10 md:px-8 lg:px-16 dark:bg-black dark:text-white">
//             <div className="mx-auto max-w-6xl px-4 md:px-10">
//                 <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
//                     {/* Logo and Social Links */}
//                     <div className="col-span-2 flex flex-col lg:col-span-1">
//                         <div className="mb-8">
//                             <Link href="/" className="flex items-center gap-2">
//                                 <Image
//                                     src="/images/logo-dark.png"
//                                     alt=""
//                                     className="size-9 rounded-full"
//                                     width={1080}
//                                     height={1080}
//                                 />
//                                 <span className="inline-block">Cnippet UI</span>
//                             </Link>
//                         </div>
//                     </div>

//                     <div className="lg:col-span-1">
//                         <h3 className="mb-4 font-medium">Motion</h3>
//                         <ul className="space-y-2">
//                             <FooterLink href="/motions/installation">
//                                 Installation
//                             </FooterLink>
//                             <FooterLink href="/motions/cursor">
//                                 Cursor
//                             </FooterLink>
//                             <FooterLink href="/motions/dialog">
//                                 Dialog
//                             </FooterLink>
//                             <FooterLink href="/motions/text-effect">
//                                 Text Effect
//                             </FooterLink>
//                             <FooterLink href="/motions/text-loop">
//                                 Text Loop
//                             </FooterLink>
//                             <FooterLink href="/motions/text-roll">
//                                 Text Roll
//                             </FooterLink>
//                             <FooterLink href="/motions/text-shimmer">
//                                 Text Shimmer
//                             </FooterLink>
//                             <FooterLink href="/motions/text-wave">
//                                 Text Wave
//                             </FooterLink>
//                         </ul>
//                     </div>

//                     <div className="lg:col-span-1">
//                         <h3 className="mb-4 font-medium">Chart</h3>
//                         <ul className="space-y-3">
//                             <FooterLink href="/charts/area-chart">
//                                 Area Chart
//                             </FooterLink>
//                             <FooterLink href="/charts/line-chart">
//                                 Line Chart
//                             </FooterLink>
//                             <FooterLink href="/charts/bar-chart">
//                                 Bar Chart
//                             </FooterLink>
//                             <FooterLink href="/charts/pie-chart">
//                                 Pie Chart
//                             </FooterLink>
//                             <FooterLink href="/charts/radial-chart">
//                                 Radial Chart
//                             </FooterLink>
//                         </ul>
//                     </div>

//                     <div className="lg:col-span-1">
//                         <h3 className="mb-4 font-medium">More...</h3>
//                         <ul className="space-y-3">
//                             <FooterLink href="/components">
//                                 Core Components
//                             </FooterLink>
//                             <FooterLink href="/motions">
//                                 Motion Components
//                             </FooterLink>
//                             <FooterLink href="/charts">
//                                 Chart Components
//                             </FooterLink>
//                             <FooterLink href="#">Sections</FooterLink>
//                             <FooterLink href="#">Pages</FooterLink>
//                             <FooterLink href="#">Templates</FooterLink>
//                             <FooterLink href="/contact">Contact Us</FooterLink>
//                         </ul>
//                     </div>

//                     <div className="col-span-2">
//                         <div>
//                             <h3 className="mb-4 font-medium">
//                                 Subscribe to our newsletter
//                             </h3>
//                             <p className="mb-4 text-sm text-gray-400">
//                                 Stay updated on new releases and features,
//                                 guides, and case studies.
//                             </p>
//                             <form
//                                 onSubmit={handleSubmit}
//                                 className="flex flex-col gap-2 rounded-lg border-none bg-slate-100 p-1 text-white sm:flex-row md:max-w-[90%] dark:bg-[#1a1a1a]"
//                             >
//                                 <Input
//                                     type="email"
//                                     id="email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     placeholder="you@domain.com"
//                                     className="h-7 rounded-md border-none dark:bg-black"
//                                 />
//                                 <Button size="sm" className="h-7 text-sm">
//                                     {status === "loading" ? (
//                                         <Loader2 className="h-5 w-5 animate-spin" />
//                                     ) : (
//                                         "Subscribe"
//                                     )}
//                                 </Button>
//                             </form>
//                             <p
//                                 className={`mt-1 text-xs ${status === "success" ? "text-green-500" : "text-blue-500"}`}
//                             >
//                                 {message}
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Theme Toggle */}
//                 <div className="mt-12 flex justify-between">
//                     <div className="">
//                         <p className="mb-4 text-sm text-gray-400">
//                             © 2025 Cnippet, Inc.
//                         </p>
//                         <div className="flex space-x-4">
//                             <Link
//                                 href="https://github.com/cnippet-site/ui-cnippet"
//                                 className="text-gray-400 hover:text-white"
//                             >
//                                 <RiGithubLine size={20} />
//                             </Link>
//                             <Link
//                                 href="#"
//                                 className="text-gray-400 hover:text-white"
//                             >
//                                 <XIcon />
//                             </Link>
//                             <Link
//                                 href="#"
//                                 className="text-gray-400 hover:text-white"
//                             >
//                                 <MIcon />
//                             </Link>
//                         </div>
//                     </div>

//                     <div className="mt-auto">
//                         {mounted && (
//                             <div className="flex gap-1 rounded-full border p-1 dark:border-neutral-800">
//                                 <button
//                                     onClick={() => setTheme("light")}
//                                     className={`rounded-full p-1.5 ${theme === "light" ? "bg-slate-100 dark:bg-[#1a1a1a]" : ""}`}
//                                     aria-label="Light mode"
//                                 >
//                                     <Sun className="size-4" />
//                                 </button>
//                                 <button
//                                     onClick={() => setTheme("dark")}
//                                     className={`rounded-full p-1.5 ${theme === "dark" ? "bg-[#1a1a1a]" : ""}`}
//                                     aria-label="Dark mode"
//                                 >
//                                     <Moon className="size-4" />
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// }

// function FooterLink({
//     href,
//     children,
// }: {
//     href: string;
//     children: React.ReactNode;
// }) {
//     return (
//         <li>
//             <Link
//                 href={href}
//                 className="text-sm text-gray-600 hover:text-black dark:text-gray-500 dark:hover:text-white"
//             >
//                 {children}
//             </Link>
//         </li>
//     );
// }

// function XIcon() {
//     return (
//         <svg
//             width="20"
//             height="20"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//         >
//             <path
//                 d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"
//                 fill="currentColor"
//             />
//         </svg>
//     );
// }

// function MIcon() {
//     return (
//         <svg
//             width="20"
//             height="20"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//         >
//             <path
//                 d="M16.7 5.3c-1.3-1.4-3-2.1-5.1-2.1-4.4 0-8 3.6-8 8s3.6 8 8 8c2.1 0 3.8-.7 5.1-2.1 1.3-1.3 2-3.1 2-5.1 0-1.8-.7-3.6-2-4.7zm-5.1 9.8c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2 4.2 1.9 4.2 4.2c0 2.3-1.9 4.2-4.2 4.2z"
//                 fill="currentColor"
//             />
//         </svg>
//     );
// }

// {
//     /* <div className="absolute inset-0 grid h-44 grid-cols-12 px-10">
//                             {Array.from({ length: 7 }).map((_, i) => (
//                                 <div
//                                     key={i}
//                                     className={`${i === 0 || i === 6 ? "col-span-1" : "col-span-2"}`}
//                                 >
//                                     {i === 0 && (
//                                         <div
//                                             className={`h-1/2 border-b-0 w-full rounded-tr-full border border-gray-200`}
//                                         />
//                                     )}
//                                     {i > 0 && i < 6 && (
//                                         <>
//                                             {i % 2 === 0 ? (
//                                                 <div
//                                                     className={`h-full w-full rounded-t-full border border-gray-200`}
//                                                 />
//                                             ) : (
//                                                 <div
//                                                     className={`h-full w-full rounded-b-full border border-gray-200`}
//                                                 />
//                                             )}
//                                         </>
//                                     )}
//                                     {i === 6 && (
//                                         <div
//                                             className={`h-1/2 w-full border-b-0 rounded-tl-full border border-gray-200`}
//                                         />
//                                     )}
//                                 </div>
//                             ))}
//                         </div> */
// }

"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
    RiArrowRightLine,
    RiArrowRightUpLine,
    RiBehanceLine,
    RiDribbbleLine,
    RiMoonFill,
    RiSunFill,
    RiTwitterLine,
} from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ripple } from "../motion/ripple";

export default function Component() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative">
            <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-0 flex w-full overflow-visible">
                <div
                    className="absolute top-20 left-0 z-0 h-[1px] w-full flex-auto overflow-hidden border-t border-dashed border-gray-200 dark:border-neutral-700"
                    data-border="true"
                    data-framer-name="Top divider"
                ></div>

                <div
                    className="absolute top-0 left-1/2 z-0 h-full w-full max-w-7xl flex-auto -translate-x-1/2 overflow-visible"
                    data-framer-name="Vertical lines"
                >
                    <div
                        className="absolute right-0 bottom-0 z-0 h-full w-[1px] border-r border-dashed border-gray-200 dark:border-neutral-700"
                        data-border="true"
                        data-framer-name="Right line"
                    >
                        <div
                            className="dot-top2"
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
                            className="dot-top2"
                            data-border="true"
                            data-framer-name="Ellipsis"
                        ></div>
                    </div>
                </div>
            </div>

            <section className="p-4">
                <div className="rounded-3xl bg-gray-50 py-28 dark:bg-black">
                    <div className="dark:bg-background mx-auto max-w-6xl overflow-hidden rounded-4xl bg-white py-0 pl-10 shadow-lg">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            {/* Left Content */}
                            <div className="space-y-4 py-5">
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Become an Affiliate
                                    </p>
                                    <h1 className="text-4xl leading-tight font-semibold text-gray-900 md:text-5xl lg:text-2xl dark:text-gray-100">
                                        Join our Affiliate Program
                                    </h1>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                                        Earn up to{" "}
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            $200
                                        </span>{" "}
                                        with our generous{" "}
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            40%
                                        </span>{" "}
                                        commission for every sale you drive with
                                        your referral link.
                                    </p>
                                </div>

                                <Button
                                    size="lg"
                                    className="mt-3 cursor-pointer rounded-full bg-black px-8 py-5.5 text-sm text-white shadow-none hover:bg-gray-800 dark:bg-white dark:text-black"
                                >
                                    Become an affiliate
                                    <RiArrowRightUpLine />
                                </Button>
                            </div>

                            <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden">
                                <div className="bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
                                    <p className="z-10 text-center text-5xl font-medium tracking-tighter whitespace-pre-wrap text-white">
                                        Cnippet
                                    </p>
                                    <Ripple />
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="">
                        <div className="mx-auto max-w-6xl px-4 pt-16">
                            <div className="grid gap-20 md:grid-cols-2 lg:grid-cols-6">
                                <div className="col-span-2 space-y-2">
                                    <div className="flex items-center">
                                        <Image
                                            src={
                                                theme === "dark"
                                                    ? "/logo-light.png"
                                                    : "/logo-dark.png"
                                            }
                                            alt=""
                                            className="size-10"
                                            width={1080}
                                            height={1080}
                                        />
                                        <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                                            Cnippet{" "}
                                            <span className="text-gray-400">
                                                Blocks
                                            </span>
                                        </span>
                                    </div>
                                    <p className="w-[70%] text-sm leading-relaxed text-gray-700 dark:text-gray-400">
                                        The most Powerful Figma Ui Kit & Design
                                        System for designers.
                                    </p>
                                </div>

                                <div className="col-span-2 flex space-x-10">
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                            Company
                                        </h3>
                                        <div className="hover flex flex-col space-y-3 [&_a]:text-sm [&_a]:text-gray-600 [&_a]:transition-colors [&_a]:hover:text-gray-900 [&_a]:dark:text-gray-400 [&_a]:dark:hover:text-white">
                                            <Link href="#">Pricing</Link>
                                            <Link href="/contact_us">
                                                Contact Us
                                            </Link>
                                            <Link
                                                href="#"
                                                className="flex items-center"
                                            >
                                                Become an Affiliate
                                                <RiArrowRightUpLine className="ml-1 h-3 w-3" />
                                            </Link>
                                            <Link
                                                href="#"
                                                className="flex items-center"
                                            >
                                                Projects
                                                <RiArrowRightUpLine className="ml-1 h-3 w-3" />
                                            </Link>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="cursor-pointer items-start justify-start border-none bg-gray-50 px-0 py-0 text-left text-sm font-normal text-gray-600 shadow-none hover:bg-gray-50 dark:bg-black dark:text-gray-400 dark:hover:bg-black"
                                                    >
                                                        Legal
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    className="top-0 w-56 rounded-2xl dark:border-neutral-800"
                                                    align="start"
                                                    sideOffset={-5}
                                                >
                                                    <DropdownMenuGroup className="[&_a]:w-full">
                                                        <DropdownMenuItem className="rounded-xl">
                                                            <Link href="/legal/licence">
                                                                Licence
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="rounded-xl">
                                                            <Link href="/legal/terms">
                                                                Terms of Service
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="rounded-xl">
                                                            <Link href="/legal/privacy">
                                                                Privacy Policy
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="rounded-xl">
                                                            <Link href="/legal/cancellation">
                                                                Cancellation
                                                                Policy
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="rounded-xl">
                                                            <Link href="/legal/affiliate">
                                                                Affiliate Notice
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="rounded-xl">
                                                            <Link href="/legal/accessibility">
                                                                Accessibility
                                                                Notice
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                            Socials
                                        </h3>
                                        <div className="hover flex flex-col space-y-3 [&_a]:text-sm [&_a]:text-gray-600 [&_a]:transition-colors [&_a]:hover:text-gray-900 [&_a]:dark:text-gray-400 [&_a]:dark:hover:text-white">
                                            <a
                                                href="https://dribbble.com/cnippet-dev"
                                                target="_blank"
                                                className="flex items-center"
                                            >
                                                Behance
                                                <RiArrowRightUpLine className="ml-1 h-3 w-3" />
                                            </a>
                                            <a
                                                href="https://www.behance.net/cnippetdev"
                                                target="_blank"
                                                className="flex items-center"
                                            >
                                                Dribbble
                                                <RiArrowRightUpLine className="ml-1 h-3 w-3" />
                                            </a>
                                            <a
                                                href="#"
                                                className="flex items-center"
                                            >
                                                Twitter/X
                                                <RiArrowRightUpLine className="ml-1 h-3 w-3" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-2 space-y-2">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                        Newsletter
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-50">
                                        Receive product updates news, exclusive
                                        discounts and early access.
                                    </p>
                                    <div className="dark:bg-background flex overflow-hidden rounded-full bg-white p-1 shadow-sm">
                                        <Input
                                            type="email"
                                            placeholder="Enter your email..."
                                            className="border-none py-5 shadow-none focus:z-10 focus-visible:ring-0"
                                        />
                                        <Button className="rounded-full bg-black px-6 py-5 text-white hover:bg-gray-800 dark:bg-white dark:text-black">
                                            <RiArrowRightLine className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Footer */}
                            <div className="mt-16 flex flex-col items-center justify-between space-y-4 border-t border-gray-200 pt-8 md:flex-row md:space-y-0 dark:border-neutral-700">
                                <div className="flex items-center space-x-4 text-xs font-medium tracking-tight text-gray-600 dark:text-gray-300">
                                    <span>© 2025 Cnippet</span>
                                    <span>•</span>
                                    <span>All rights reserved</span>
                                    <span>•</span>
                                    <span>Made with CnippetUi</span>
                                </div>
                                <div className="mr-5 ml-auto flex items-end">
                                    {mounted && (
                                        <div className="flex w-fit gap-1 rounded-full border p-0.5 dark:border-neutral-800">
                                            <button
                                                onClick={() =>
                                                    setTheme("light")
                                                }
                                                className={`rounded-full p-1.5 ${theme === "light" ? "bg-slate-200 dark:bg-[#1a1a1a]" : ""}`}
                                                aria-label="Light mode"
                                            >
                                                <RiSunFill className="size-4" />
                                            </button>
                                            <button
                                                onClick={() => setTheme("dark")}
                                                className={`rounded-full p-1.5 ${theme === "dark" ? "bg-neutral-600" : ""}`}
                                                aria-label="Dark mode"
                                            >
                                                <RiMoonFill className="size-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-2 [&_svg]:size-5 [&_svg]:text-gray-700 [&_svg]:dark:text-gray-300">
                                        <RiBehanceLine />
                                        <RiDribbbleLine />
                                        <RiTwitterLine />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </section>
        </div>
    );
}