// thanks to oliver: https://www.youtube.com/@olivierlarose1
"use client";
import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll, MotionValue } from "motion/react";
import { JSX, useRef } from "react";
import { CldImage } from "next-cloudinary";

const projects = [
    {
        title: "Matthias Leidinger",
        description:
            "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
        src: "rock.jpg",
        link: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h1.jpg",
        color: "#5196fd",
    },
    {
        title: "Clément Chapillon",
        description:
            "This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes”—so French photographer Clément.",
        src: "tree.jpg",
        link: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h2.jpg",
        color: "#8f89ff",
    },
    {
        title: "Zissou",
        description:
            "Though he views photography as a medium for storytelling, Zissou's images don't insist on a narrative. Both crisp and ethereal.",
        src: "water.jpg",
        link: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h2.jpg",
        color: "#13006c",
    },
    {
        title: "Mathias Svold and Ulrik Hasemann",
        description:
            "The coastlines of Denmark are documented in tonal colors in a pensive new series by Danish photographers Ulrik Hasemann and Mathias Svold; an ongoing project investigating how humans interact with and disrupt the Danish coast.",
        src: "house.jpg",
        link: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h3.jpg",
        color: "#ed649e",
    },
    {
        title: "Mark Rammers",
        description:
            "Dutch photographer Mark Rammers has shared with IGNANT the first chapter of his latest photographic project, 'all over again'—captured while in residency at Hektor, an old farm in Los Valles, Lanzarote.",
        src: "cactus.jpg",
        link: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h4.jpg",
        color: "#fd521a",
    },
];
export default function index(): JSX.Element {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });
    return (
        <ReactLenis root>
            <main
                className="bg-black"
                ref={container}
            >
                {/* <>
                    <section className="grid h-[70vh] place-content-center bg-slate-950 text-white">
                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

                        <h1 className="px-8 text-center text-5xl leading-[120%] font-semibold tracking-tight 2xl:text-7xl">
                            Stacking Cards Using <br /> Framer-Motion. Scroll
                            down! 👇
                        </h1>
                    </section>
                </> */}

                <section className="w-full bg-black text-white">
                    {projects.map((project, i) => {
                        const targetScale = 1 - (projects.length - i) * 0.05;
                        return (
                            <Card
                                key={`p_${i}`}
                                i={i}
                                url={project?.link}
                                src={project?.src}
                                title={project?.title}
                                color={project?.color}
                                description={project?.description}
                                progress={scrollYProgress}
                                range={[i * 0.25, 1]}
                                targetScale={targetScale}
                            />
                        );
                    })}
                </section>

                {/* <footer className="group bg-slate-950">
                    <h1 className="translate-y-20 bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-center text-[16vw] leading-[100%] font-semibold text-transparent uppercase transition-all ease-linear">
                        ui-layout
                    </h1>
                    <div className="relative z-10 grid h-40 place-content-center rounded-tl-full rounded-tr-full bg-black text-2xl"></div>
                </footer> */}
            </main>
        </ReactLenis>
    );
}
interface CardProps {
    i: number;
    title: string;
    description: string;
    src: string;
    url: string;
    color: string;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}
export const Card: React.FC<CardProps> = ({
    i,
    title,
    description,
    src,
    url,
    color,
    progress,
    range,
    targetScale,
}) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "start start"],
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div
            ref={container}
            className="sticky top-0 flex h-screen w-full items-center justify-center p-10"
        >
            <motion.div
                style={{
                    // backgroundColor: color,
                    scale,
                    top: `calc(-5vh + ${i * 25}px)`,
                }}
                className={`relative -top-[25%] bg-neutral-950 flex h-[450px] w-full origin-top flex-col rounded-md p-5`}
            >
                <h2 className="text-center text-2xl font-semibold">{title}</h2>
                <div className={`mt-5 flex h-full gap-10`}>
                    <div className={`relative top-[10%] w-[40%]`}>
                        <p className="text-sm">{description}</p>
                        <span className="flex items-center gap-2 pt-2">
                            <a
                                href={"#"}
                                target="_blank"
                                className="cursor-pointer underline"
                            >
                                See more
                            </a>
                            <svg
                                width="22"
                                height="12"
                                viewBox="0 0 22 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                                    fill="black"
                                />
                            </svg>
                        </span>
                    </div>

                    <div
                        className={`relative h-full w-[60%] overflow-hidden rounded-lg`}
                    >
                        <motion.div
                            className={`h-full w-full`}
                            style={{ scale: imageScale }}
                        >
                            <CldImage
                                fill
                                src={url}
                                alt="image"
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
