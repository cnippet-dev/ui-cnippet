import React from "react";

import Image from "next/image";
import { TabsBtn, TabsContent, TabsProvider } from "@/components/motion/tabs-cn";
import { CldImage } from "next-cloudinary";

function Tab() {
    return (
        <div className="relative rounded-md border bg-white/10 p-4 backdrop-blur-sm dark:bg-black/40">
            <TabsProvider defaultValue={"design"}>
                <div className="mt-2 flex justify-center">
                    <div className="flex w-fit items-center rounded-md border bg-gray-200 p-1 text-black dark:bg-[#1d2025] dark:text-white">
                        <TabsBtn value="design">
                            <span className="relative z-[2] uppercase">
                                design
                            </span>
                        </TabsBtn>
                        <TabsBtn value="collaborate">
                            <span className="relative z-[2] uppercase">
                                collaborate
                            </span>
                        </TabsBtn>
                        <TabsBtn value="share">
                            <span className="relative z-[2] uppercase">
                                share
                            </span>
                        </TabsBtn>
                        <TabsBtn value="publish">
                            <span className="relative z-[2] uppercase">
                                publish
                            </span>
                        </TabsBtn>
                    </div>
                </div>

                <TabsContent value="design">
                    <div className="w-full">
                        <CldImage
                            src={
                                "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h1.jpg"
                            }
                            width={1000}
                            height={1000}
                            alt="preview_img"
                            className="mx-auto h-full w-[850px] rounded-md object-cover"
                        />
                    </div>
                </TabsContent>
                <TabsContent value="collaborate">
                    <div className="w-full">
                        <CldImage
                            src={
                                "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h2.jpg"
                            }
                            width={1000}
                            height={1000}
                            alt="preview_img"
                            className="mx-auto h-full w-[850px] rounded-md object-cover"
                        />
                    </div>
                </TabsContent>
                <TabsContent value="share">
                    <div className="w-full">
                        <CldImage
                            src={
                                "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h3.jpg"
                            }
                            width={1000}
                            height={1000}
                            alt="preview_img"
                            className="mx-auto h-full w-[850px] rounded-md object-cover"
                        />
                    </div>
                </TabsContent>
                <TabsContent value="publish">
                    <div className="w-full">
                        <CldImage
                            src={
                                "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h4.jpg"
                            }
                            width={1000}
                            height={1000}
                            alt="preview_img"
                            className="mx-auto h-full w-[850px] rounded-md object-cover"
                        />
                    </div>
                </TabsContent>
            </TabsProvider>
        </div>
    );
}

export default Tab;
