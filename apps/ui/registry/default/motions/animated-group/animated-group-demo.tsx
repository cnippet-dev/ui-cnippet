import { AnimatedGroup } from "@/components/motion/animated-group";
import { CldImage } from "next-cloudinary";
export default function AnimatedGroupPreset() {
    return (
        <AnimatedGroup
            className="grid grid-cols-2 gap-4 p-8 md:grid-cols-3"
            preset="zoom"
        >
            <CldImage
                src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h4.jpg"
                alt="impressionist painting, uploaded to Cosmos"
                width={1080}
                height={680}
                className="h-80 w-full rounded-xl object-cover"
            />
            <CldImage
                src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h5.jpg"
                alt="impressionist painting, uploaded to Cosmos"
                width={1080}
                height={680}
                className="h-80 w-full rounded-xl object-cover"
            />
            <CldImage
                src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h2.jpg"
                alt="impressionist painting, uploaded to Cosmos"
                width={1080}
                height={680}
                className="h-80 w-full rounded-xl object-cover"
            />
        </AnimatedGroup>
    );
}
