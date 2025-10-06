import { TextLoop } from "@/components/motion/text-loop";

export default function TextLoopBasic() {
    return (
        <TextLoop className="font-mono text-sm">
            <span>How can I assist you today?</span>
            <span>Generate a logo</span>
            <span>Create a component</span>
            <span>Draw a diagram</span>
        </TextLoop>
    );
}
