// title: With Image Scale Hover Effect
import Image from "next/image";

import { Card } from "@/registry/default/ui/card";

export function Pattern() {
  return (
    <Card className="group/card relative h-96 w-full max-w-xs overflow-hidden border-0 p-0!">
      <Image
        alt="Background"
        className="object-cover transition-transform duration-500 group-hover/card:scale-110"
        fill
        src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1741613286/h1.jpg"
      />

      {/* Background fade effects */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/60 to-transparent transition-opacity duration-500 group-hover/card:from-black/70" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end p-6">
        <h3 className="font-bold text-white text-xl">
          A desk that works for you
        </h3>
        <p className="mt-2 text-sm text-white/90">
          Small changes to your setup that make long days easier. 4 min read.
        </p>
      </div>
    </Card>
  );
}
