import { TextShimmer } from "@/components/motion/text-shimmer";

export default function TextShimmerBasic() {
    return (
        <TextShimmer className="font-mono text-2xl" duration={1}>
            Generating code...
        </TextShimmer>
    );
}
