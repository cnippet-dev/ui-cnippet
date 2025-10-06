import { Grid, Block } from "@/components/motion/grid";
import {
    RiFacebookBoxFill,
    RiGithubFill,
    RiMapPin2Fill,
    RiTiktokFill,
    RiTwitterFill,
} from "@remixicon/react";

const SocialProfileGrid = () => (
    <Grid>
        <Block className="col-span-12 row-span-2 md:col-span-6">
            <img
                src="https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=John"
                alt="avatar"
                className="mb-4 size-14 rounded-full"
            />
            <h1 className="mb-12 text-4xl font-medium leading-tight">
                Hi, I'm Deepak.{" "}
                <span className="text-zinc-400">
                    Founder and CEO of Cnippet UI
                </span>
            </h1>
        </Block>

        {[RiFacebookBoxFill, RiTiktokFill, RiTwitterFill, RiGithubFill].map(
            (Icon, idx) => (
                <Block
                    key={idx}
                    className="col-span-6 bg-emerald-600 md:col-span-3"
                    whileHover={{
                        rotate: idx % 2 ? "-2.5deg" : "2.5deg",
                        scale: 1.1,
                    }}
                >
                    <a
                        href="#"
                        className="grid h-full place-content-center text-3xl text-white"
                    >
                        <Icon />
                    </a>
                </Block>
            ),
        )}

        <Block className="col-span-12 md:col-span-8">
            <p className="text-balance text-3xl leading-snug">
                Creating UI components using{" "}
                <span className="text-zinc-400">
                    React, TailwindCSS and Framer Motion
                </span>
            </p>
        </Block>

        <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-4">
            <RiMapPin2Fill className="text-3xl" />
            <p className="text-lg text-zinc-400">Digital Nomad</p>
        </Block>
    </Grid>
);

export default SocialProfileGrid;
