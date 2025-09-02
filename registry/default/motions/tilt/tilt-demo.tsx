import { Tilt } from "@/components/motion/tilt";
import Image from "next/image";

export default function TiltCard1() {
    return (
        <Tilt rotationFactor={26} isRevese>
            <div
                style={{
                    borderRadius: "12px",
                }}
                className="flex max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900"
            >
                <Image
                    src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h14.jpg"
                    alt="Ghost in the shell - Kôkaku kidôtai"
                    width={1920}
                    height={1080}
                    className="h-48 w-full object-cover"
                />
                <div className="p-2">
                    <h1 className="font-mono leading-snug text-zinc-950 dark:text-zinc-50">
                        Ghost in the Shell
                    </h1>
                    <p className="text-zinc-700 dark:text-zinc-400">
                        Kôkaku kidôtai
                    </p>
                </div>
            </div>
        </Tilt>
    );
}
