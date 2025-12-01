import { HorizontalScroll } from "@/registry/default/motion/horizontal-scroll";

const cards = [
    {
        url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h1.jpg",
        title: "Artwork 1",
        id: 1,
    },
    {
        url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h5.jpg",
        title: "Artwork 2",
        id: 2,
    },
    {
        url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h3.jpg",
        title: "Artwork 3",
        id: 3,
    },
    {
        url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h4.jpg",
        title: "Artwork 4",
        id: 4,
    },
    {
        url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h2.jpg",
        title: "Artwork 5",
        id: 5,
    },
];

const horizontalScrollDemo = () => {
    return (
        <div className="h-full w-full">
            <div className="bg-neutral-800">
                <div className="flex h-48 items-center justify-center">
                    <span className="font-semibold uppercase text-neutral-500">
                        Scroll to explore
                    </span>
                </div>
                <HorizontalScroll cards={cards} />
                <div className="flex h-48 items-center justify-center">
                    <span className="font-semibold uppercase text-neutral-500">
                        End of scroll
                    </span>
                </div>
            </div>
        </div>
    );
};

export default horizontalScrollDemo;
