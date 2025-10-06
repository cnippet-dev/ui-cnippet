import React from "react";

import Image from "next/image";
import { SpotLightItem, Spotlight } from "@/components/motion/spotlight-card";
import { RiGlobalLine } from "@remixicon/react";
export default function index() {
    const boxes = [
        {
            id: "12",
            title: "Goal Tracking",
            icon: <RiGlobalLine />,
            className: "grid xl:col-span-1 col-start-1 col-end-3",
        },
        {
            id: "52",
            title: "Analytics Dashboard",
            icon: <RiGlobalLine />,
            className: "grid xl:col-span-1 col-start-3 col-end-6",
        },
        {
            id: "42",
            title: "Task Management",
            icon: <RiGlobalLine />,
            className: "grid xl:col-span-1 col-start-1 col-end-3",
        },
        {
            id: "22",
            title: "Team Collaboration",
            icon: <RiGlobalLine />,
            className: "grid xl:col-span-1 col-start-3 col-end-6",
        },
        {
            id: "32",
            title: "Performance Metrics",
            des: "Monitor individual and team performance with detailed metrics and KPIs. Identify areas for improvement and recognize outstanding achievements.",
            className:
                "xl:col-span-2 xl:row-span-2 row-start-2 row-end-3  col-start-1 col-end-6",
        },
    ];
    return (
        <>
            <div className="relative rounded-md bg-black p-4 text-white sm:p-8">
                <Spotlight className="grid grid-flow-col grid-cols-4 gap-2">
                    {boxes?.map((box, index) => {
                        return (
                            <SpotLightItem
                                className={box.className}
                                key={index}
                            >
                                <div className="relative z-10 mx-auto h-full w-full rounded-lg bg-gradient-to-b from-[#0c0c0c] to-[#252525]">
                                    <div className="relative grid h-full max-h-full w-full place-content-center rounded-lg p-0 2xl:p-3">
                                        <div
                                            className={`absolute top-0 left-0 -z-10 h-full w-full rounded-lg bg-cover bg-center`}
                                        />
                                        {box?.icon}

                                        <h1 className="text-left text-base font-semibold lg:text-xl xl:text-lg">
                                            {box?.title}
                                        </h1>
                                        <p className="text-left text-xs lg:text-sm">
                                            {box?.des}
                                        </p>
                                    </div>
                                </div>
                            </SpotLightItem>
                        );
                    })}
                </Spotlight>
            </div>
        </>
    );
}
