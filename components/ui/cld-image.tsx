"use client";

import React from "react";
import { CldImage } from "next-cloudinary";

const CldImageComponent = ({
    src,
    width,
    height,
    alt,
    fill,
    sizes,
    priority,
    ref,
    className,
}: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
    ref?:
        | React.RefObject<HTMLImageElement>
        | ((node: HTMLImageElement | null) => void);
    className?: string;
}) => {
    return (
        <CldImage
            src={src}
            width={width}
            height={height}
            alt={alt}
            fill={fill}
            sizes={sizes}
            className={className}
            priority={priority}
            ref={ref}
        />
    );
};

export default CldImageComponent;
