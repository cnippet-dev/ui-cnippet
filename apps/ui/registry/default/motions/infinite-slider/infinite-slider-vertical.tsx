import { InfiniteSlider } from "@/components/motion/infinite-slider";
import { CldImage } from "next-cloudinary";

const images = [
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h1.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h3.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h7.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h8.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h9.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h10.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h5.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h4.jpg",
];

export default function InfiniteSliderVertical() {
    return (
        <div className="flex h-[350px] space-x-4">
            <InfiniteSlider direction="vertical" speed={50}>
                {images.map((image, i) => (
                    <CldImage
                        key={i}
                        src={image}
                        alt="Apple Music logo"
                        width={1920}
                        height={1080}
                        className="aspect-square w-[120px] rounded-[4px] object-cover"
                    />
                ))}
            </InfiniteSlider>
            <InfiniteSlider direction="vertical" reverse speed={50}>
                {images.map((image, i) => (
                    <CldImage
                        key={i}
                        src={image}
                        alt="Apple Music logo"
                        width={1920}
                        height={1080}
                        className="aspect-square w-[120px] rounded-[4px] object-cover"
                    />
                ))}
            </InfiniteSlider>
        </div>
    );
}
