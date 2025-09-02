import { ClipPaths, ClippedFigure } from "@/components/motion/clip-path";

export default function ImageRevealGallery() {
    return (
        <>
            <ClipPaths />
            <section className="grid grid-cols-3 gap-8 rounded-lg border bg-white p-5 dark:bg-black">
                <ClippedFigure
                    variant="variant1"
                    src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h1.jpg"
                    alt="Variant 1 image"
                    aspectRatio="4/5"
                />
                <ClippedFigure
                    variant="variant2"
                    src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h10.jpg"
                    alt="Variant 1 image"
                    aspectRatio="4/5"
                />
                <ClippedFigure
                    variant="variant3"
                    src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h9.jpg"
                    alt="Variant 1 image"
                    aspectRatio="4/5"
                />
            </section>
        </>
    );
}
