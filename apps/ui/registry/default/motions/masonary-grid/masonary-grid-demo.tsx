"use client";
import React, { useState } from "react";
import { MasonryGrid, MasonryItem, Item } from "@/components/motion/masonary-grid"; // Adjust import path

export default function GalleryPage() {
    const [selected, setSelected] = useState<Item | null>(null);

    const images = [
        "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h1.jpg",
        "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h3.jpg",
        "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h7.jpg",
        "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h8.jpg",
        "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h9.jpg",
        "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h10.jpg",
    ];

    // Convert to items format with IDs
    const items = images.map((url, index) => ({
        id: index + 1,
        url,
        title: `Image ${index + 1}`,
    }));

    return (
        <MasonryGrid>
            {items.map((item) => (
                <MasonryItem
                    key={item.id}
                    item={item}
                    index={item.id}
                    setSelected={setSelected}
                />
            ))}
        </MasonryGrid>
    );
}
