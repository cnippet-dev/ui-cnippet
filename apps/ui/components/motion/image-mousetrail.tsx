"use client";
import { cn } from "@/lib/utils";
import { ReactNode, useRef } from "react";
import { CldImage } from "next-cloudinary";

/*eslint-disable @typescript-eslint/no-explicit-any*/
interface ImageMouseTrailProps {
    items: any[];
    children?: ReactNode;
    className?: string;
    imgClass?: string;
    distance?: number;
    maxNumberOfImages?: number;
    fadeAnimation?: boolean;
}
export default function ImageMouseTrail({
    items,
    children,
    className,
    maxNumberOfImages = 5,
    imgClass = "w-40 h-48",
    distance = 20,
    fadeAnimation = false,
}: ImageMouseTrailProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const refs = useRef<(HTMLImageElement | null)[]>([]);
    const currentZIndexRef = useRef(1);

    let globalIndex = 0;
    let last = { x: 0, y: 0 };

    const activate = (image: HTMLImageElement, x: number, y: number) => {
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect) return;
        const relativeX = x - containerRect.left;
        const relativeY = y - containerRect.top;
        image.style.left = `${relativeX}px`;
        image.style.top = `${relativeY}px`;
        console.log(refs.current[refs.current?.length - 1]);

        if (currentZIndexRef.current > 40) {
            currentZIndexRef.current = 1;
        }
        image.style.zIndex = String(currentZIndexRef.current);
        currentZIndexRef.current++;

        image.dataset.status = "active";
        if (fadeAnimation) {
            setTimeout(() => {
                image.dataset.status = "inactive";
            }, 1500);
        }
        last = { x, y };
    };

    const distanceFromLast = (x: number, y: number) => {
        return Math.hypot(x - last.x, y - last.y);
    };
    const deactivate = (image: HTMLImageElement) => {
        image.dataset.status = "inactive";
    };

    const handleOnMove = (e: MouseEvent | globalThis.TouchEvent) => {
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

        if (distanceFromLast(clientX, clientY) > window.innerWidth / distance) {
            const lead = refs.current[globalIndex % refs.current.length];
            const tail =
                refs.current[
                    (globalIndex - maxNumberOfImages) % refs.current.length
                ];

            if (lead) activate(lead, clientX, clientY);
            if (tail) deactivate(tail);
            globalIndex++;
        }
    };

    return (
        <section
            onMouseMove={(e) => handleOnMove(e.nativeEvent)}
            onTouchMove={(e) => handleOnMove(e.nativeEvent)}
            ref={containerRef}
            className={cn(
                "relative grid h-[600px] w-full place-content-center overflow-hidden rounded-lg bg-white",
                className,
            )}
        >
            {items.map((item, index) => (
                <CldImage
                    key={index}
                    className={cn(
                        "opacity:0 data-[status='active']:ease-out-expo absolute -translate-x-[50%] -translate-y-[50%] scale-0 object-cover transition-transform duration-300 data-[status='active']:scale-100 data-[status='active']:opacity-100 data-[status='active']:duration-500",
                        imgClass,
                    )}
                    width={1920}
                    height={1080}
                    data-index={index}
                    data-status="inactive"
                    src={item}
                    alt={`image-${index}`}
                    ref={(node: HTMLImageElement | null) => {
                        refs.current[index] = node;
                    }}
                />
            ))}
            <article className="relative z-50">{children}</article>
        </section>
    );
}

/*eslint-enable @typescript-eslint/no-explicit-any*/
