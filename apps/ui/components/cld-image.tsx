"use client";

import React from "react";
import { CldImage } from "next-cloudinary";

const CldImageComponent = ({
    src,
    width,
    height,
    alt,
    fill,
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
            className={className}
            priority={priority}
            ref={ref}
        />
    );
};

export default CldImageComponent;
