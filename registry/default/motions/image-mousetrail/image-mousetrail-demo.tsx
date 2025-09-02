"use client";
import React from "react";

import ImageMouseTrail from "@/components/motion/image-mousetrail";

const images = [
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h1.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h2.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h3.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h4.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h5.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h6.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h7.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h8.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h9.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986669/h10.jpg",
];
export default function index() {
    return (
        <section>
            <ImageMouseTrail
                items={images}
                maxNumberOfImages={5}
                distance={25}
                imgClass="sm:w-40 w-28 sm:h-48 h-36"
            >
                <h1 className="text-center text-xl font-semibold text-black mix-blend-difference md:text-3xl lg:text-4xl">
                    Experience Interactive Designs with <br />
                    Dynamic Mouse Trails
                </h1>
            </ImageMouseTrail>
        </section>
    );
}
