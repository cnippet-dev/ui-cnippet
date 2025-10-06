import {
    ImageComparison,
    ImageComparisonImage,
    ImageComparisonSlider,
} from "@/components/motion/image-comparison";

export default function ImageComparisonHover() {
    return (
        <ImageComparison
            className="aspect-16/10 w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
            enableHover
        >
            <ImageComparisonImage
                src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h7.jpg"
                alt="Motion Primitives Dark"
                position="left"
            />
            <ImageComparisonImage
                src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h5.jpg"
                alt="Motion Primitives Light"
                position="right"
            />
            <ImageComparisonSlider className="bg-white" />
        </ImageComparison>
    );
}
