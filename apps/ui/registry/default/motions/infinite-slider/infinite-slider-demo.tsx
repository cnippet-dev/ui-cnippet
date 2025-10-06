import { InfiniteSlider } from "@/components/motion/infinite-slider";
import { CldImage } from "next-cloudinary";

const images = [
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h1.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h3.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h7.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h8.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h9.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h10.jpg",
];

export default function InfiniteSliderBasic() {
    return (
        <InfiniteSlider gap={24} reverse>
            {images.map((image, i) => (
                <CldImage
                    key={i}
                    src={image}
                    alt="Apple Music logo"
                    width={1920}
                    height={1080}
                    className="h-40 w-60 rounded-xl object-cover"
                />
            ))}
        </InfiniteSlider>
    );
}
