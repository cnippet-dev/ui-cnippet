"use client";
import {
    SliderBtnGroup,
    ProgressSlider,
    SliderBtn,
    SliderContent,
    SliderWrapper,
} from "@/components/motion/progressive-carousel";
import { CldImage } from "next-cloudinary";

const items = [
    {
        img: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h1.jpg",
        title: "Bridge",
        desc: "A breathtaking view of a city illuminated by countless lights, showcasing the vibrant and bustling nightlife.",
        sliderName: "bridge",
    },
    {
        img: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h2.jpg",
        title: "Mountains View",
        desc: "A serene lake reflecting the surrounding mountains and trees, creating a mirror-like surface.",
        sliderName: "mountains",
    },
    {
        img: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h3.jpg",
        title: "Autumn",
        desc: "A picturesque path winding through a dense forest adorned with vibrant autumn foliage.",
        sliderName: "autumn",
    },
    {
        img: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h4.jpg",
        title: "Foggy",
        sliderName: "foggy",
        desc: "A stunning foggy view over the foresh, with the sun casting a golden glow across the forest. ",
    },
];
export default function index() {
    return (
        <>
            <ProgressSlider vertical={false} activeSlider="bridge">
                <SliderContent>
                    {items.map((item, index) => (
                        <SliderWrapper key={index} value={item?.sliderName}>
                            <CldImage
                                className="h-[350px] rounded-xl object-cover 2xl:h-[500px]"
                                src={item.img}
                                width={1900}
                                height={1080}
                                alt={item.desc}
                            />
                        </SliderWrapper>
                    ))}
                </SliderContent>

                <SliderBtnGroup className="absolute bottom-0 grid h-fit grid-cols-2 overflow-hidden rounded-md bg-white/40 text-black backdrop-blur-md md:grid-cols-4 dark:bg-black/40 dark:text-white">
                    {items.map((item, index) => (
                        <SliderBtn
                            key={index}
                            value={item?.sliderName}
                            className="border-r p-3 text-left"
                            progressBarClass="dark:bg-black bg-white h-full"
                        >
                            <h2 className="relative mb-2 w-fit rounded-full bg-gray-900 px-4 text-white dark:bg-white dark:text-black">
                                {item.title}
                            </h2>
                            <p className="line-clamp-2 text-sm font-medium">
                                {item.desc}
                            </p>
                        </SliderBtn>
                    ))}
                </SliderBtnGroup>
            </ProgressSlider>
        </>
    );
}
