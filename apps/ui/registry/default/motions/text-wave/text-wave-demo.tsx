import { TextShimmerWave } from "@/components/motion/text-shimmer-wave";

export default function TextShimmerWaveBasic() {
    return (
        <TextShimmerWave className="font-mono text-sm" duration={1}>
            Generating code...
        </TextShimmerWave>
    );
}
