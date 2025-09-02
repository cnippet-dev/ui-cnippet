"use client";
import React from "react";
import { ImageReveal, ImageRevealItem } from "@/components/motion/image-reveal";

const imageItems = [
    {
        img: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h4.jpg",
        label: "Six Cap",
    },
    {
        img: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h5.jpg",
        label: "Room Decor",
    },
    {
        img: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h2.jpg",
        label: "Porter",
    },
    {
        img: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h3.jpg",
        label: "LifeStyle",
    },
];

export default function ParentComponent() {
    return (
        <ImageReveal className="bg-white text-black">
            {imageItems.map((item) => (
                <ImageRevealItem
                    key={item.label}
                    item={item}
                    className="text-black"
                >
                    <p className="text-5xl">{item.label}</p>
                    <span>Portfolio</span>
                </ImageRevealItem>
            ))}
        </ImageReveal>
    );
}
