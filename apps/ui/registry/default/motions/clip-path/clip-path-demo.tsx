import { ClipPaths, ClippedFigure } from "@/components/motion/clip-path";

export default function ImageRevealGallery() {
    return (
        <>
            <ClipPaths />
            <section className="mx-auto grid h-auto max-w-7xl grid-cols-3 gap-8 rounded-lg border bg-white p-5 dark:bg-black">
                <ClippedFigure
                    aspectRatio="1/1"
                    variant="squiggle"
                    src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h4.jpg"
                    alt="Squiggle shaped image"
                />

                <ClippedFigure
                    variant="rectangle"
                    src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h4.jpg"
                    alt="Rectangle shaped video"
                />

                <ClippedFigure
                    variant="abstract"
                    src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h5.jpg"
                    alt="Abstract shaped image"
                    className="custom-class"
                    hoverScale={false}
                />
                {/* <ClippedFigure
                    variant="variant1"
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop"
                    alt="Variant 1 image"
                    aspectRatio="4/5"
                />
                <ClippedFigure
                    variant="variant2"
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop"
                    alt="Variant 1 image"
                    aspectRatio="4/5"
                />
                <ClippedFigure
                    variant="variant3"
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop"
                    alt="Variant 1 image"
                    aspectRatio="4/5"
                /> */}
            </section>
        </>
    );
}
