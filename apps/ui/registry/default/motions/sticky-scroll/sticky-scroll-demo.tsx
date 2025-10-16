"use client";
import { ReactLenis } from "lenis/react";
import { CldImage } from "next-cloudinary";
import { JSX } from "react";

export default function index(): JSX.Element {
    return (
        <ReactLenis root>
            <main className="bg-black">
                <div className="wrapper">
                    <section className="sticky top-0 grid h-screen w-full place-content-center bg-slate-950 text-white">
                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

                        <h1 className="px-8 text-center text-6xl leading-[120%] font-semibold tracking-tight 2xl:text-5xl">
                            I Know What Exactly you&apos;re <br /> Looking For!
                            Scroll Please 👇
                        </h1>
                    </section>

                    <section className="sticky top-0 grid h-screen place-content-center overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-gray-300 text-black">
                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                        <h1 className="px-8 text-center text-4xl leading-[120%] font-semibold tracking-tight 2xl:text-5xl">
                            If you don&apos;t like this Smooth Scroll then I&apos;m sorry,{" "}
                            <br /> create your own and make it open source 💼
                        </h1>
                    </section>
                    <section className="sticky top-0 grid h-screen w-full place-content-center bg-slate-950 text-white">
                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                        <h1 className="px-8 text-center text-5xl leading-[120%] font-semibold tracking-tight 2xl:text-5xl">
                            Don&apos;t Forget To Share <br /> This Sticky CSS
                            Tricks.😎
                        </h1>
                    </section>
                </div>

                <section className="w-full bg-slate-950 text-white">
                    <div className="grid grid-cols-[1fr_2fr]">
                        <div className="sticky top-0 flex h-screen items-center justify-center">
                            <h1 className="px-8 text-center text-5xl leading-[120%] font-semibold tracking-tight 2xl:text-3xl">
                                Thanks To Scroll.
                                <br /> Now Scroll Up Again☝️🏿
                            </h1>
                        </div>
                        <div className="grid gap-2">
                            <figure className="grid -skew-x-12 place-content-center">
                                <CldImage
                                    src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h2.jpg"
                                    alt=""
                                    width={1000}
                                    height={1000}
                                    className="h-96 w-80 object-cover align-bottom transition-all duration-300"
                                />
                            </figure>
                            <figure className="grid skew-x-12 place-content-center">
                                <CldImage
                                    src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h3.jpg"
                                    alt=""
                                    width={1000}
                                    height={1000}
                                    className="h-96 w-80 object-cover align-bottom transition-all duration-300"
                                />
                            </figure>
                            <figure className="grid -skew-x-12 place-content-center">
                                <CldImage
                                    src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h4.jpg"
                                    alt=""
                                    width={1000}
                                    height={1000}
                                    className="h-96 w-80 object-cover align-bottom transition-all duration-300"
                                />
                            </figure>
                            <figure className="grid skew-x-12 place-content-center">
                                <CldImage
                                    src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h5.jpg"
                                    alt=""
                                    width={1000}
                                    height={1000}
                                    className="h-96 w-80 object-cover align-bottom transition-all duration-300"
                                />
                            </figure>
                        </div>
                    </div>
                </section>
                <section className="w-full bg-slate-950 text-white">
                    <div className="grid grid-cols-2 px-8">
                        <div className="grid gap-2">
                            <figure className="sticky top-0 grid h-screen place-content-center">
                                <CldImage
                                    src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h6.jpg"
                                    alt=""
                                    width={1000}
                                    height={1000}
                                    className="h-96 w-96 rounded-md object-cover align-bottom transition-all duration-300"
                                />
                            </figure>
                            <figure className="sticky top-0 grid h-screen place-content-center">
                                <CldImage
                                    src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h7.jpg"
                                    alt=""
                                    width={1000}
                                    height={1000}
                                    className="h-96 w-96 rounded-md object-cover align-bottom transition-all duration-300"
                                />
                            </figure>
                            <figure className="sticky top-0 grid h-screen place-content-center">
                                <CldImage
                                    src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h8.jpg"
                                    alt=""
                                    width={1000}
                                    height={1000}
                                    className="h-96 w-96 rounded-md object-cover align-bottom transition-all duration-300"
                                />
                            </figure>
                            <figure className="sticky top-0 grid h-screen place-content-center">
                                <CldImage
                                    src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h9.jpg"
                                    alt=""
                                    width={1000}
                                    height={1000}
                                    className="h-96 w-96 rounded-md object-cover align-bottom transition-all duration-300"
                                />
                            </figure>
                        </div>
                        <div className="sticky top-0 grid h-screen place-content-center">
                            <h1 className="px-8 text-right text-4xl leading-[120%] font-medium tracking-tight">
                                Copied & Paste Every Component you want and make
                                an creative website 😎
                            </h1>
                        </div>
                    </div>
                </section>
                {/* <footer className="group bg-slate-950">
                    <h1 className="translate-y-20 bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-center text-[16vw] leading-[100%] font-semibold text-transparent uppercase transition-all ease-linear group-hover:translate-y-4">
                        ui-layout
                    </h1>
                    <section className="relative z-10 grid h-40 place-content-center rounded-tl-full rounded-tr-full bg-black text-2xl">
                        Thanks for Scrolling
                    </section>
                </footer> */}
            </main>
        </ReactLenis>
    );
}
